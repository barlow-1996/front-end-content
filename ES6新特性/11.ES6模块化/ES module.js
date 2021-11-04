let height = 1.88;
let weight = 160;
console.log(this); // undefined
function sum (num1, num2) {
  return num1 + num2;
}

export {
  height,
  weight,
  sum
};

export let name = 'byl';
export let age = 20;

export function changeAge() {
  age++;
}

export default {
  address: '重庆',
  universe: '重庆大学'
}