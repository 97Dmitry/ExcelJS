export function tableTemplate(): string {
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
      columns += `<div class="excel__table-row-data__column-name">${i}</div>`;
    }
    return columns;
  }

  function cellGenerator(cellCount: number): string {
    let cell = "";
    for (let i = 0; i <= cellCount; i++) {
      cell += "<div class=\"excel__table-row-data__cell\" contenteditable></div>";
    }
    return cell;
  }

  function rowGenerator(rowCount: number, columnCount: number): string {
    let rows = "";
    for (let i = 1; i <= rowCount; i++) {
      rows += `
                <div class="excel__table-row">
                  <div class="excel__table-row__name">${i}</div>
                  <div class="excel__table-row-data">
                    ${cellGenerator(columnCount)}
                  </div>
                </div>
              `;
    }
    return rows;
  }

  function tableCreate(columnCount: number, rowCount: number): string {
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

  return tableCreate(28, 100);
}
