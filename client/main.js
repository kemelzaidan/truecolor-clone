import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';

var shuffle = require('shuffle-array'); // from npm

import './main.html';

export const colorSet = ['red','gold','blue','green','orange','turquoise','wheat','fuchsia','purple'];
export const colorNames = ['VERMELHO','AMARELO','AZUL','VERDE','LARANJA','TURQUESA','BEGE','ROSA','ROXO'];

var limit = colorSet.length;
Session.set('alive', true);

// helper functions
function getRandomPosition() {
  return Math.floor(Math.random() * (limit + 1));
}

function getRightColor() {
  let position = getRandomPosition();
  let rightColor = {
    color: colorSet[position],
    name: colorNames[position],
    right: 'right-option',
  };
  return rightColor;
}

function getWrongColor() {
  let position1 = getRandomPosition();
  let position2 = getRandomPosition();
  while (position1 === position2) {
    position2 = getRandomPosition();
  }
  let wrongColor = {
    color: colorSet[position1],
    name: colorNames[position2]
  };
  return wrongColor;
}

function make4Circles() {
  let circles = [];
  circles.push(getRightColor());

  for (let i = 0; i < 3; i++) {
    circles.push(getWrongColor());
  }
  return shuffle(circles);
}


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

export { make4Circles };
