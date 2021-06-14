import { ExcelComponent } from "@core/ExcelComponent";
import { DOM } from "@core/DOM";
import { tableNameAction } from "@/redux/actions";

export class Header extends ExcelComponent {
  static className = "excel__header";

  constructor($source: DOM, options: any) {
    super($source, {
      name: "Header",
      listeners: ["input"],
      ...options,
    });
  }

  toHTML(): string {
    return `
      <label>
            <input type="text"
             class="excel__header-input"
              value="${this.store.getState().tableNameState?.tableName || "New table"}">
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

  onInput(event: any) {
    event;
    const input = this.$source.getOneBySelector("input");
    this.store.dispatch(tableNameAction({ tableNameState: input.$el.value }));
  }
}
