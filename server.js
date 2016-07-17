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

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});