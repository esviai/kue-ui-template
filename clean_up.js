var kue = require('kue');
var express = require('express');
var kueUiExpress = require('kue-ui-express');
var app = express();

const REDIS_HOST = 'localhost'
const REDIS_PORT = 6379

const ki = kue.createQueue({
  redis: {
    host: REDIS_HOST,
    port: REDIS_PORT
  }
});

ki.failed(function(err, ids) {
  ids.forEach(function(id) {
    kue.Job.get(id, function(err, job) {
      if (err) {
        console.log({ err })
      }

      job.remove()
    })
  })
})

