
const sortingHat = document.getElementById('sorting-head-image');
const mainPanel = document.getElementById('sorting-main-panel');

let scores = [];
scores.length = 8;

scores.fill({
  gryffindor: 0,
  hufflepuff: 0,
  ravenclaw: 0,
  slytherin: 0
});

function updateSlider(element,value) {
  let sliderFill = element.previousElementSibling.firstElementChild;
  sliderFill.style.width = value + '%';
}

function updateScores(element, value) {
  index = parseInt(element.getAttribute('data-question'));
  scores[index][element.getAttribute('data-plus')] = parseInt(value) - 50;
  scores[index][element.getAttribute('data-neg')] = 50 - parseInt(value);
}

function calcScores() {

  let result = {
    gryffindor: 0,
    hufflepuff: 0,
    ravenclaw: 0,
    slytherin: 0
  };

  for(let score of scores) {
    result.gryffindor += score.gryffindor;
    result.ravenclaw += score.ravenclaw;
    result.hufflepuff += score.hufflepuff;
    result.slytherin += score.slytherin;
  }

  let house = {score: -9999999, house: 'none'};
  if(house.score <= result.gryffindor) {house.house = 'gryffindor'; house.score = result.gryffindor;}
  if(house.score <= result.hufflepuff) {house.house = 'hufflepuff'; house.score = result.hufflepuff;}
  if(house.score <= result.ravenclaw) {house.house = 'ravenclaw'; house.score = result.ravenclaw;}
  if(house.score <= result.slytherin) {house.house = 'slytherin'; house.score = result.slytherin;}

  console.log(result, house);

  window.location.href = `/sorting-hat/${house.house}`;

}