import { chai } from 'meteor/practicalmeteor:chai';
import { colorSet, colorNames, make4Circles } from './main.js';

describe('main.js', function () {
  it('colorSet and colorNames should have the same size', function () {
    // This code will be executed by the test driver when the app is started
    // in the correct mode
    chai.expect(colorSet.length).to.equal(colorNames.length);
  });

  it('make4Circles() should return an array', function () {
    chai.expect(make4Circles()).to.be.a('array');
  });

  it('make4Circles().length should be 4', function () {
    chai.expect(make4Circles()).to.have.lengthOf(4);
  });

});
