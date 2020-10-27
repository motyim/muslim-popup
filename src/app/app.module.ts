import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CountdownModule } from 'ngx-countdown';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PrayerBoxComponent } from './prayer-box/prayer-box.component';
import { QuranBoxComponent } from './quran-box/quran-box.component';
import { LinkBoxComponent } from './link-box/link-box.component';
import { FooterComponent } from './footer/footer.component';
import { MainviewComponent } from './mainview/mainview.component';
import { AboutviewComponent } from './aboutview/aboutview.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PrayerBoxComponent,
    QuranBoxComponent,
    LinkBoxComponent,
    FooterComponent,
    MainviewComponent,
    AboutviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    CountdownModule,
    LoggerModule.forRoot({ level: NgxLoggerLevel.DEBUG})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
