/**
 * Angular 2 decorators and services
 */
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'

/**
 * Reducers, States and Actions
 */
import { getLayoutOpenedModalName } from '../redux';
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

  public openedModalName$: Observable<any>;

  constructor(
    private store: Store<AppState>,
    private modalService: NgbModal
  ) {
    this.openedModalName$ = store.select(getLayoutOpenedModalName);
  }

  public ngOnInit() {
  }

  public handleOpenModal(modalName: string) {
    this.store.dispatch(new OpenModalAction(modalName));
  }
  public handleCloseModal() {
    this.store.dispatch(new CloseModalAction());
  }

}
