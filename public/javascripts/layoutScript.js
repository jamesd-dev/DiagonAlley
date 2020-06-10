window.addEventListener('load', () => {
  adjustTopMargin();
});

function adjustTopMargin() {
  let titlePanel = document.getElementsByClassName('title-panel')[0];
  let mainPanel = document.getElementsByClassName('main-panel')[0];
  mainPanel.style.marginTop = getComputedStyle(titlePanel).height;
  console.log(getComputedStyle(titlePanel).height.substring(-2));
}

document.querySelector('body').setAttribute('onresize', 'adjustTopMargin()');