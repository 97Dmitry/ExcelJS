export class DOMListener {
  private $source: Element;

  constructor($source: Element) {
    if (!$source) {
      throw new Error("No $source provided for DOMListener");
    }
    this.$source = $source;
  }
}
