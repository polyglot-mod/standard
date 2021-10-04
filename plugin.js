import * as CSS from 'https://standard.polymod.dev/css.js';
import * as DOM from 'https://standard.polymod.dev/dom.js';

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

    const loadLibrary = (lib, name) => {
      this[name] = {};
      Object.assign(this[name], lib);

      for (const k of Object.keys(this[name])) {
        this[name][k] = this[name][k].bind(this);
      }
    };

    loadLibrary(CSS, 'CSS');
    loadLibrary(DOM, 'DOM');
  }

  load() { }
  unload() {}
}