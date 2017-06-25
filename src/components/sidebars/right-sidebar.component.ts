import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from '../../redux/app-state';
import { getAlertsState } from '../../redux';
import { AddAlertAction, RemoveAlertAction } from '../../redux/layout/layout.actions';

@Component({
  selector: 'right-sidebar',
  templateUrl: './right-sidebar.template.html',
  styleUrls: ['./sidebar.styles.css']
})

export class RightSidebarComponent implements OnInit{

  @Input() public sidebarState: boolean;

  public alerts$: Observable<any>;

  constructor(
    private store: Store<AppState>,
  ) {

  }

  public ngOnInit() {
    this.alerts$ = this.store.select(getAlertsState);
  }

  public addAlert(alert) {
    this.store.dispatch(new AddAlertAction(alert));
  }
  public removeAlert(alert) {
    this.store.dispatch(new RemoveAlertAction(alert));
  }

}
