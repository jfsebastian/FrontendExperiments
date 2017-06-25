import { Action } from '@ngrx/store';
import { LayoutActions, LayoutActionTypes } from './layout.actions';
import { LayoutState, initialState } from './layout.state';

export function reducer(state = initialState, action: Action): LayoutState {
  switch (action.type) {
    /*
     Modal cases
     */
    case LayoutActionTypes.OPEN_MODAL: {
      const name = action.payload;
      return Object.assign({}, state, {
        openedModalName: name
      });
    }
    case LayoutActionTypes.CLOSE_MODAL: {
      return Object.assign({}, state, {
        openedModalName: null
      });
    }
    /*
     Sidebar cases
     */
    case LayoutActionTypes.OPEN_LEFT_SIDENAV: {
      const name = action.payload;
      return Object.assign({}, state, {
        leftSidebarOpened: true
      });
    }
    case LayoutActionTypes.CLOSE_LEFT_SIDENAV: {
      return Object.assign({}, state, {
        leftSidebarOpened: false
      });
    }
    case LayoutActionTypes.OPEN_RIGHT_SIDENAV: {
      const name = action.payload;
      return Object.assign({}, state, {
        rightSidebarOpened: true
      });
    }
    case LayoutActionTypes.CLOSE_RIGHT_SIDENAV: {
      return Object.assign({}, state, {
        rightSidebarOpened: false
      });
    }
    /*
     Default
     */
    default:
      return state;
  }
}

export const getOpenedModalName = (state: LayoutState) => state.openedModalName;

export const getLeftSidebarState = (state: LayoutState) => state.leftSidebarOpened;
export const getRightSidebarState = (state: LayoutState) => state.rightSidebarOpened;
