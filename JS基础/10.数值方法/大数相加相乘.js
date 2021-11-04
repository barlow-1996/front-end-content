let a = "9007199254740991";
let b = "1234567899999999999";
console.log(parseInt(b)); // 1234567900000000000 会损失精度

// JS 在存放整数的时候是有一个安全范围的，一旦数字超过这个范围便会损失精度。
function add(a ,b){
   //取两个数字的最大长度
   let maxLength = Math.max(a.length, b.length);
   //用 0 去补齐长度
   a = a.padStart(maxLength, 0);// "0009007199254740991"
   b = b.padStart(maxLength, 0);// "1234567899999999999"
   //定义加法过程中需要用到的变量
   let t = 0;
   let f = 0;   // "进位"
   let sum = "";
   for(let i = maxLength - 1; i >= 0; i--){
      t = parseInt(a[i]) + parseInt(b[i]) + f;
      f = Math.floor(t / 10);
      sum = t % 10 + sum;
   }
   if(f == 1){
      sum = "1" + sum;
   }
   return sum;
}

function mul(a, b) {
    const len1 = a.length;
    const len2 = b.length;
    const res = new Array(len1 + len2).fill(0);
    for(let i = len1 - 1; i >= 0; i--) {
        const n1 = +a[i];
        for(let j = len2 - 1; j >= 0; j--) {
            const n2 = +b[j];
            const mul = n1 * n2;
            const sum = res[i + j + 1] + mul;

            res[i + j + 1] = sum % 10;
            res[i + j] += Math.floor(sum / 10);
        }
    }
    while(res[0] == 0) {
        res.shift();
    }
    return res.join('');
}