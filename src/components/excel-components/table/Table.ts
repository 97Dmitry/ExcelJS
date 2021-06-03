// import { ExcelComponent } from "@/core/ExcelComponent";

import { ExcelComponent } from "../../../core/ExcelComponent";

/**
 * Table
 */
export class Table extends ExcelComponent {
  static className = "excel__table"

  toHTML(): string {
    return `
      <div class="excel__table-row">
        <div class="excel__table-row__name"></div>
        <div class="excel__table-row-data">
          <div class="excel__table-row-data__column-name">A</div>
          <div class="excel__table-row-data__column-name">B</div>
          <div class="excel__table-row-data__column-name">C</div>
        </div>
      </div>
      <div class="excel__table-row">
        <div class="excel__table-row__name">1</div>
        <div class="excel__table-row-data">
          <div class="excel__table-row-data__cell selected" contenteditable></div>
          <div class="excel__table-row-data__cell" contenteditable></div>
          <div class="excel__table-row-data__cell" contenteditable></div>
        </div>
      </div>
    `;
  }
}
