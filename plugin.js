import * as CSS from 'http://localhost:1337/standard/css.js?v=3';

export default class Plugin {
  constructor() {
    const extendsUnload = this.unload;

    this.unload = () => {
      extendsUnload();

      for (const hook of this.unloadHooks) {
        hook();
      }
    };

    this.unloadHooks = [];

    this.CSS = {};
    Object.assign(this.CSS, CSS);

    for (const k of Object.keys(this.CSS)) {
      this.CSS[k] = this.CSS[k].bind(this);
    }
  }

  load() { }
  unload() {}
}