import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StorageService} from './storage.service';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class QuranService {

  quranUrl = environment.QuranURL;
  ayahNumber: number;

  constructor(private http: HttpClient, private storage: StorageService) {
  }

  async getAyah(): Promise<Observable<object>> {
    await this.getAyahNumber();
    return this.http.get(`${this.quranUrl}${this.ayahNumber}`);
  }

  async getAyahNumber(): Promise<void> {

    await this.storage.get('ayahNumber').then(value => {
      if (!value || value > 6236) {
        value = 1;
      }
      this.storage.save(value);
      this.ayahNumber = value;
    });
  }

}
