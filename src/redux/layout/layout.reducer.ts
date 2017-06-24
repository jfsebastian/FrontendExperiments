import { LayoutActions, LayoutActionTypes } from './layout.actions';
import {LayoutState, initialState} from './layout.state';

export function reducer(state = initialState, action: LayoutActions): LayoutState {
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
     Default
     */
    default:
      return state;
  }
}

export const getOpenedModalName = (state:LayoutState) => state.openedModalName;
