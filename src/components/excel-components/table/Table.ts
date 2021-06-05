import { ExcelComponent } from "@core/ExcelComponent";
import { DOM } from "@core/DOM";
import { tableTemplate } from "@/components/excel-components/table/table.template";

export class Table extends ExcelComponent {
  static className = "excel__table"

  constructor($source: DOM) {
    super($source, {
      name: "Table",
    });
  }

  toHTML(): string {
    return tableTemplate();
  }
}
