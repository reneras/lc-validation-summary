// $ npm install -g connect
var connect = require('connect');
connect().use(connect.static("./../")).listen(8080);

// $ node server.js
// in the browser: http://localhost:8080/src/test.html