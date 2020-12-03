// app.js
const utils = require('./app/lib/utils')
module.exports = app => {
  const numCPUs = require('os').cpus().length;
  console.log(`CPU = `, numCPUs);
  app.$utils = utils
};