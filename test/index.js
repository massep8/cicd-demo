"use strict";
 
const chai          = require('chai');
const assert        = chai.assert;
const chaiHttp      = require('chai-http');
const server        = require('../server');

var app;

chai.use(chaiHttp);

describe('testing GET HTTP /', function() {

  before('starting server', function(done) {
    this.timeout(10000);
    server.start()
    .then((_app) => {
      app = _app;
      done();
    });
  });

  after('removing account', function(done) {
    server.stop()
    .then((res) => {
      done();
    });
  });

  it('GET request', function(done) {
    chai.request(app)
    .get('/')
    .end(function (err, res) {
      assert.isNull(err);
      assert.equal(res.status, 200);
      assert.isObject(res.body);
      assert.deepEqual(res.body, {"healthy": true, "code": 200});
      done();
    });
  });

});
