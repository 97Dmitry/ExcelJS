import { DOM } from "./DOM";
import { capitalize } from "./utils";

export class DOMListener {
  protected $source: DOM;
  private listeners: Array<string>;
  protected componentName: string;

  constructor($source: DOM, listeners:Array<string> = []) {
    if (!$source) {
      throw new Error("No $source provided for DOMListener");
    }
    this.$source = $source;
    this.listeners = listeners;
  }

  initialDOMListeners(): void {
    this.listeners.forEach((listener) => {
      const method: string = getMethodName(listener);
      if (!(this as any)[method]) {
        throw new Error(`Method ${method} does not exist on component ${this.componentName}`);
      }
      (this as any)[method] = (this as any)[method].bind(this);
      this.$source.ael(listener, (this as any)[method]);
    });
  }

  removeDOMListeners(): void {
    this.listeners.forEach((listener) => {
      const method: string = getMethodName(listener);
      this.$source.rel(listener, (this as any)[method]);
    });
  }
}

function getMethodName(eventMethod: string): string {
  return ("on" + capitalize(eventMethod));
}
