import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home';
import { NoContentComponent } from '../components/no-content';
import { TweetDashboardComponent } from '../components/tweet-dashboard';

import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'tweets', component: TweetDashboardComponent },

  { path: '**',    component: NoContentComponent },
];
