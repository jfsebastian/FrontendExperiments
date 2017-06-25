import { Action } from '@ngrx/store';

// Layout Actions
export const LayoutActionTypes = {
  // Modal Actions
  OPEN_MODAL: '[Layout] Open Modal',
  CLOSE_MODAL: '[Layout] Close Modal',
  // Left sidenav actions
  OPEN_LEFT_SIDENAV: '[Layout] Open LeftSidebar',
  CLOSE_LEFT_SIDENAV: '[Layout] Close LeftSidebar',
  // Right sidenav actions
  OPEN_RIGHT_SIDENAV: '[Layout] Open RightSidebar',
  CLOSE_RIGHT_SIDENAV: '[Layout] Close RightSidebar',
  // Alerts
  ADD_ALERT: '[Layout] Add Alert',
  REMOVE_ALERT: '[Layout] Remove Alert',
};

/*
 Modal actions
 */
export class OpenModalAction implements Action {
  public type = LayoutActionTypes.OPEN_MODAL;
  constructor(public payload:string) { }
}

export class CloseModalAction implements Action {
  public type = LayoutActionTypes.CLOSE_MODAL;
  constructor() { }
}

/*
 Sidebar actions
 */
export class OpenLeftSidebarAction  implements Action {
  public type = LayoutActionTypes.OPEN_LEFT_SIDENAV;
  constructor() { }
}

export class CloseLeftSidebarAction implements Action {
  public type = LayoutActionTypes.CLOSE_LEFT_SIDENAV;
  constructor() { }
}

export class OpenRightSidebarAction  implements Action {
  public type = LayoutActionTypes.OPEN_RIGHT_SIDENAV;
  constructor() { }
}

export class CloseRightSidebarAction implements Action {
  public type = LayoutActionTypes.CLOSE_RIGHT_SIDENAV;
  constructor() { }
}

/*
 Alert actions
 */
export class AddAlertAction implements Action {
  public type = LayoutActionTypes.ADD_ALERT;
  constructor(public payload: Object) { }
}

export class RemoveAlertAction implements Action {
  public type = LayoutActionTypes.REMOVE_ALERT;
  constructor(public payload: Object) { }
}

// TODO: Define LayoutActions as a Type implementing Action and not failing tests in build phase
export type LayoutActions = OpenModalAction | CloseModalAction |
  OpenLeftSidebarAction | CloseLeftSidebarAction | OpenRightSidebarAction | CloseRightSidebarAction |
  AddAlertAction | RemoveAlertAction;
