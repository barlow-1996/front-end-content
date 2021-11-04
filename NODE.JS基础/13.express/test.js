const express = require('express');
const app = express();

app.use((request, response, next) => {
  console.log('请求了服务器');
  next();
})

app.get('/students', (request, response) => {
  const students = [
    {id: 1, name: 'byl', age: 18},
    {id: 2, name: 'hmy', age: 19}
  ]
  response.send(students);
})

app.listen(3000, () => {
  console.log('server start');
})