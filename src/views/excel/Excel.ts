import { $ } from "../../core/DOM";

export class Excel {
  private components: Array<any>;
  private $el: Element;

  constructor(selector: string, options: {components: Array<any> }) {
    this.$el = document.querySelector(selector);
    this.components = options.components || [];
  }

  getComponents(): Element {
    const $source = $.create("div", "excel");
    // const $source = document.createElement("div");
    // $source.classList.add("excel");
    this.components.forEach((Component) => {
      const $el = $.create("section", Component.className);
      // const $el = document.createElement("section");
      // $el.classList.add(Component.className);
      const component = new Component($el);
      $el.innerHTML = component.toHTML();
      $source.append($el);
    });
    return $source;
  }

  render(): void {
    this.$el.append(this.getComponents());
    // console.log(this.components);
  }
}
