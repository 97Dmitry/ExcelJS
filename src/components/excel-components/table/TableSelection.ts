export class TableSelection {
  static className = "selected"
  private group: Array<any>
  public current: any

  constructor() {
    this.group = [];
    this.current = null;
  }

  clearGroup() {
    if (this.group.length) {
      this.group.forEach((e) => e.removeClass(TableSelection.className));
      this.group = [];
    }
  }

  select($el: any) {
    this.clearGroup();
    this.group.push($el);
    this.current = $el;
    $el.addClass(TableSelection.className);
    this.current.focusEl();
  }

  selectSeveral(positions: Array<string>, $source: any) {
    this.clearGroup();
    positions.map((pos) => {
      return $source.getOneBySelector(`[data-cell-position="${pos}"]`);
    }).forEach((e) => {
      this.group.push(e);
    });
    this.group.forEach((e) => {
      e.addClass(TableSelection.className);
    });
  }
}
