export const mapClasses = function (classRemap) {
  for (const [ toMap, remap ] of Object.entries(classRemap)) {
    document.querySelectorAll(`${toMap}`).forEach((x) => x.className += ' ' + remap);
  }

  if (this && this.unloadHooks) this.unloadHooks.push(() => {
    for (const [ toMap, remap ] of Object.entries(classRemap)) {
      document.querySelectorAll(`${toMap}`).forEach((x) => x.className = x.className.replaceAll(` ${remap}`, ''));
    }
  });
};