import {Component, OnInit} from '@angular/core';
import {PrayerService} from '../services/prayer.service';

@Component({
  selector: 'app-prayer-box',
  templateUrl: './prayer-box.component.html',
  styleUrls: ['./prayer-box.component.css']
})
export class PrayerBoxComponent implements OnInit {

  // arabicDate = 'الاثنين، ١٠ ربيع الأول ١٤٤٢ هـ |';
  arabicDate = '';
  engDate = new Intl.DateTimeFormat('ar-EG', {day: 'numeric', month: 'long'}).format(Date.now());

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
        console.log(dayData);
        // @ts-ignore
        this.arabicDate = this.getHijreDate(dayData.date.hijri);
      });
    });
  }

  private getHijreDate(hijriData): string {
    const day = hijriData.weekday.ar;
    const dayNumber = hijriData.day;
    const month = hijriData.month.ar;
    const year = hijriData.year;

    return `${day}، ${dayNumber} ${month} ${year} هـ`;
  }

}
