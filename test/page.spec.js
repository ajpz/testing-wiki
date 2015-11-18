
var chai = require('chai'); 
var expect = chai.expect; 
var spies = require('chai-spies'); 
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

