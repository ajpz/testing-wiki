
var chai = require('chai'); 
var expect = chai.expect; 
var spies = require('chai-spies'); 
chai.use(spies); 

describe('addition', function () {
	it('should add two numbers', function() {
		expect(2+2).to.be.equal(4); 
	})
})

describe('should test async functions like setTimeout', function() {
	it('setTimeout should take approx 1000ms', function(done) {
		var start = new Date(); 
		setTimeout(function() {
			var duration = new Date() - start; 
			expect(duration).to.be.closeTo(1000, 50); 
			done(); 
		}, 1000); 
	})
})


describe('Spy on functions', function () {

	var testArray = [1,2,3,4,5]; 
	function timesTwo(num) { console.log(num*2);}; 
	var timesTwo = chai.spy(timesTwo); 
	testArray.forEach(timesTwo);  

	it('should count the number of times forEach is called', function() {
		expect(timesTwo).to.have.been.called.exactly(5); 	
	})
})

