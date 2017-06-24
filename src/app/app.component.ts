/**
 * Angular 2 decorators and services
 */
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

/**
 * Reducers, States and Actions
 */
import {} from '../redux';
import { AppState } from '../redux/app-state'
import { OpenModalAction, CloseModalAction } from '../redux/layout/layout.actions'

/**
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [ './app.component.css' ],
  templateUrl: './app.template.html'
})
export class AppComponent implements OnInit {
  public angularclassLogo = 'assets/img/angularclass-avatar.png';
  public name = 'Angular 2 Webpack Starter';
  public url = 'https://twitter.com/AngularClass';

  constructor(
    private store: Store<AppState>
  ) {}

  public ngOnInit() {
    console.log('Initial App State');
  }

  public handleOpenModal(modalName: string) {
    this.store.dispatch(new OpenModalAction(modalName));
  }
  public handleCloseModal() {
    this.store.dispatch(new CloseModalAction());
  }

}

/**
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
