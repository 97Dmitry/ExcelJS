// import { ExcelComponent } from "@core/ExcelComponent";

import { ExcelComponent } from "../../../core/ExcelComponent";

/**
 * Toolbar
 */
export class Toolbar extends ExcelComponent {
  static className = "excel__toolbar"

  toHTML(): string {
    return `
      <div class="excel__toolbar-buttons">
            <div class="button">
              <i class="material-icons">format_align_left</i>
            </div>
            <div class="button">
              <i class="material-icons">format_align_center</i>
            </div>
            <div class="button">
              <i class="material-icons">format_align_right</i>
            </div>
            <div class="button">
              <i class="material-icons">format_bold</i>
            </div>
            <div class="button">
              <i class="material-icons">format_italic</i>
            </div>
            <div class="button">
              <i class="material-icons">format_underline</i>
            </div>
          </div>
    `;
  }
}
