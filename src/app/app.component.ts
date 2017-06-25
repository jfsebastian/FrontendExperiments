/**
 * Angular 2 decorators and services
 */
import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { NgClass } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'

/**
 * Reducers, States and Actions
 */
import { getLayoutOpenedModalName, getLeftSidebarState, getRightSidebarState } from '../redux';
import { AppState } from '../redux/app-state';
import { OpenModalAction, CloseModalAction } from '../redux/layout/layout.actions';


/**
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [ './app.style.css' ],
  templateUrl: './app.template.html'
})
export class AppComponent implements OnInit, AfterViewInit {


  public openedModalName$: Observable<any>;
  public leftSidebarOpen$: Observable<any>;
  public rightSidebarOpen$: Observable<any>;

  public fadeBack: boolean;
  public leftSidebarOpen: boolean;
  public rightSidebarOpen: boolean;

  constructor(
    private store: Store<AppState>,
    private modalService: NgbModal
  ) {

  }

  public ngOnInit() {
    this.openedModalName$ = this.store.select(getLayoutOpenedModalName);
    this.leftSidebarOpen$ = this.store.select(getLeftSidebarState);
    this.rightSidebarOpen$ = this.store.select(getRightSidebarState);

    this.leftSidebarOpen$.subscribe((state) => {
      this.leftSidebarOpen = state;
    });
    this.rightSidebarOpen$.subscribe((state) => {
      this.rightSidebarOpen = state;
    });
    this.store.select(getRightSidebarState).subscribe((state) => {
      this.fadeBack = state;
    });
  }

  public ngAfterViewInit() {

  }

  public handleOpenModal(modalName: string) {
    this.store.dispatch(new OpenModalAction(modalName));
  }

  public handleCloseModal() {
    this.store.dispatch(new CloseModalAction());
  }

}
