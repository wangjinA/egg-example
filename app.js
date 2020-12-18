// app.js
module.exports = app => {
  const numCPUs = require('os').cpus().length;
  console.log(`CPU = `, numCPUs);
};