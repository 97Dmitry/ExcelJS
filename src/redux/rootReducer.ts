import { CELL_TEXT, ROW_RESIZE, TABLE_RESIZE } from "./types";

export function rootReducer(state: Record<string, any>, action: any) {
  let prev;
  switch (action.type) {
    case TABLE_RESIZE:
      prev = state.columnState || {};
      prev[action.data.columnName] = action.data.columnWidth;
      return { ...state, columnState: { ...prev } };
    case ROW_RESIZE:
      prev = state.rowState || {};
      prev[action.data.rowName] = action.data.rowHeight;
      return { ...state, rowState: { ...prev } };
    case CELL_TEXT:
      prev = state.cellState || {};
      prev[action.data.cellName] = action.data.cellText;
      action.data.cellText === "" ? delete prev[action.data.cellName] : null;
      return { ...state, cellState: { ...prev } };
    default: return state;
  }
}
