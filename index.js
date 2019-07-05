var kue = require('kue');
var express = require('express');
var kueUiExpress = require('kue-ui-express');
var app = express();

const REDIS_HOST = 'localhost'
const REDIS_PORT = 6379

kue.createQueue({
  redis: {
    host: REDIS_HOST,
    port: REDIS_PORT
  }
});

kueUiExpress(app, '/kue/', '/kue-api');

// Mount kue JSON api
app.use('/kue-api/', kue.app);

app.listen(3003);
