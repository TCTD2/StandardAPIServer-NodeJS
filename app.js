var express = require('express');
var app = express();
var port = 3000;
const Helmet = require('helmet');
const Morgan = require('morgan');
const Winston = require('./config/winston');
app.use(Morgan('combined', {stream: Winston.stream}));

// Helmet Init
app.use(Helmet());
console.log('Secure Module Helmet is Online');

// GET handler
app.get('/', function(req, res)
{
  Winston.info('Client Request 404 Not Found'); 
  console.log('Client Request 404 Not Found');
  res.send('404 Not Found');
  Winston.info('Server Receive 404 Not Found');
  console.log('Server Receive 404 Not Found');
});

app.get('/Live', function(req, res)
{
  Winston.info('Client Request YES');
  console.log('Client Request YES');
  res.send('YES');
  Winston.info('Server Receive YES');
  console.log('Server Receive YES');
});

app.get('/List/Sample', function(req, res)
{
  Winston.info('Client Request /List/Sample');
  console.log('Client Request /List/Sample');
  var list = require('./api/Sample.json');
  res.send(list);
  Winston.info('Server Receive /List/Sample');
  console.log('Server Receive /List/Sample');
})

// Launch Server
app.listen(port, () => Winston.info('Server Started'));