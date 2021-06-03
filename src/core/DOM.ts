class DOM {
}

export function $(): any {
  return new DOM();
}

$.create = (tagName: string, classes = "") => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }
  return el;
};
