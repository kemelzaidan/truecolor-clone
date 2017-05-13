// Meteor stuff
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

// my stuff
import { make4Circles } from '../imports/make4Circles';

import './main.html';

Session.set('alive', true);
Session.set('progressID');

////
// TEMPLATE HELPERS
///
Template.gameArea.onCreated(function () {
  this.circleArray = new ReactiveVar(make4Circles());
});

// Template.progressBar.onCreated(function () {
//
// });
//
// Template.progressBar.onRendered(function () {
//
// });

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
  'click div'(event, instance) {
    function frame() {
      if (width >= 100) {
        Meteor.clearInterval(Session.get('progressID'));
        Session.set('alive', false);
      } else {
        width++;
        console.log(elem);
        elem.width(`${width}%`);
      }
    }

    if ( $(event.target).hasClass('right-option') ) {
      console.log('clicke on the RIGHT circle!');
      Meteor.clearInterval(Session.get('progressID'));
      Template.instance().circleArray.set(make4Circles());
      var elem = $("#myBar");
      var width = 0;
      Session.set('progressID', Meteor.setInterval(frame, 20));
    }
    else {
      console.log('clicke on the WRONG circle!');
      Session.set('alive', false);
      Meteor.clearInterval(Session.get('progressID'));
    }
  },
});
