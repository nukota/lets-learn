import { Component, Input, OnInit } from '@angular/core';
import { format } from 'date-fns';
import { TimerService } from './timer.service';
import { getBaseTime, getTimeBySeconds } from '@shared/helper/date.helper';

export type TimerType = 'count-up' | 'count-down';

@Component({
  selector: 'app-timer',
  imports: [],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss',
})
export class TimerComponent implements OnInit {
  @Input() timerType: TimerType = 'count-up';
  @Input() interval: number = 60; // in seconds

  countUp: number = 0;
  countDown: number = 0;

  constructor(private timerService: TimerService) {}

  ngOnInit() {
    this.timerService.setTimerType(this.timerType);
    this.timerService.setCountDown(this.interval);
    this.timerService.countUp$.subscribe((val) => {
      this.countUp = val;
    });
    this.timerService.countDown$.subscribe((val) => {
      this.countDown = val;
    });
  }

  formatTime(interval: number): string {
    if (interval < 60) {
      return `${interval}s`;
    } else if (interval < 3600) {
      return format(getTimeBySeconds(interval), 'mm:ss');
    } else if (interval < 86400) {
      return format(getTimeBySeconds(interval), 'HH:mm:ss');
    }

    const days = Math.floor(interval / 86400);
    const remaining = interval % 86400;
    const timePart = format(getTimeBySeconds(remaining), 'HH:mm:ss');
    return `${days} day${days > 1 ? 's' : ''} ${timePart}`;
  }
}
