import { CELL_TEXT, ROW_RESIZE, TABLE_RESIZE } from "./types";

export function tableResizeAction(data: Record<string, any>) {
  return {
    type: data.type === "column" ? TABLE_RESIZE : ROW_RESIZE,
    data,
  };
}

export function cellTextAction(data: Record<string, any>) {
  return {
    type: CELL_TEXT,
    data,
  };
}
