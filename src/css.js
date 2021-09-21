const els = [];

export const add = (css) => {
  const el = document.createElement('style');

  el.appendChild(document.createTextNode(css));

  document.body.appendChild(el);

  els.push(el);
};

export const remove = () => {
  for (const el of els) {
    el.remove();
  }
};
