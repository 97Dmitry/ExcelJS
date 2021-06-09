import { $ } from "@core/DOM";
import { Emitter } from "@core/Emitter";

export class Excel {
  private components: Array<any>;
  private $el: Element;
  private emitter: Emitter;

  constructor(selector: string, options: {components: Array<any> }) {
    this.$el = $(selector);
    this.components = options.components || [];
    this.emitter = new Emitter();
  }

  getComponents(): Element {
    const $source = $.create("div", "excel");
    // const $source = document.createElement("div");
    // $source.classList.add("excel");

    const componentOptions = {
      emitter: this.emitter,
    };

    this.components = this.components.map((Component) => {
      const $el = $.create("section", Component.className);
      // const $el = document.createElement("section");
      // $el.classList.add(Component.className);
      const component = new Component($el, componentOptions);
      $el.html(component.toHTML());
      $source.append($el);
      return component;
    });
    return $source;
  }

  render(): void {
    this.$el.append(this.getComponents());
    this.components.forEach((c) => c.init());
  }
}
