import {compose} from "@ngrx/core";
import {combineReducers} from "@ngrx/store";
import { createSelector } from 'reselect';
import {storeLogger} from "ngrx-store-logger";

import { AppState } from './app-state';
import * as fromLayout from "./layout/layout.reducer";

export const reducers = {
  layout: fromLayout.reducer
}

const developmentReducer:Function = compose(storeLogger(), combineReducers)(reducers);
export function metaReducer(state: any, action: any) {
  return developmentReducer(state, action);
}

/**
 * Layout selectors
 **/
export const getLayoutState = (state: AppState) => state.layout;
export const getLayoutOpenedModalName = createSelector(getLayoutState , fromLayout.getOpenedModalName);
