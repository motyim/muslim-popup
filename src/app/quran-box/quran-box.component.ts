import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quran-box',
  templateUrl: './quran-box.component.html',
  styleUrls: ['./quran-box.component.css']
})
export class QuranBoxComponent implements OnInit {

  ayah : string = "ثُمَّ بَعَثْنَاكُمْ مِنْ بَعْدِ مَوْتِكُمْ لَعَلَّكُمْ تَشْكُرُونَ";
  surah : string = "البقره";
  surahNumber : number = 1;
  ayahNumberInSurah : number = 1 ;
  constructor() { }

  ngOnInit(): void {
  }

}
