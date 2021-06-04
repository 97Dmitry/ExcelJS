import { DOM } from "./DOM";
import { DOMListener } from "./DOMListener";

interface Options {
  name: string;
  listeners?: Array<string> ;
}

export class ExcelComponent extends DOMListener {
  constructor($source: DOM, options: Options) {
    super($source, options?.listeners);
    this.componentName = options.name || "";
  }

  toHTML(): string {
    return "";
  }

  init() {
    this.initialDOMListeners();
  }

  destroy() {
    this.removeDOMListeners();
  }
}
