import { ExcelComponent } from "@core/ExcelComponent";
import { $, DOM } from "@core/DOM";
import { tableTemplate } from "./table.template";
import { cellPositionParser, cellSelector, nextSelector, resizer } from "./table.functions";
import { TableSelection } from "./TableSelection";

export class Table extends ExcelComponent {
  static className = "excel__table"
  static rowCount = 100
  static columnCount = 25
  private selection: TableSelection;

  constructor($source: DOM, options: any) {
    super($source, {
      name: "Table",
      listeners: ["mousedown", "click", "keydown", "input"],
      ...options,
    });
  }

  toHTML(): string {
    return tableTemplate(Table.rowCount, Table.columnCount);
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();

    this.selection.select(this.$source.getOneBySelector("[data-cell-position='A:1']"));
    this.emitter.emit("currentCellText", this.$source.getOneBySelector("[data-cell-position='A:1']").$el.outerText);
    this.subscribe("formulaInput", (text: any) => {
      this.selection.current.$el.textContent = text;
    });
    this.subscribe("formulaEnter", () => {
      this.selection.current.focusEl();
    });
  }

  onClick(event: any) {
    const $target = $(event.target);
    if ($target.data.cellPosition) {
      cellSelector(event, $target, this.selection, this.$source);
      this.emitter.emit("currentCellText", $target.$el.outerText);
    }
  }

  onKeydown(event: any) {
    const keys = ["Enter", "Tab"];
    if (keys.includes(event.key)) {
      const $target = $(event.target);
      const pos = cellPositionParser($target.data.cellPosition);
      const newPos = nextSelector(
          event,
          {
            row: pos.row,
            column: pos.column,
          },
          Table.rowCount,
          Table.columnCount);
      this.selection.select(this.$source.getOneBySelector(newPos));
      this.emitter.emit("currentCellText", this.$source.getOneBySelector(newPos).$el.outerText);
    }
  }

  onInput(event: any) {
    const $target = $(event.target);

    if ($target.data.cell === "true") {
      this.emitter.emit("currentCellText", $target.$el.outerText);
    }
  }

  onMousedown(event: any) {
    if (event.target.dataset.resize) {
      resizer(this.$source, event);
    }
  }
}


