import { Injectable } from '@angular/core';
import {
  QuestionResult,
  QuizResult,
} from '@modules/courses/constants/quiz.constant';
import { TimeLimitType } from '@shared/models/quiz';

@Injectable({ providedIn: 'root' })
export class QuizService {
  constructor() {}

  getQuestionResultFromMark = (
    mark: number,
    defaultMark: number
  ): QuestionResult => {
    if (mark === defaultMark) return QuestionResult.FULL_MARK;
    if (mark === 0) return QuestionResult.ZERO_MARK;
    return QuestionResult.PARTIAL_MARK;
  };
  getQuizResultFromMark = (mark: number, totalMark: number): QuizResult => {
    if (mark >= totalMark * 0.8) return QuizResult.GOOD;
    if (mark >= totalMark * 0.5) return QuizResult.AVERAGE;
    return QuizResult.BAD;
  };

  getSecondFromTimeLimitType = (
    value: number,
    unit: TimeLimitType | string,
    onUnitError?: () => any
  ) => {
    if (unit === TimeLimitType.SECONDS) return value;
    if (unit === TimeLimitType.MINUTES) return value * 60;
    if (unit === TimeLimitType.HOURS) return value * 60 * 60;
    if (unit === TimeLimitType.DAYS) return value * 60 * 60 * 24;
    if (unit === TimeLimitType.WEEKS) return value * 60 * 60 * 24 * 7;
    if (onUnitError) onUnitError();
    return 0;
  };
}
