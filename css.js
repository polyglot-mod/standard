const els = [];
const removeFuncs = [];

export const add = function (css) {
  const el = document.createElement('style');

  el.appendChild(document.createTextNode(css));

  document.body.appendChild(el);

  els.push(el);

  if (this && this.unloadHooks) {
    this.unloadHooks.push(() => {
      el.remove();
      this.cssCache.remove(css);
    });

    this.cssCache.add(css);
  }
};

export const remove = function () {
  for (const el of els) {
    el.remove();
  }

  for (const func of removeFuncs) {
    func();
  }
};

export const getAllRules = function () { // Gets all CSS stylesheet rules
  const rules = [];

  for (const sheet of document.styleSheets) {
    try {
      rules.push(...sheet.cssRules);
    } catch (e) {
      // Cannot access as browser / Chrome blocks via just error - CORS?
    }
  }

  return rules;
};

export const remap = function (vars) {
  let finalCss = '';

  const extraVars = [ '--background-accent', '--background-floating' ];

  const themeVars = vars.map((v) => {
    if (v[1][0] === '#') {
      v[1] = `rgb(${parseInt(v[1].substring(1, 3), 16)}, ${parseInt(v[1].substring(3, 5), 16)}, ${parseInt(v[1].substring(5, 7), 16)})`;
    }

    if (extraVars.includes(v[0])) {
      v[2] = `var(${v[0]}, var(--background-tertiary, ${v[1]}))`;
    }

    return v;
  });

  for (const rule of getAllRules()) {
    if (!rule.selectorText) continue;
      
    for (const v of themeVars) {
      rule.style.cssText = rule.style.cssText.replaceAll(v[1], v[2] || `var(${v[0]}, ${v[1]})`);
    }

    finalCss += rule.cssText;
  }

  removeFuncs.push(() => {
    for (let rule of getAllRules()) {
      if (!rule.selectorText) continue;
        
      for (const v of themeVars) {
        rule.style.cssText = rule.style.cssText.replaceAll(v[2] || `var(${v[0]}, ${v[1]})`, v[1]);
      }
    }

    if (this && this.unloadHooks) this.cssCache.remove(finalCss);
  });

  if (this && this.unloadHooks) {
    this.unloadHooks.push(removeFuncs[removeFuncs.length - 1]);
    this.cssCache.add(finalCss);
  }
};