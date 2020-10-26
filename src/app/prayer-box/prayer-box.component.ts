import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-prayer-box',
  templateUrl: './prayer-box.component.html',
  styleUrls: ['./prayer-box.component.css']
})
export class PrayerBoxComponent implements OnInit {

  arabicDate = new Intl.DateTimeFormat('ar-EG-u-ca-islamic', {
    day: 'numeric',
    month: 'long',
    weekday: 'long',
    year: 'numeric'
  }).format(Date.now());
  engDate = new Intl.DateTimeFormat('ar-EG', {day: 'numeric', month: 'long'}).format(Date.now());

  constructor() {
  }

  ngOnInit(): void {
  }

}
