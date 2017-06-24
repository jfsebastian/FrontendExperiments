import { Routes } from '@angular/router';
import { HomeComponent } from '../Components/home';
import { AboutComponent } from './about';
import { NoContentComponent } from '../Components/no-content';

import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'home',  component: HomeComponent },

  { path: '**',    component: NoContentComponent },
];