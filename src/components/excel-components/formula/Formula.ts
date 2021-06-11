import { ExcelComponent } from "@core/ExcelComponent";
import { DOM } from "@/core/DOM";

export class Formula extends ExcelComponent {
  static className = "excel__formula";

  constructor($source: DOM, options: any) {
    super($source, {
      name: "Formula",
      listeners: ["input", "keydown"],
      ...options,
    });
  }

  init() {
    super.init();

    const input = this.$source.getOneBySelector("[data-formula-input]");
    this.subscribe("currentCellText", (text: string) => {
      input.$el.textContent = text;
    });
  }

  toHTML(): string {
    return `
      <div class="excel__formula-subtitle">fx</div>
      <div class="excel__formula-input" contenteditable spellcheck="false" data-formula-input></div>
    `;
  }

  onInput(event: any) {
    this.emitter.emit("formulaInput", event.target.textContent.trim());
  }

  onKeydown(event: any) {
    if (event.key === "Enter" && event.key === "Tab") {
      event.preventDefault();
      this.emitter.emit("formulaEnter");
    }
  }
}
