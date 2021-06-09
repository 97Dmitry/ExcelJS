import { $, DOM } from "@core/DOM";

export function resizer($source: DOM, event: any) {
  const resizeType = event.target.dataset.resize;
  const $resizer = $(event.target);
  const $parent = $resizer.getParentByData("[data-type='resizable']");
  const parentCoord = $parent.getCoord();
  let newWidth: number;
  let newHeight: number;

  document.onmousemove = (e: MouseEvent) => {
    if (resizeType === "column") {
      $resizer.css({ opacity: 1, bottom: "-5000px" });
      const delta = e.screenX - parentCoord.right;
      newWidth = parentCoord.width + delta;
      $resizer.css({ right: -delta + "px" });
    } else {
      $resizer.css({ opacity: 1, right: "-5000px" });
      const delta = parentCoord.bottom - e.clientY;
      newHeight = parentCoord.height - delta;
      $resizer.css({ bottom: delta + "px" });
    }
  };
  document.onmouseup = () => {
    if (resizeType === "column") {
      $parent.css({ width: `${newWidth}px` });
      $source.getAllBySelector(`[data-cell-column="${$parent.$el.outerText}"]`)
          .forEach((el: any) => {
            el.style.width = newWidth + "px";
          });
    } else {
      $parent.css({ height: `${newHeight}px` });
    }
    $resizer.css({ opacity: 0, bottom: 0, right: 0 });
    document.onmousemove = null;
    document.onmouseup = null;
  };
}

export function cellSelector(event: any, $target: any, selection: any, $source: any) {
  if (!event.shiftKey) {
    selection.select($target);
  } else if (event.shiftKey) {
    const cur = cellPositionParser(selection.current.data.cellPosition);
    const target = cellPositionParser($target.data.cellPosition);
    selection.selectSeveral(
        builderCellsPosition(cur, target), $source
    );
  }
}

export function cellPositionParser(pos: string) {
  const parsedPos = pos.split(":");
  const column = parsedPos[0];
  const row = parsedPos[1];
  return { row: +row, column };
}

export function builderCellsPosition(start: any, end: any) {
  let startRow = start.row;
  let startColumn = start.column.charCodeAt() - 64;
  let endRow = end.row;
  let endColumn = end.column.charCodeAt() - 64;
  if (startRow > endRow) {
    [startRow, endRow] = [endRow, startRow];
  }
  if (startColumn > endColumn) {
    [startColumn, endColumn] = [endColumn, startColumn];
  }
  const rows: number[] = [];
  const columns: string[] = [];
  for (let i = startRow; i <= endRow; i++) {
    rows.push(i);
  }
  for (let i = startColumn; i <= endColumn; i++) {
    columns.push(String.fromCharCode(i + 64));
  }

  return columns.reduce((acc, column) => {
    rows.forEach((row) => {
      acc.push(`${column}:${row}`);
    });
    return acc;
  }, []);
}

export function letterChanger(letter: string, route: number, columnCount: number): string {
  columnCount > 25 ? columnCount = 25 : null;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const letterCode = letter.charCodeAt();
  if (route === 1 && letterCode < 65 + columnCount) {
    return String.fromCharCode(letterCode + 1);
  } else if (route === -1 && letterCode > 65) {
    return String.fromCharCode(letterCode - 1);
  } else {
    return String.fromCharCode(letterCode);
  }
}

interface Pos {row: number, column: string}
export function nextSelector(
    event: any,
    { row, column }: Pos,
    rowCount: number,
    columnCount: number,
    route: number = 0
) {
  if (event.key === "Enter" && !event.shiftKey && row < rowCount) {
    event.preventDefault();
    row++;
    return `[data-cell-position="${column}:${row}"]`;
  } else if (event.key === "Tab" && !event.shiftKey) {
    event.preventDefault();
    route = 1;
    column = (letterChanger(column, route, columnCount));
    return `[data-cell-position="${column}:${row}"]`;
  } else if (event.key === "Tab" && event.shiftKey) {
    event.preventDefault();
    route = -1;
    column = (letterChanger(column, route, columnCount));
    return `[data-cell-position="${column}:${row}"]`;
  } else {
    return `[data-cell-position="${column}:${row}"]`;
  }
}
