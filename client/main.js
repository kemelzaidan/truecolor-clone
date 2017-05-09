// Meteor stuff
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';

// my stuff
import { make4Circles } from 'imports/make4Circles';

import './main.html';

Session.set('alive', true);

////
// TEMPLATE HELPERS
///
Template.gameArea.onCreated(function () {
  this.circleArray = new ReactiveVar(make4Circles());
});

Template.progressBar.onCreated(function () {
  Session.set('timeleft', 0);
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
    let time = Session.get('timeleft');
    let timeLimit = 2000;
    let interval = 100;
    if (time < timeLimit) {
      Meteor.setInterval(function(){
        time += interval;
        Session.set('timeleft', time);
      }, interval);
    }
    return (time*100)/timeLimit;
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
      Session.set('timeleft', 0);
    }
    else {
      console.log('clicke on the WRONG circle!');
      Session.set('alive', false);
    }
  },
});
