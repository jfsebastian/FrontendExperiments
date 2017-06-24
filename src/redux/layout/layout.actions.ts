import {Action} from '@ngrx/store';

// Layout Actions
export const LayoutActionTypes = {
  OPEN_MODAL: '[Layout] Open Modal',
  CLOSE_MODAL: '[Layout] Close Modal'
};

export type LayoutActions = CloseModalAction | OpenModalAction;

/**
 * Modal Actions
 */
export class OpenModalAction implements Action {
  type = LayoutActionTypes.OPEN_MODAL;
  constructor(public payload: string) {

  }
}

export class CloseModalAction implements Action {
  type = LayoutActionTypes.CLOSE_MODAL;
  constructor() {

  }
}
