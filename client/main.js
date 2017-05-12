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
var progress = new ReactiveVar(0);

function inc(n) {
  let width = n;
  progress.set(n);
  let id = Meteor.setInterval(frame, 20);
  function frame () {
    if (width >= 100) {
      Meteor.clearInterval(id);
    } else {
      width += 1;
      console.log(progress);
      progress.set(width);
    }
  }
}
////
// TEMPLATE HELPERS
///
Template.gameArea.onCreated(function () {
  this.circleArray = new ReactiveVar(make4Circles());
});

Template.progressBar.onCreated(function () {
  // Session.set('timeleft', 0);
});

Template.progressBar.onRendered(function () {
 inc(0);
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

Template.progressBar.helpers({
  progress: () => {


    return progress.get();
    // Tracker.autorun(() => {
    //   let width = progress.get();
    //   return move(width);
    // });
  }
});

////
// EVENTS
////
Template.gameArea.events({
  'click div'(event, instance) {
    if ( $(event.target).hasClass('right-option') ) {
      console.log('clicke on the RIGHT circle!');
      Template.instance().circleArray.set(make4Circles());
      inc(0);
    }
    else {
      console.log('clicke on the WRONG circle!');
      Session.set('alive', false);
    }
  },
});
