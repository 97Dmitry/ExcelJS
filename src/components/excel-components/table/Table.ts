import { ExcelComponent } from "@core/ExcelComponent";
import { $, DOM } from "@core/DOM";
import { tableTemplate } from "./table.template";
import { cellSelector, resizer } from "./table.functions";
import { TableSelection } from "./TableSelection";

export class Table extends ExcelComponent {
  static className = "excel__table"
  private selection: TableSelection;

  constructor($source: DOM) {
    super($source, {
      name: "Table",
      listeners: ["mousedown", "click"],
    });
  }

  toHTML(): string {
    return tableTemplate();
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();

    this.selection.select(this.$source.getOneBySelector("[data-cell-position='A:1']"));
  }

  onClick(event: any) {
    const $target = $(event.target);
    if ($target.data.cellPosition) {
      cellSelector(event, $target, this.selection, this.$source);
    }
  }

  onMousedown(event: any) {
    if (event.target.dataset.resize) {
      resizer(this.$source, event);
    }
  }
}


