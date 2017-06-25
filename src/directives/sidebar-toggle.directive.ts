import {Directive, Input, ElementRef, Renderer, HostListener} from '@angular/core';
import {Store} from "@ngrx/store";
import { AppState } from "../redux/app-state";
import { getLeftSidebarState, getRightSidebarState} from '../redux'
import { OpenLeftSidebarAction, CloseLeftSidebarAction, OpenRightSidebarAction, CloseRightSidebarAction} from '../redux/layout/layout.actions'
@Directive({
  selector: '[sidebarToggle]'
})

export class SidebarToggleDirective {
  public leftSidebarState: boolean;
  public rightSidebarState: boolean;
  @Input() sidebarToggle: string;

  @HostListener('click', ['$event'])
  onClick(e) {
    console.log('SidebarToggleDirective Clicked')
    /*
     Left sidenav toggle
     */
    if (this.sidebarToggle == "left" && this.leftSidebarState) {
      this._store.dispatch(new CloseLeftSidebarAction());
    } else if(this.sidebarToggle == "left" && !this.leftSidebarState) {
      this._store.dispatch(new OpenLeftSidebarAction())
    }

    /*
     Right sidenav toggle
     */
    if (this.sidebarToggle == "right" && this.rightSidebarState) {
      this._store.dispatch(new CloseRightSidebarAction());
    } else if(this.sidebarToggle == "right" && !this.rightSidebarState) {
      this._store.dispatch(new OpenRightSidebarAction());
    }
  }

  constructor(
    private el: ElementRef,
    private renderer: Renderer,
    private _store: Store<AppState>
  ) {

    console.log('built sidebartoggle directive');

    this._store.select(getLeftSidebarState).subscribe((state) => {
      this.leftSidebarState = state;
    });

    this._store.select(getRightSidebarState).subscribe((state) => {
      this.rightSidebarState = state;
    });

  }

}
