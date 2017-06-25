import { Routes } from '@angular/router';
import { HomeComponent } from '../Components/home';
import { NoContentComponent } from '../Components/no-content';
import { TweetDashboardComponent } from '../Components/tweet-dashboard';

import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'tweets', component: TweetDashboardComponent },

  { path: '**',    component: NoContentComponent },
];
