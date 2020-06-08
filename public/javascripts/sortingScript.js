
const sortingHat = document.getElementById('sorting-head-image');
const mainPanel = document.getElementById('sorting-main-panel');

function makeQuestionPanel(question, withSlider) {

  let questionPanel = document.getElementById('question-div');

  // remove all existing children from question panel
  while (questionPanel.lastElementChild) {
    questionPanel.removeChild(questionPanel.lastElementChild);
  };

  let questionElement = document.createElement('p');
  questionElement.innerHTML = question;
  questionElement.classList.add('question-content');
  questionPanel.appendChild(questionElement);

  if(withSlider) {

    let slider = document.createElement('div');
    slider.classList.add('slider-panel');
    
    slider.innerHTML = '<p class="slider-label">I would never!</p><div class="middle"><div class="slider-container"><span class="bar"><span class="fill"></span></span><input type="range" id="slider" class="slider" min="0" max="100" value="50" oninput="updateSlider(this.value)"></div></div><p class="slider-label">That\'s me!</p>'

    questionPanel.appendChild(slider);

  } else {
    questionElement.classList.add('clickable');
  }

}

function updateSlider(value) {
  let sliderFill = document.querySelector('#question-div .slider-container .bar .fill');
  sliderFill.style.width = value + '%';
}

makeQuestionPanel('Question', true);