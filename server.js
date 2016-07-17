var express = require('express');
var moment = require('moment');

var app = express();
app.set('view engine', 'jade');
app.use('/static', express.static(__dirname + '/public'));


app.get('/:timeStr', function (req, res) {
  // moment expects fload for unix timestamp for parsing, so parse input to float
  // if valid number, use it as unix timestamp,
  // if not, try to parse it as string.
  var timeStr = parseFloat(req.params.timeStr) * 1000;
  if (isNaN(timeStr)) {
    timeStr = req.params.timeStr;
  }
  var ret_val = {
    "unix": null,
    "natural": null
  };
  var inputDate = moment(timeStr);
  if (inputDate.isValid()) {
    ret_val.unix = inputDate.format('X');
    ret_val.natural = inputDate.format('MMMM D, YYYY');
  }
  res.send(ret_val);
});

// render instructions file by default
app.use(function(req, res, next){
  // respond with json
  // res.send({ error: 'Not found' });

  var baseurl = req.protocol + '://' + req.get('host');
  res.render('index', {
    baseurl: baseurl
  });
});

// ref: http://stackoverflow.com/a/15693371
// Heroku dynamically assigns your app a port,
// so you can't set the port to a fixed number.
// Heroku adds the port to the env, so you can pull
// it from there.
var appPort = process.env.PORT || 8080;
app.listen(appPort, function () {
  console.log('App listening on port ' + appPort);
});