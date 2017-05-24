var shuffle = require('shuffle-array'); // from npm

export const colorSet = ['red','gold','blue','green','orange','turquoise','wheat','fuchsia','purple'];
export const colorNames = ['VERMELHO','AMARELO','AZUL','VERDE','LARANJA','TURQUESA','BEGE','ROSA','ROXO'];

var limit = colorSet.length;

// helper functions
function getRandomPosition() {
  return Math.floor(Math.random() * (limit));
}

function getRightColor() {
  let position = getRandomPosition();
  let rightColor = {
    color: colorSet[position],
    name: colorNames[position],
    option: 'right-option',
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
    option: 'wrong-option'
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

export { make4Circles };
