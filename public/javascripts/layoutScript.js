window.addEventListener('load', () => {
  adjustTopMargin();
});

function adjustTopMargin() {
  let titlePanel = document.getElementsByClassName('title-panel')[0];
  let mainPanel = document.getElementsByClassName('main-panel')[0];
  mainPanel.style.marginTop = getComputedStyle(titlePanel).height;
  mainPanel.style.minHeight = (window.innerHeight - parseInt(getComputedStyle(titlePanel).height.slice(0, -2)) + 'px');
}

document.querySelector('body').setAttribute('onresize', 'adjustTopMargin()');