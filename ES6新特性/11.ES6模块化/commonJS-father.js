var module = require('./commonJS');
console.log(this); //{}
console.log(module.colors);

module.addColor();

console.log(module.colors);