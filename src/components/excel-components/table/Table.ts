import { ExcelComponent } from "@core/ExcelComponent";
import { DOM } from "@core/DOM";
import { tableTemplate } from "@/components/excel-components/table/table.template";
import { resizer } from "@/components/excel-components/table/table.functions";

export class Table extends ExcelComponent {
  static className = "excel__table"

  constructor($source: DOM) {
    super($source, {
      name: "Table",
      listeners: ["mousedown"],
    });
  }

  toHTML(): string {
    return tableTemplate();
  }

  onMousedown(event: any) {
    if (event.target.dataset.resize) {
      resizer(this.$source, event);
    }
  }
}


