module.exports = function() {
  let hello = document.createElement('div');
  let symbol = Symbol();
  hello.innerHTML = 'Long time no see!';
  console.log(symbol);
  console.log('11');
  console.log('javascript');
  return hello;
}