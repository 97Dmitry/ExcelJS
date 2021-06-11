import { DOM } from "./DOM";
import { DOMListener } from "./DOMListener";
import { Emitter } from "@core/Emitter";

interface Options {
  name: string;
  listeners?: Array<string>;
  emitter: Emitter;
  store: any
}

export class ExcelComponent extends DOMListener {
  public emitter: Emitter;
  private unsubs: any[];
  public store: any;
  constructor($source: DOM, options: Options) {
    super($source, options?.listeners);
    this.componentName = options.name || "";
    this.emitter = options.emitter;
    this.store = options.store;
    this.unsubs = [];

    this.prepare();
  }

  prepare() {
    null;
  }

  toHTML(): string {
    return "";
  }

  init() {
    this.initialDOMListeners();
  }

  subscribe(eventName: string, fn: object) {
    const unsub = this.emitter.subscribe(eventName, fn);
    this.unsubs.push(unsub);
  }

  destroy() {
    this.removeDOMListeners();
    this.unsubs.forEach((unsub) => unsub());
  }
}
