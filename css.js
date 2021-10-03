const els = [];
const removeFuncs = [];

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

  for (const func of removeFuncs) {
    func();
  }
};

export const remap = (vars) => {
  const themeVars = vars.map((v) => {
    if (v[1][0] === '#') {
      v[1] = `rgb(${parseInt(v[1].substring(1, 3), 16)}, ${parseInt(v[1].substring(3, 5), 16)}, ${parseInt(v[1].substring(5, 7), 16)})`;
    }
    
    return v;
  });

  for (const sheet of window.document.styleSheets) {
    for (let rule of sheet.cssRules) {
      if (!rule.selectorText) continue;
      
      for (const v of themeVars) {
        rule.style.cssText = rule.style.cssText.replaceAll(v[1], v[2] || `var(${v[0]}, ${v[1]})`);
      }
    }
  }

  removeFuncs.push(() => {
    for (const sheet of window.document.styleSheets) {
      for (let rule of sheet.cssRules) {
        if (!rule.selectorText) continue;
        
        for (const v of themeVars) {
          rule.style.cssText = rule.style.cssText.replaceAll(v[2] || `var(${v[0]}, ${v[1]})`, v[1]);
        }
      }
    }
  });
};