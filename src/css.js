export const add = (css) => {
  const el = document.createElement('style');

  el.appendChild(document.createTextNode(css));

  document.body.appendChild(el);
};