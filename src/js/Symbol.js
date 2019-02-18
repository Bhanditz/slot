const cache = {};

export default class Symbol {
  constructor(name = Symbol.random()) {
    this.name = name;
    // this.img = new Image();
    //   this.img.src = require(`../assets/symbols/${name}.png`);
    if (cache[name]) {
      this.img = cache[name].cloneNode();
    } else {
      this.img = new Image();
      this.img.src = require(`../assets/symbols/${name}.png`);
      cache[name] = this.img;
    }
  }

  static preload() {
    Symbol.symbols.forEach(symbol => new Symbol(symbol));
  }

  static get symbols() {
    return ['7','3xBAR', 'BAR', '2xBAR', 'Cherry', 'rsz_dollar', 'rsz_char'];
    //['7','3xBAR', 'BAR', '2xBAR', 'Cherry','DOLLAR', 'CHAR'];
  }

  static random() {
    return this.symbols[Math.floor(Math.random()*this.symbols.length)];
  }
  static payTable(){

  }
}
