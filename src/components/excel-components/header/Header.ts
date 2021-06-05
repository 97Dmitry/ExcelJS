import { ExcelComponent } from "@core/ExcelComponent";
import { DOM } from "@core/DOM";

/**
 * Header
 */
export class Header extends ExcelComponent {
  static className = "excel__header"

  constructor($source: DOM) {
    super($source, {
      name: "Header",
    });
  }

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
