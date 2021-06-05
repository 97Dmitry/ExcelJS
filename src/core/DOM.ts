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
