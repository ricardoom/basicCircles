// get the button and wire it up:
const parent = document.querySelector('body');

const buttonOne = parent.querySelector('button');

const svgContainer = parent.querySelector('.svg-overlay');

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getRandomFloat(num) {
  return Math.random(num);
}

const x = svgContainer.clientWidth;

const y = svgContainer.clientHeight;

const r = 150;

function removeCircles(container) {
  // it would be nice to have a better understanding of the _while_ loop.
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

// set the viewbox
function setViewBox() {
  svgContainer.setAttribute('viewBox', `0 0 ${x} ${y}`);
}

// animation function
// takes an options object as an argument
function animator(options) {
  let start = performance.now();

  requestAnimationFrame(function animate(time) {
    // timeFraction from 0 to 1
    let timeFraction = (time - start) / options.duration;
    if (timeFraction > 1) timeFraction = 1;

    // current animation state:
    let opacity = options.timing(timeFraction);

    options.draw(opacity);

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }
  });
}

// make circles
function makeCircles(numberOfCircles) {
  // if there are already circles remove them:
  removeCircles(svgContainer);

  // make sure all of the elements are somewhere in the viewBox
  svgContainer.setAttribute('viewBox', `0 0 ${x} ${y}`);
  for (let i = 0; i < numberOfCircles; i++) {
    const newCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    newCircle.setAttribute('cx', getRandomInt(x));
    newCircle.setAttribute('cy', getRandomInt(y));
    newCircle.setAttribute('r', getRandomInt(r));
    newCircle.style.color = `hsla(${getRandomInt(360)},${getRandomInt(100)}%, ${getRandomInt(100)}%`;
    newCircle.style.filter = `blur(${getRandomInt(10)}px)`;
    svgContainer.appendChild(newCircle);

    // animation options:
    const animateTheCircles = {
      duration: getRandomInt(1500),
      timing(timeFraction) {
        return timeFraction;
      },
      draw(opacity) {
        newCircle.style.opacity = opacity - 0.1;
      },
    };

    // run the animation on each circle:
    //
    function runAnimate() {
      animator(animateTheCircles);
    }

    runAnimate();
  }
}

// function makeOne() {
//   removeCircles(svgContainer);
//   const newCircle = document.createElement('circle');
//   svgContainer.append(newCircle);
//   newCircle.setAttribute('cx', getRandomInt(x));
//   console.log(svgContainer);
// }

buttonOne.addEventListener('click', () => {
  makeCircles(getRandomInt(25));
});
