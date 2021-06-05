import { ExcelComponent } from "@core/ExcelComponent";
import { DOM } from "@core/DOM";

export class Toolbar extends ExcelComponent {
  static className = "excel__toolbar"

  constructor($source: DOM) {
    super($source, {
      name: "Toolbar",
    });
  }

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
