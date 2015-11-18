var supertest = require('supertest');
var app = require('../app');
var agent = supertest.agent(app);
var Page = require('../models').Page;
var User = require('../models').User;
// var mongoose = require('mongoose');

describe('http requests', function() {

    beforeEach(function(done) {
        // Page.find({}).remove().exec(done);
        var pageRemove = Page.remove({}).exec();
        var userRemove = User.remove({}).exec();

        var pageCreate = Page.create({
          title: 'Test',
          content: 'Test',
          tags: 'testTag'
        })

        Promise.all([pageRemove,userRemove,pageCreate])
        .then(function() {
          done();
        })
        .then(null,done);
    })

    describe('GET /', function() {
    xit('gets 200 on index', function(done) {
        agent
          .get('/')
          .expect(200, done)
      })
    })

    describe('GET /add', function () {
      it('gets 200', function(done) {
        agent
          .get('/wiki/add')
          .expect(200,done)
      })
    });

    describe('GET /wiki/:urlTitle', function() {
        it('gets 404 on page that doesnt exist', function(done) {
          agent
          .get('/wiki/adosf')
          .expect(404,done)
        });
        it('gets 200 on page that does exist', function(done) {
          agent
            .get('/wiki/Test')
            .expect(200,done)
        });
    });

    describe('GET /wiki/search', function() {
        it('gets 200', function(done) {
          agent
          .get('/wiki/search')
          .expect(200,done)
        });
    });

    describe('GET /wiki/:urlTitle/similar', function() {
        it('gets 404 for page that doesn\'t exist', function(done) {
          agent
          .get('/wiki/asdf/similar')
          .expect(404,done)
        });
        it('gets 200 for similar page', function(done) {
          agent
            .get('/wiki/Test/similar')
            .expect(200,done)
        });
    });


    describe('GET /wiki/add', function() {
        xit('gets 200', function() {});
    });


    describe('POST /wiki/add', function() {
        // xit(creates in db, function() {});
    });

});