import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  ConfirmMessageData,
  ConfirmMessageService,
} from '@shared/components/confirm-message/confirm-message.service';
import { formatDateString, isInDate } from '@shared/helper/date.helper';
import { mockStudentResponses } from '@shared/mocks/student-response';
import { GradingMethod } from '@shared/models/quiz';
import { QuizTopic } from '@shared/models/topic';
import { StudentResponseService } from '@shared/services/student-response.service';
import { TabQuizService } from '../tab-quiz/tab-quiz.service';
import { Course } from '@shared/models/course';
import { ToastrService } from 'ngx-toastr';
import { GetAllQuizResponsesOfTopic } from '@modules/quiz/api/quiz-response.api';
import { StudentResponse } from '@shared/models/student-response';
import { UserService } from '@shared/services/user.service';

@Component({
  selector: 'tab-quiz-student',
  standalone: false,
  templateUrl: './tab-quiz-student.component.html',
  styleUrl: './tab-quiz-student.component.scss',
  providers: [TabQuizService, StudentResponseService],
})
export class TabQuizStudentComponent implements OnInit {
  @Input({ required: true }) topic!: QuizTopic;
  @Input({ required: true }) course!: Course;

  studentResponses = mockStudentResponses;
  gradingMethod: GradingMethod = GradingMethod.HIGHEST_GRADE;
  gradeToShow = 0;
  fullMarkOfQuiz = 100;
  gradeColor = 'green';

  constructor(
    private tabQuizService: TabQuizService,
    private studentResponseService: StudentResponseService,
    private router: Router,
    private confirmMessageService: ConfirmMessageService,
    private toastr: ToastrService,
    private userService: UserService
  ) {}

  confirmMessageData: ConfirmMessageData = {
    title: 'This quiz has time limit',
    message:
      "Are you sure you want to start this quiz? You can't pause the quiz and the time will keep counting down.",
    variant: 'warning',
  };

  openConfirmMessage() {
    if (!this.checkValidQuiz()) return;
    this.confirmMessageService.openDialog();
  }

  onCancelConfirmMessage() {
    this.confirmMessageService.closeDialog();
  }

  onAcceptConfirmMessage() {
    this.confirmMessageService.closeDialog();
    this.startQuiz();
  }

  ngOnInit(): void {
    this.fetchData();
    this.confirmMessageService.setData(this.confirmMessageData);
    this.confirmMessageService.setCancelAction(() =>
      this.onCancelConfirmMessage()
    );
    this.confirmMessageService.setConfirmAction(() =>
      this.onAcceptConfirmMessage()
    );
    this.tabQuizService.topic$.subscribe((topic) => {
      if (!topic) return;
      this.topic = topic;
      this.updateGradingDisplayData(this.studentResponses);
    });
    this.tabQuizService.setTopic(this.topic);
  }

  async fetchData() {
    await GetAllQuizResponsesOfTopic(this.topic.id)
      .then((responses) => {
        // Filter responses to only current userAdd commentMore actions
        const currentUser = this.userService.getUser();
        const filteredResponses = currentUser
          ? responses.filter((r) => r.student.id === currentUser.id)
          : [];
        this.updateGradingDisplayData(filteredResponses);
      })
      .catch((error) => {
        console.error('Failed to fetch quiz responses:', error);
        this.toastr.error(error.message);
      });
  }

  updateGradingDisplayData(quizResponses: StudentResponse[]) {
    const currentUser = this.userService.getUser();
    this.studentResponses = currentUser
      ? quizResponses.filter((r) => r.student.id === currentUser.id)
      : [];

    if (!this.topic || !this.topic.data) {
      this.toastr.error('Quiz is not available.');
      return;
    }
    this.fullMarkOfQuiz = this.tabQuizService.getFullMarkOfQuiz(this.topic);
    this.gradingMethod = this.topic.data.gradingMethod;

    if (this.gradingMethod === GradingMethod.FIRST_GRADE) {
      this.gradeToShow = this.tabQuizService.getFirstAttemptGrade(
        this.studentResponses
      );
    } else if (this.gradingMethod === GradingMethod.LAST_GRADE) {
      this.gradeToShow = this.tabQuizService.getLastAttemptGrade(
        this.studentResponses
      );
    } else if (this.gradingMethod === GradingMethod.AVERAGE_GRADE) {
      this.gradeToShow = this.tabQuizService.getAverageGrade(
        this.studentResponses
      );
    } else {
      this.gradeToShow = this.tabQuizService.getHighestGrade(
        this.studentResponses
      );
    }

    this.gradeColor = this.studentResponseService.getGradeColor(
      this.gradeToShow,
      this.fullMarkOfQuiz
    );
  }

  formatDate(date: string | null, pattern: string = 'MM/dd/yyyy HH:mm a') {
    return formatDateString(date, pattern);
  }

  checkValidQuiz(): boolean {
    if (!this.topic || !this.topic.data) {
      this.toastr.error('Quiz is not available.');
      return false;
    }
    if (this.topic.data.questions.length === 0) {
      this.toastr.error('This quiz has no questions.');
      return false;
    }
    return true;
  }

  startQuiz() {
    this.router.navigate([
      `courses/${this.course.id}/quiz/${this.topic.id}/attempting`,
    ]);
  }

  onReviewClick(responseId: string) {
    this.router.navigate([
      `courses/${this.course.id}/quiz/${this.topic.id}/${responseId}/reviewing`,
    ]);
  }
}
