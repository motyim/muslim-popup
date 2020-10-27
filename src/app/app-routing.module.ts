import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainviewComponent} from './mainview/mainview.component';
import {AboutviewComponent} from './aboutview/aboutview.component';

const routes: Routes = [
  { path: 'main', component: MainviewComponent },
  { path: 'about', component: AboutviewComponent },
  { path: '',   redirectTo: '/main', pathMatch: 'full' } // redirect to `first-component`
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
