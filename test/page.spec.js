
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
                            }).indexOf(page.title)
            }

            it('never gets itself', function(done) {
                // Page.findOne({ title: 'FirstPage' })

                    page1.then(function(page) {
                        console.log(page)
                        var result = page.findSimilar();
                        console.log('first: ', result); 
                        return result; 

                    })
                    .then(function(pageArray) {
                        console.log(pageArray)
                        var result = page1.then(function(page) {
                            console.log('what is page: ', page)
                            return maptoTitle(pageArray, page);
                        })
                        console.log('2nd: ', result); 
                        return result; 
                    })
                    .then(function(pageIndex) {
                        console.log('pageIndex: ', -1); 
                        console.log('arrived in final then')
                        pageIndex.then(function(index) {
                            expect(pageIndex).to.be.equal(-1); 
                            done();                         
                        })
                    })
            });
            xit('gets other pages with any common tags', function(done) {   
                    page1.then(function(page) {
                        return page.findSimilar();

                    })
                    .then(function(pageArray) {
                        expect(pageArray[0].title).to.be.equal('SecondPage'); 
                        done(); 
                    })
            });
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