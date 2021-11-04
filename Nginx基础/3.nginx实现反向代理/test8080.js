const express = require('express');
const app = express();

app.use("/home", function(request, response, next) {
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("Welcome to the homepage!\n");
});
 
app.use("/about", function(request, response, next) {
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("Welcome to the about page!\n");
});
 
app.use(function(request, response) {
  response.writeHead(404, { "Content-Type": "text/plain" });
  response.end("8080 helloWorld!\n");
});


app.listen(8080, () => {
  console.log('server start');
})