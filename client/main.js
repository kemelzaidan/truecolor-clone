// Meteor stuff
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
// import { Tracker } from 'meteor/tracker';

// my stuff
import { make4Circles } from '../imports/make4Circles';
import clearInterval from '../imports/clearInterval';

import './main.html';

Session.set('alive', true);
Session.set('progressID');

////
// TEMPLATE HELPERS
///
Template.gameArea.onCreated(function () {
  this.circleArray = new ReactiveVar(make4Circles());
});

Template.gameArea.helpers({
  circles: () => {
    return Template.instance().circleArray.get();
  }
});

Template.circle.helpers({
  circle: (circle) => {
    return circle;
  }
});

// Template.progressBar.helpers({
//   progress: () => {
//
//   }
// });

////
// EVENTS
////
Template.gameArea.events({
  'click .circle'(event, instance) {
    function frame() {
      console.log('frame on events started...'); // debug
      if (width >= 100) {
        clearInterval('progressID');
        Session.set('alive', false);
      } else {
        width++;
        // console.log(elem); // debug
        elem.width(`${width}%`);
      }
    }

    if ( $(event.target).hasClass('right-option') ) {
      console.log('clicke on the RIGHT circle!');
      clearInterval('progressID');
      Template.instance().circleArray.set(make4Circles());
      var elem = $("#myBar");
      var width = 0;
      Session.set('progressID', Meteor.setInterval(frame, 20));
    }
    else if ($(event.target).hasClass('wrong-option')) {
      console.log('clicke on the WRONG circle!');
      Session.set('alive', false);
      clearInterval('progressID');
    }
  },
});
