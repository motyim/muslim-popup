import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PrayerBoxComponent } from './prayer-box/prayer-box.component';
import { QuranBoxComponent } from './quran-box/quran-box.component';
import { LinkBoxComponent } from './link-box/link-box.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PrayerBoxComponent,
    QuranBoxComponent,
    LinkBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
