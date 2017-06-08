// Meteor stuff
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

// my stuff
import { make4Circles } from '../imports/make4Circles';
import clearInterval from '../imports/clearInterval';

import './main.html';

Session.set('alive', true);
Session.set('progressID');

// update bestScore if a higher score comes
Tracker.autorun(() => {
  let score = Session.get('score');
  let bestScore = Session.get('bestScore');
  if ( score > bestScore ) {
    Session.set('bestScore', score);
    localStorage.setItem('bestScore', score);
  }
});

////
// TEMPLATE HELPERS
///
Template.gameArea.onCreated(function () {
  this.circleArray = new ReactiveVar(make4Circles());
});

Template.layout.onCreated(function () {
  Session.set('score', 0);
  if (!localStorage.getItem('bestScore')) {
    Session.set('bestScore', 0);
    localStorage.setItem('bestScore', 0);
  } else {
    Session.set('bestScore', localStorage.getItem('bestScore'));
  }
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

Template.header.helpers({
  score: () => {
    return Session.get('score');
  },
  bestScore: () => {
    return Session.get('bestScore');
  }
});

////
// EVENTS
////
Template.gameArea.events({
  'click .circle'(event, instance) {
    let score = Session.get('score');

    // progress bar movent function
    // function frame() {
    //   console.log('frame on events started...'); // debug
    //   if (width >= 100) {
    //     clearInterval('progressID');
    //     Session.set('alive', false);
    //   } else {
    //     width++;
    //     // console.log(elem); // debug
    //     elem.width(`${width}%`);
    //   }
    // }

    if ( $(event.target).hasClass('right-option') ) {
      let elem = $('#myBar');
      const temp = Template.instance();
      elem.removeClass('full').addClass('empty');
      console.log('clicked on the RIGHT circle!');
      Meteor.setTimeout(() => {
        temp.circleArray.set(make4Circles());
        // var elem = $("#myBar");
        // var width = 0;
        // Session.set('progressID', Meteor.setInterval(frame, 20));
        Session.set('score', score + 1);
        console.log(`score: ${score}`);
        elem.removeClass('empty').addClass('full');
      }, 10);
    }
    else if ($(event.target).hasClass('wrong-option')) {
      console.log('clicked on the WRONG circle!');
      // clearInterval('progressID');
      Session.set('alive', false);
    }
  },
});
