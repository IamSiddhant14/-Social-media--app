//This is required for parallel mailer
const kue = require('kue'); 
const queue = kue.createQueue();

module.exports = queue;