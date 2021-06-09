export class DOM {
  private $el: any;

  constructor(selector: string | Node) {
    this.$el = typeof selector === "string"
      ? document.querySelector(selector)
      : selector;
  }

  html(html: string | Node) {
    if (typeof html === "string") {
      if ("innerHTML" in this.$el) {
        this.$el.innerHTML = html;
        return this;
      }
    }
    return "outerHTML" in this.$el ? this.$el.outerHTML.trim() : null;
  }

  // Add Event Listener
  ael(eventType: string, callback: () => void) {
    this.$el.addEventListener(eventType, callback);
  }

  // Remove Event Listener
  rel(eventType: string, callback: any) {
    this.$el.removeEventListener(eventType, callback);
  }

  getParentByData(dataSelector: string): HTMLElement {
    return $(this.$el.closest(dataSelector));
  }

  getCoord() {
    return this.$el.getBoundingClientRect();
  }

  getAllBySelector(selector: string): Array<any> {
    return this.$el.querySelectorAll(selector);
  }

  getOneBySelector(selector: string): any {
    return $(this.$el.querySelector(selector));
  }

  get data() {
    return this.$el.dataset;
  }

  addClass(className: string) {
    this.$el.classList.add(className);
  }

  removeClass(className: string) {
    this.$el.classList.remove(className);
  }

  css(styles: object) {
    for (const st in styles) {
      if (Object.prototype.hasOwnProperty.call(styles, st)) {
        this.$el.style[st] = String((styles as any)[st]);
      }
    }
  }

  focusEl() {
    this.$el.focus();
  }

  clear() {
    this.html("");
    return this;
  }

  append(el: string | Node) {
    if (el instanceof DOM) {
      el = el.$el;
    }
    this.$el.append(el);
    return this;
  }
}

export function $(selector: string | Node): any {
  return new DOM(selector);
}

$.create = (tagName: string, classes = "") => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }
  return $(el);
};
