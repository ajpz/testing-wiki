
var chai = require('chai'); 
var expect = chai.expect; 
var spies = require('chai-spies'); 
var filter = require('../filters');
var Page = require('../models').Page;
var User = require('../models').User;
chai.use(spies); 

describe('wiki.js', function () {
    describe('has a GET /wiki/ route', function () {
        xit('that responds with an index html page', function () {});
        xit('the page has the same numbe of entries as the database', function () {});        
        xit('that handles database read errors' , function () {});
    });
    describe('A different subcategory', function () {});
});

describe('Wiki.js', function () {
    describe('has a GET /wiki/ route', function () {
        xit('that responds with an index html page', function () {});
        xit('that handles database read errors' , function () {});
    });
    describe('A different subcategory', function () {});
});

describe('Page model', function() {

    describe('Validations', function() {
        var page;
        beforeEach(function(done) {
            page = new Page();
            done();
        });
        it('errors without title', function() {
            page.content = "stuff";
            page.validate().then(null, function(err) {
                expect(err.errors).to.have.property("title");
            });
        });
        it('errors without content', function(done) {
            page.title = "stuff";
            page.validate(function(err) {
                expect(err.errors).to.have.property("content");
                done();
            })
        });
    });

    describe('Statics', function() {
        var page;
        beforeEach(function(done) {
            Page.find({}).remove().exec();
            page = new Page({
                title: "Test Page",
                content: "test",
                tags: ['one','two','three']
            });
            page.save(done);
        });
        describe('findByTag', function() {
            it('gets pages with the search tag', function(done) {
                Page.findByTag('one').then(function(pages) {
                    expect(pages[0].title).to.be.equal(page.title);
                    done();
                }).then(null,function(err) {
                    console.log(err);
                });
                // expect(Page.findByTag('one')).to.be.equal([page]);
            });
            it('does not get pages without the search tag', function(done) {
                Page.findByTag('oiwe').then(function(pages) {
                    expect(pages.length).to.be.equal(0);
                    done();
                });
            });
        });
    });

    describe('Methods', function() {
        describe('findSimilar', function() {
            xit('never gets itself', function() {});
            xit('gets other pages with any common tags', function() {});
            xit('does not get other pages without any common tags', function() {});
        });
    });

    describe('Virtuals', function() {
        describe('route', function() {
            xit('returns the url_name prepended by "/wiki/"', function() {});
        });
    });

    describe('Hooks', function() {
        xit('it sets urlTitle based on title before validating', function() {});
    });

});