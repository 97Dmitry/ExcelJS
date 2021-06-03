// import { ExcelComponent } from "@/core/ExcelComponent";

import { ExcelComponent } from "../../../core/ExcelComponent";

export class Formula extends ExcelComponent {
  static className = "excel__formula"

  toHTML(): string {
    return `
      <div class="excel__formula-subtitle">fx</div>
      <div class="excel__formula-input" contenteditable spellcheck="false"></div>
    `;
  }
}
