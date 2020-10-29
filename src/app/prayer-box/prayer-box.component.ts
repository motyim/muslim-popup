import {Component, OnInit} from '@angular/core';
import {PrayerService} from '../services/prayer.service';
import {Pray} from '../model/pray';
import {CountdownEvent} from 'ngx-countdown';
import {NGXLogger} from 'ngx-logger';
import {faStarAndCrescent} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-prayer-box',
  templateUrl: './prayer-box.component.html',
  styleUrls: ['./prayer-box.component.css']
})
export class PrayerBoxComponent implements OnInit {

  faStarAndCrescent = faStarAndCrescent;
  arabicDate = '';
  engDate = new Intl.DateTimeFormat('ar-EG', {day: 'numeric', month: 'long'}).format(Date.now());
  prayName: string;
  hour: number;
  min: number;
  mood: string;
  prayTimeNow: boolean;
  leftTime: number;
  private marginTime: number;
  holidays: string;
  holidayURL: string;

  constructor(private prayer: PrayerService, private logger: NGXLogger) {
    this.marginTime = 5;
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
    this.logger.debug('next day ' + nextPray.nextDay, date.getDate());
    if (nextPray.nextDay) {
      date.setDate(date.getDate() + 1);
    }
    date.setHours(nextPray.hour, nextPray.min, 0);
    const countDownDate = date.getTime();

    const now = new Date().getTime();
    const distance = countDownDate - now;
    if (distance > 0) {
      this.logger.debug(`distance time :  ${distance}`);
      this.leftTime = distance / 1000;
      this.logger.debug(`left time : ${this.leftTime}`);
      this.prayTimeNow = false;
    } else {
      this.prayTimeNow = true;
    }
  }


  private getHijreDate(hijriData): string {
    const day = hijriData.weekday.ar;
    const dayNumber = hijriData.day;
    const month = hijriData.month.ar;
    const year = hijriData.year;

    this.printHolidays(hijriData.holidays);

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
      if (hours < prayHour || (hours === prayHour && mins <= prayMin + this.marginTime)) {
        return {
          name: arabicPrayers[key],
          hour: prayHour,
          min: prayMin,
          nextDay: false
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
      name: 'الفجر - غدا',
      hour: this.getHour(praytime),
      min: this.getMin(praytime),
      nextDay: true
    };
  }


  handleEvent(event: CountdownEvent): void {
    if (event.status === 3) {
      this.logger.debug(event);
      this.logger.debug(`pray time is now`);
      this.prayTimeNow = true;
    }
  }

  printHolidays(holidays): void {
    const holidaysInfo = {
      'Lailat-ul-Miraj': {
        name: 'ليله المعراج',
        url: 'https://ar.wikipedia.org/wiki/%D8%A7%D9%84%D8%A5%D8%B3%D8%B1%D8%A7%D8%A1_%D9%88%D8%A7%D9%84%D9%85%D8%B9%D8%B1%D8%A7%D8%AC'
      },
      'Lailat-ul-Bara\'at': {
        name: 'ليله البارات',
        url: 'https://ar.wikipedia.org/wiki/%D9%84%D9%8A%D9%84%D8%A9_%D9%85%D9%86%D8%AA%D8%B5%D9%81_%D8%B4%D8%B9%D8%A8%D8%A7%D9%86'
      },
      '1st Day of Ramadan': {
        name: 'اول ليله رمضان',
        url: 'https://ar.wikipedia.org/wiki/%D8%B1%D9%85%D8%B6%D8%A7%D9%86'
      },
      'Lailat-ul-Qadr': {
        name: 'ليله القدر',
        url: 'https://ar.wikipedia.org/wiki/%D9%84%D9%8A%D9%84%D8%A9_%D8%A7%D9%84%D9%82%D8%AF%D8%B1'
      },
      'Eid-ul-Fitr': {
        name: 'عيد الفطر',
        url: 'https://ar.wikipedia.org/wiki/%D8%B9%D9%8A%D8%AF_%D8%A7%D9%84%D9%81%D8%B7%D8%B1'
      },
      Arafa: {
        name: 'يوم عرفه',
        url: 'https://ar.wikipedia.org/wiki/%D9%8A%D9%88%D9%85_%D8%B9%D8%B1%D9%81%D8%A9'
      },
      Ashura: {
        name: 'يوم عاشوراء',
        url: 'https://ar.wikipedia.org/wiki/%D8%B9%D8%A7%D8%B4%D9%88%D8%B1%D8%A7%D8%A1'
      },
      'Eid-ul-Adha': {
        name: 'عيد الاضحي',
        url: 'https://ar.wikipedia.org/wiki/%D8%B9%D9%8A%D8%AF_%D8%A7%D9%84%D8%A3%D8%B6%D8%AD%D9%89'
      },
      'Mawlid al-Nabi': {
        name: 'المولد النبوي',
        url: 'https://ar.wikipedia.org/wiki/%D8%A7%D9%84%D9%85%D9%88%D9%84%D8%AF_%D8%A7%D9%84%D9%86%D8%A8%D9%88%D9%8A'
      },

    };
    for (const key in holidays) {
      if (holidays[key] in holidaysInfo) {
        this.holidays = holidaysInfo[holidays[key]].name;
        this.holidayURL = holidaysInfo[holidays[key]].url;
      }
    }
  }
}
