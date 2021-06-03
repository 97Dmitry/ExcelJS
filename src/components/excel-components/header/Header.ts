// import { ExcelComponent } from "@core/ExcelComponent";

import { ExcelComponent } from "../../../core/ExcelComponent";

/**
 * Header
 */
export class Header extends ExcelComponent {
  static className = "excel__header"

  toHTML(): string {
    return `
      <label>
            <input type="text" class="excel__header-input" value="New table">
          </label>
          <div class="excel__header-buttons">
            <div class="button">
              <i class="material-icons">delete</i>
            </div>
            <div class="button">
              <i class="material-icons">exit_to_app</i>
            </div>
          </div>
    `;
  }
}
