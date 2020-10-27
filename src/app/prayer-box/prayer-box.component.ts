import {Component, OnInit} from '@angular/core';
import {PrayerService} from '../services/prayer.service';
import {Pray} from '../model/pray';

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
  rSec: number;
  rMin: number;
  rHour: number;
  prayTimeNow: boolean;

  constructor(private prayer: PrayerService) {
  }

  ngOnInit(): void {
    const d = new Date();
    const day = d.getDate();
    console.log(day);
    this.prayer.getParyerTime(5, d.getMonth() + 1, d.getFullYear()).then(value => {
      value.subscribe(res => {
        // @ts-ignore
        const dayData = res.data[day - 1];
        // @ts-ignore
        this.arabicDate = this.getHijreDate(dayData.date.hijri);
        // @ts-ignore
        let nextPray = this.getNextPray(dayData.timings);

        if (!nextPray) {
          // @ts-ignore
          nextPray = this.getFirstPraySecondDay(res.data[day].timings);
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
    date.setHours(nextPray.hour, nextPray.min);
    const countDownDate = date.getTime();


    const timer = setInterval(() => {

      // Get today's date and time
      const now = new Date().getTime();

      // Find the distance between now and the count down date
      const distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Display the result in the element with id="demo"
      this.displayRemianTime(hours, minutes, seconds);
      this.prayTimeNow = false;
      // If the count down is finished, write some text
      if (distance < 0) {
        clearInterval(timer);
        this.prayTimeNow = true;
        this.displayRemianTime(0, 0, 0);
      }
    }, 1000);

  }

  private displayRemianTime(hours: number, minutes: number, seconds: number): void {
    this.rHour = hours;
    this.rMin = minutes;
    this.rSec = seconds;
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


    for (const key in mainPrayers) {
      const prayTime = timing[mainPrayers[key]];

      console.log(`hours <= this.getHour(prayTime) = ${hours <= this.getHour(prayTime)} && mins <= this.getMin(prayTime) = ${mins <= this.getMin(prayTime)}`);
      console.log(`${hours} <= ${this.getHour(prayTime)}  && ${mins} <= ${this.getMin(prayTime)} `);

      // @ts-ignore
      if (hours < this.getHour(prayTime) || (hours === this.getHour(prayTime) && mins <= this.getMin(prayTime))) {
        console.log(`>>hour ${this.getHour(prayTime)}`);
        return {
          name: arabicPrayers[key],
          hour: this.getHour(prayTime),
          min: this.getMin(prayTime)
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
}
