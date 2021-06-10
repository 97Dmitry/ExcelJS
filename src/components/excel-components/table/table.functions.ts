import { $, DOM } from "@core/DOM";

export function resizer($source: DOM, event: any) {
  const resizeType = event.target.dataset.resize;
  const $resizer = $(event.target);
  const $parent = $resizer.getParentByData("[data-type='resizable']");
  const parentCoord = $parent.getCoord();
  let newWidth: number;
  let newHeight: number;

  document.onmousemove = (e: any) => {
    if (resizeType === "column") {
      $resizer.css({ opacity: 1, bottom: "-5000px" });
      const delta = e.clientX - parentCoord.right;
      newWidth = parentCoord.width + delta;
      $resizer.css({ right: -delta + "px" });
    } else if (resizeType === "row") {
      $resizer.css({ opacity: 1, right: "-5000px" });
      const delta = parentCoord.bottom - e.clientY;
      newHeight = parentCoord.height - delta;
      $resizer.css({ bottom: delta + "px" });
    }
  };
  document.onmouseup = () => {
    if (resizeType === "column") {
      $parent.css({ width: `${newWidth}px` });
      $source.getAllBySelector(`[data-cell-position="${$parent.$el.outerText}"]`)
          .forEach((el: any) => {
            el.style.width = newWidth + "px";
          });
    } else {
      $parent.css({ height: `${newHeight}px` });
    }
    $resizer.css({ opacity: 0, bottom: 0, right: 0 });
    document.onmousemove = null;
    document.onmouseup = null;
  };
}
