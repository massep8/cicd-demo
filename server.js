'use strict';

const express = require('express');
const path    = require('path');
const Q       = require('q');
var app       = express();
var server    = require('http').createServer(app);

app.set('port', process.env.PORT || process.env.$PORT0 || process.env.PORT0 || 8080);


// view engine setup
app.set('views', path.join(__dirname));
/*app.engine('jade', require('jade'));
*/app.set('view engine', 'jade');

app.get('/', function(req, res, next) {
  res.render('index.jade', {PORT : app.get('port')});
});


var start = function() {
  let q = Q.defer();

    // Server running
    server.listen(app.get('port'), (err) => {
      if (err) q.reject(err);
      console.log('server listening on port: ' + app.get('port'));
      q.resolve(server);
    });
  return q.promise;
};

let stop = () => {
  let q = Q.defer();
  server.close(() => {
    console.log('server stopped listening');
    q.resolve();
  });
  return q.promise;
};

module.exports        = app;
module.exports.start  = start;
module.exports.stop   = stop;

if (require.main === module) {
  start();
}
