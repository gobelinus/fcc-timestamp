var express = require('express');
var moment = require('moment');

var app = express();

app.get('/:timeStr', function (req, res) {
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

app.use(function(req, res, next){
  // convert this to send instructions
  res.status(404);

  // respond with json
  res.send({ error: 'Not found' });

});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});