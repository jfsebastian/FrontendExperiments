export interface LayoutState {
  openedModalName: string;
  leftSidebarOpened: boolean;
  rightSidebarOpened: boolean;
}

export const initialState: LayoutState = {
  openedModalName: null,
  leftSidebarOpened: true,
  rightSidebarOpened: false
}
