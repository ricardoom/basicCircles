//
// get the button and wire it up:
//
const parent = document.querySelector('body');

const buttonOne = parent.querySelector('button');

const svgContainer = parent.querySelector('.svg-overlay');

//
// utilities for generating random integers and floating point numbers
//

function getRandomInt(num) {
  return Math.floor(Math.random() * Math.floor(num));
}

function getRandomFloat(num) {
  return Math.random(num);
}

function getRandomPosNeg(num) {
  if (typeof num !== 'number') {
    return;
  }
  return num % 2 ? num * -1 : num;
}

//
// creates some basic values for the shapes
//

const x = svgContainer.clientWidth; // use the client window width

const y = svgContainer.clientHeight; // use the client window height

const r = 150; // a baseline radius

//
// function to remove circles from a passed DOM node, the container / parent of the shapes we're creating
//

function removeElementWithPizzaz(container) {
  // console.log(container.children);
  const elementChildren = Array.from(container.children);
  elementChildren.forEach((element) => {
    const transformer = {
      transform: [`translate(0px)`, `translate(${getRandomPosNeg(getRandomInt(x))}px, ${getRandomPosNeg(getRandomInt(y))}px)`],
      opacity: [0.9, 0],
    };

    let timing = {
      duration: getRandomInt(5000),
      iterations: 1,
    };

    element.animate(transformer, timing);

    // Still need to really understand the Promises bit:
    Promise.all(
      element.getAnimations().map((animation) => {
        // console.log(animation.finished);
        return animation.finished;
      })
    ).then(() => {
      return element.remove();
    });
  });
  // console.log(eachChild);
}

function removeCircles(container) {
  // it would be nice to have a better understanding of the _while_ loop.
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while
  // while container.firsChild is true:
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

//
// since this is built w/ SVGs; set the viewBox
//

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
    // prop is the property we're animating
    let props = options.timing(timeFraction);
    options.draw(props);
    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }
  });
}

//
// make circles
//
function makeCircles(numberOfCircles) {
  // if there are already circles remove them:
  //removeCircles(svgContainer);
  removeElementWithPizzaz(svgContainer);
  // make sure all of the elements are somewhere in the viewBox
  svgContainer.setAttribute('viewBox', `0 0 ${x} ${y}`);
  for (let i = 0; i < numberOfCircles; i++) {
    const newCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    newCircle.setAttribute('cx', getRandomInt(x));
    newCircle.setAttribute('cy', getRandomInt(y));
    newCircle.setAttribute('r', getRandomInt(r));
    newCircle.style.color = `hsla(${getRandomInt(360)},${getRandomInt(100)}%, ${getRandomInt(100)}%`;
    newCircle.style.filter = `blur(${getRandomInt(3)}px)`;
    svgContainer.appendChild(newCircle);

    // this object
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
    // run the circle animation on each circle:
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
