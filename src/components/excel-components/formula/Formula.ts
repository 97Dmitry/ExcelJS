import { ExcelComponent } from "@core/ExcelComponent";
import { DOM } from "@/core/DOM";

export class Formula extends ExcelComponent {
  static className = "excel__formula"

  constructor($source: DOM) {
    super($source, {
      name: "Formula",
      listeners: ["input"],
    });
  }

  toHTML(): string {
    return `
      <div class="excel__formula-subtitle">fx</div>
      <div class="excel__formula-input" contenteditable spellcheck="false"></div>
    `;
  }

  onInput(event: Event) {
    console.log("Formula: onInput", event);
  }
}
