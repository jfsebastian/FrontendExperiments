import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home';
import { NoContentComponent } from '../components/no-content';
import { TweetDashboardComponent } from '../components/tweet-dashboard';

import { DVWD3SimpleHistogramComponent, DVWD3DrWhoVillainsComponent, DVWD3SVGComponent, DVWD3PathComponent,
  DVWDAxesComponent, DVWD3CSSComponent, DVWD3ColorComponent } from '../components/data-visualization-with-d3';

import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'tweets', component: TweetDashboardComponent },
  { path: 'dvwd3-01-simple-histogram', component: DVWD3SimpleHistogramComponent },
  { path: 'dvwd3-03-drwho-villains', component: DVWD3DrWhoVillainsComponent },
  { path: 'dvwd3-04-svg', component: DVWD3SVGComponent },
  { path: 'dvwd3-05-path', component: DVWD3PathComponent },
  { path: 'dvwd3-06-axes', component: DVWDAxesComponent },
  { path: 'dvwd3-07-css', component: DVWD3CSSComponent },
  { path: 'dvwd3-08-color', component: DVWD3ColorComponent },
  { path: '**',    component: NoContentComponent },
];
