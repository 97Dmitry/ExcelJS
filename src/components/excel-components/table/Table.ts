import { ExcelComponent } from "@core/ExcelComponent";
import { $, DOM } from "@core/DOM";
import { tableTemplate } from "./table.template";
import { cellPositionParser, cellSelector, nextSelector, resizer } from "./table.functions";
import { TableSelection } from "./TableSelection";
import { cellTextAction, tableResizeAction } from "@/redux/actions";

export class Table extends ExcelComponent {
  static className = "excel__table";
  static rowCount = 100;
  static columnCount = 25;
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
      this.store.dispatch(cellTextAction({
        cellName: this.selection.current.data.cellPosition,
        cellText: this.selection.current.$el.textContent,
      }));
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
      const cellName = $target.data.cellPosition;
      const cellText = $target.$el.outerText.trim();
      this.emitter.emit("currentCellText", cellText);
      this.store.dispatch(cellTextAction({ cellName, cellText }));
    }
  }

  async tableResize(event: any) {
    try {
      const data = await resizer(this.$source, event);
      this.store.dispatch(tableResizeAction(data));
    } catch (e) {
      console.log(e);
    }
  }

  onMousedown(event: any) {
    if (event.target.dataset.resize) {
      this.tableResize(event);
    }
  }
}


