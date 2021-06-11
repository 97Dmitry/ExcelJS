import { lStorage } from "@core/utils";

const columnWidthInStorage = lStorage("excelStorage")?.columnState;
const defaultColumnWidth = 120;
const rowHeightInStorage = lStorage("excelStorage")?.rowState;
const defaultRowHeight = 28;
const cellTextInStorage = lStorage("excelStorage")?.cellState;

export function tableTemplate(tableRowCount: number, tableColumnCount: number): string {
  function lettersGenerator(columnCount: number): Array<string> {
    const firstLetter = 65;
    columnCount > 25
      ? columnCount = 25
      : null;
    const letters = [];
    for (let i = firstLetter; i <= firstLetter + columnCount; i++) {
      letters.push(String.fromCharCode(i));
    }
    return letters;
  }

  function columnGenerator(array: Array<string>): string {
    let columns = "";
    for (const i of array) {
      const width = columnWidthInStorage && columnWidthInStorage[i]
        ? columnWidthInStorage[i] : defaultColumnWidth;
      columns += `
                  <div class="excel__table-row-data__column-name"
                    style="width: ${width}px"
                    data-type="resizable"
                    data-column-name="${i}"
                  >
                    ${i}
                    <div class="excel__table-column-resizer" data-resize="column"></div>
                  </div>`;
    }
    return columns;
  }

  function cellGenerator(cellCount: number, rowName: number): string {
    let cell = "";
    const letters = lettersGenerator(cellCount);
    for (let i = 0; i <= cellCount; i++) {
      const cellText = cellTextInStorage && cellTextInStorage[letters[i] + ":" + rowName]
        ? cellTextInStorage[letters[i] + ":" + rowName] : "";
      const width = columnWidthInStorage && columnWidthInStorage[letters[i]]
        ? columnWidthInStorage[letters[i]] : defaultColumnWidth;
      cell += `
                <div
                  class="excel__table-row-data__cell"
                  style="width: ${width}px"
                  contenteditable
                  data-cell = "true"
                  data-cell-column="${letters[i]}"
                  data-cell-row="${rowName}"
                  data-cell-position="${letters[i]}:${rowName}"
                >
                  ${cellText}
                </div>
              `;
    }
    return cell;
  }

  function rowGenerator(rowCount: number, columnCount: number): string {
    let rows = "";
    for (let i = 1; i <= rowCount; i++) {
      const height = rowHeightInStorage && rowHeightInStorage[i]
        ? rowHeightInStorage[i] : defaultRowHeight;
      rows += `
                <div class="excel__table-row"
                  style="height: ${height}px"
                  data-type="resizable"
                  data-row-name="${i}"
                >
                  <div class="excel__table-row__name">
                    ${i}
                    <div class="excel__table-row-resizer" data-resize="row"></div>
                  </div>
                  <div class="excel__table-row-data">
                    ${cellGenerator(columnCount, i)}
                  </div>
                </div>
              `;
    }
    return rows;
  }

  function tableCreate(rowCount: number, columnCount: number): string {
    columnCount > 25
      ? columnCount = 25
      : null;
    return `
          <div class="excel__table-row">
            <div class="excel__table-row__name"></div>
            <div class="excel__table-row-data">
              ${columnGenerator(lettersGenerator(columnCount))}
            </div>
          </div>
            ${rowGenerator(rowCount, columnCount)}
`;
  }

  return tableCreate(tableRowCount, tableColumnCount);
}
