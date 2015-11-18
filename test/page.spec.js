
var chai = require('chai'); 
var expect = chai.expect; 
var spies = require('chai-spies'); 
var filter = require('../filters');
var Page = require('../models').Page;
var User = require('../models').User;
chai.use(spies); 

// describe('wiki.js', function () {
//     describe('has a GET /wiki/ route', function () {
//         xit('that responds with an index html page', function () {});
//         xit('the page has the same numbe of entries as the database', function () {});        
//         xit('that handles database read errors' , function () {});
//     });
//     describe('A different subcategory', function () {});
// });

// describe('Wiki.js', function () {
//     describe('has a GET /wiki/ route', function () {
//         xit('that responds with an index html page', function () {});
//         xit('that handles database read errors' , function () {});
//     });
//     describe('A different subcategory', function () {});
// });

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
            page = new Page({
                title: "Test Page",
                content: "test",
                tags: ['one','two','three']
            });
            page.save(done);
        });

        afterEach(function(done) {
            // Page.find({}).remove().exec(done);
            Page.remove({}).exec(done);
        })


        describe('findByTag', function() {
            it('gets pages with the search tag', function(done) {
                Page.findByTag('one').then(function(pages) {
                    expect(pages[0].title).to.be.equal(page.title);
                    done();
                }).then(null,done);
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
            var page1, page2, page3; 
            beforeEach(function(done) {
                page1 = Page.create({
                    title: 'FirstPage',
                    content: '1content',
                    tags: ['one']
                })
                page2 = Page.create({
                    title: 'SecondPage',
                    content: '1content',
                    tags: ['one']
                })
                page3 = Page.create({
                    title: 'ThirdPage',
                    content: '1content',
                    tags: ['two']
                })
                Promise.all([page1, page2, page3]).then(function() {
                    done(); 
                }); 
            })

            afterEach(function(done) {
                Page.remove({}).exec(done);
            })

            var mapToTitle = function(pageArray, page) {
                return pageArray.map(function(obj) {
                    return obj.title;
                }).indexOf(page.title);
            }

            it('never gets itself', function(done) {
                page1.then(function(page) {
                    return page.findSimilar();
                })
                .then(function(pageArray) {
                    return page1.then(function(page) {
                        return mapToTitle(pageArray,page);
                    });
                })
                .then(function(pageIndex) {
                    expect(pageIndex).to.be.equal(-1);
                    done();
                })
                .then(null, done);
            });
            it('gets other pages with any common tags', function(done) {   
                page1.then(function(page) {
                    return page.findSimilar();
                })
                .then(function(pageArray) {
                    return page2.then(function(page) {
                        return mapToTitle(pageArray,page);
                    });
                })
                .then(function(pageIndex) {
                    expect(pageIndex).to.not.be.equal(-1);
                    done();
                })
                .then(null, done);
            });
            it('does not get other pages without any common tags', function(done) {
                page1.then(function(page) {
                    return page.findSimilar();
                })
                .then(function(pageArray) {
                    return page3.then(function(page) {
                        return mapToTitle(pageArray,page);
                    });
                })
                .then(function(pageIndex) {
                    expect(pageIndex).to.be.equal(-1);
                    done();
                })
                .then(null, done);
            });
        });
    });

    describe('Virtuals', function() {
        describe('route', function() {
            var page;
            beforeEach(function() {
                page = new Page({
                    title: "Test Page",
                    urlTitle: "Test_Page",
                    content: "test",
                    tags: ['one','two','three']
                });
            });

            afterEach(function(done) {
                Page.remove({}).exec(done);
            });

            it('returns the url_name prepended by "/wiki/"', function() {
                expect(page.route).to.be.equal('/wiki/Test_Page');
            });
        });
    });

    describe('Hooks', function() {
        var page; 
        beforeEach(function() {
            page = new Page({
                title: 'FirstPage',
                content: '1content',
                tags: ['one']
            });
        });

        afterEach(function(done) {
            Page.remove({}).exec(done);
        });


        xit('it sets urlTitle based on title before validating', function(done) {
            console.log(Page.schema.callQueue[0][1]);
            var spy = chai.spy.on(Page.schema, 'callQueue[0]');
            // console.log(spy);
            page.save()
            .then(function() {
                expect(spy).to.have.been.called();
                done();
            })
            .then(null, done);
        });
    });

});