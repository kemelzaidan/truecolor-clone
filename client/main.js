import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
var shuffle = require('shuffle-array');

import './main.html';

export const colorSet = ['red','yellow','blue','green','orange','turquoise','beige','fuchsia','purple'];
export const colorNames = ['VERMELHO','AMARELO','AZUL','VERDE','LARANJA','TURQUESA','BEGE','ROSA','ROXO'];
var limit = colorSet.length;

// var circle1 = new ReactiveDict();
// var circle2 = new ReactiveDict();
// var circle3 = new ReactiveDict();
// var circle4 = new ReactiveDict();

// helper functions
function getRandomPosition() {
  return Math.floor(Math.random() * (limit + 1));
}

function getRightColor() {
  let position = getRandomPosition();
  let rightColor = {
    color: colorSet[position],
    name: colorNames[position],
    attr: 'right',
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
    name: colorNames[position2],
    attr: 'wrong',
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

// Template.hello.onCreated(function helloOnCreated() {
//   // counter starts at 0
//   this.counter = new ReactiveVar(0);
// });

Template.gameArea.helpers({
  circles: () => {
    return make4Circles();
  }
});

Template.circle.helpers({
  circle: (circle) => {
    return circle;
  }
});

// Template.hello.events({
//   'click button'(event, instance) {
//     // increment the counter when button is clicked
//     instance.counter.set(instance.counter.get() + 1);
//   },
// });
