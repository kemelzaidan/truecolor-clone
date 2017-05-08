import { chai } from 'meteor/practicalmeteor:chai';
import { colorSet, colorNames } from './main.js';

describe('main.js', function () {
  it('colorSet and colorNames should have the same size', function () {
    // This code will be executed by the test driver when the app is started
    // in the correct mode
    chai.expect(colorSet.length).to.equal(colorNames.length);
  });
});
