var i = 0;
var count = 0;

console.log('this is worker');

self.onmessage = e => {
  count = e.data;
  countNumber();
}

function countNumber() {
  if(i < count) {
    i++;
    self.postMessage(i); // 向主线程发送数据
  }
  console.log(i);
  setTimeout(countNumber, 1000);
}