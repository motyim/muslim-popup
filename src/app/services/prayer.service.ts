import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrayerService {

  private aladhanURL = 'http://api.aladhan.com/v1/calendar';


  constructor(private http: HttpClient) {
  }


  async getParyerTime(method: number, month: number, year: number): Promise<Observable<object>> {
    let late: number;
    let long: number;
    await this.getPostion().then(value => {
      late = value.latitude;
      long = value.longitude;
    });

    const parms = this.getParams(late, long, method, month, year);
    console.log(parms);
    return this.http.get(`${this.aladhanURL}${parms}`);
  }


  private getParams(lat, long, method, month, year): string {
    return `?latitude=${lat}&longitude=${long}&method=${method}&month=${month}&year=${year}`;
  }

  getPostion(): Promise<any> {
    return new Promise(resolve => {
      navigator.geolocation.getCurrentPosition(position => {
        resolve(position.coords);
      });
    });
  }


}
