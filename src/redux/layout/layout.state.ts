export interface LayoutState {
  openedModalName: string;
  leftSidebarOpened: boolean;
  rightSidebarOpened: boolean;
  alerts: Object[];
}

export const initialState: LayoutState = {
  openedModalName: null,
  leftSidebarOpened: false,
  rightSidebarOpened: false,
  alerts: []
}
