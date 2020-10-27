import {Component, OnInit} from '@angular/core';
import {PrayerService} from '../services/prayer.service';
import {Pray} from '../model/pray';
import {CountdownEvent} from 'ngx-countdown';
import {NGXLogger} from 'ngx-logger';

@Component({
  selector: 'app-prayer-box',
  templateUrl: './prayer-box.component.html',
  styleUrls: ['./prayer-box.component.css']
})
export class PrayerBoxComponent implements OnInit {

  arabicDate = '';
  engDate = new Intl.DateTimeFormat('ar-EG', {day: 'numeric', month: 'long'}).format(Date.now());
  prayName: string;
  hour: number;
  min: number;
  mood: string;
  prayTimeNow: boolean;
  leftTime: number;

  constructor(private prayer: PrayerService, private logger: NGXLogger) {
  }

  ngOnInit(): void {
    const d = new Date();
    const day = d.getDate();
    this.logger.debug('today number ', day);
    this.prayer.getParyerTime(5, d.getMonth() + 1, d.getFullYear()).then(value => {
      value.subscribe(res => {
        // @ts-ignore
        const dayData = res.data[day - 1];
        // @ts-ignore
        this.arabicDate = this.getHijreDate(dayData.date.hijri);
        // @ts-ignore
        let nextPray = this.getNextPray(dayData.timings);

        if (!nextPray) {
          this.logger.debug('get next pray for tomorrow ');
          // @ts-ignore
          nextPray = this.getFirstPraySecondDay(res.data[day].timings);
          // TODO : handle if the last day in month
        }

        this.printPrayInfo(nextPray);
      });
    });
  }

  private printPrayInfo(nextPray: Pray): void {
    this.prayName = nextPray.name;
    this.min = nextPray.min;
    this.mood = nextPray.hour >= 12 ? 'PM' : 'AM';
    this.hour = nextPray.hour % 12 || 12;

    // set remain time
    const date = new Date();
    date.setHours(nextPray.hour, nextPray.min, 0);
    const countDownDate = date.getTime();

    const now = new Date().getTime();
    const distance = countDownDate - now;
    this.logger.debug(`distance time :  ${distance}`);
    this.leftTime = distance / 1000;
    this.logger.debug(`left time : ${this.leftTime}`);
    this.prayTimeNow = false;
  }


  private getHijreDate(hijriData): string {
    const day = hijriData.weekday.ar;
    const dayNumber = hijriData.day;
    const month = hijriData.month.ar;
    const year = hijriData.year;

    return `${day}، ${dayNumber} ${month} ${year} هـ`;
  }

  private getNextPray(timing: Array<object>): Pray {
    const mainPrayers = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
    const arabicPrayers = ['الفجر', 'الظهر', 'العصر', 'المغرب', 'العشاء'];
    const date = new Date();
    const hours = date.getHours();
    const mins = date.getMinutes();


    // tslint:disable-next-line:forin
    for (const key in mainPrayers) {
      const prayTime = timing[mainPrayers[key]];

      const prayHour = this.getHour(prayTime);
      const prayMin = this.getMin(prayTime);

      this.logger.debug(`hours:${hours},prayHour:${prayHour},mins:${mins},prayMin:${prayMin}`);
      this.logger.debug(hours < prayHour || (hours === prayHour && mins <= prayMin));
      if (hours < prayHour || (hours === prayHour && mins <= prayMin)) {
        return {
          name: arabicPrayers[key],
          hour: prayHour,
          min: prayMin
        };
      }
    }
    return null;
  }


  private getHour(str: string): number {
    return parseInt(str.substr(0, 3), 10);
  }


  private getMin(str: string): number {
    return parseInt(str.substr(3, 6), 10);
  }

  private getFirstPraySecondDay(timings): Pray {
    const key = 'Fajr';
    const praytime = timings[key];
    return {
      name: 'الفجر ( غدا )',
      hour: this.getHour(praytime),
      min: this.getMin(praytime)
    };
  }


  handleEvent(event: CountdownEvent): void {
    if (event.status === 3) {
      this.logger.debug(event);
      this.logger.debug(`pray time is now`);
      this.prayTimeNow = true;
    }
  }
}
