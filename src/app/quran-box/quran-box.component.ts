import {Component, OnInit} from '@angular/core';
import {QuranService} from '../services/quran.service';


@Component({
  selector: 'app-quran-box',
  templateUrl: './quran-box.component.html',
  styleUrls: ['./quran-box.component.css']
})
export class QuranBoxComponent implements OnInit {

  ayah: string;
  surah: string;
  surahNumber: number;
  ayahNumberInSurah: number;

  constructor(private quranService: QuranService) {
  }


  ngOnInit(): void {
    this.quranService.getAyah().then(value => {
      value.subscribe(response => {
          // @ts-ignore
          this.ayah = response.data.text;
          // @ts-ignore
          this.surah = response.data.surah.name;
          // @ts-ignore
          this.surahNumber = response.data.surah.number;
          // @ts-ignore
          this.ayahNumberInSurah = response.data.numberInSurah;
        });
    });
  }

}
