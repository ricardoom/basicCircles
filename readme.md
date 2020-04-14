# A maker of circles

The goal of this project is to help me learn a few things:

- Use JavaScript to generate a random amount of shapes and in random positions within the `viewBox`
- Use JavaScript to do basic animations:
  - `requestAnimationFrame()`
  - Alternately experimenting with the `element.animate()` function available in a modern browser near you. According to MDN, this is still experimental... but its fun to play with.
  - Get the SVG elements to animate off the screen in seemingly random directions
  - Make the animation function reusable and available globally
- Add and remove `svg` elements from the DOM
  - animate them in and out
- Remove the circles
  - remove them with a bit of flare, by using translation to send them off screen
- Get comfortable with CSS Custom Properties and new margin & padding syntax that decouples directional rules from the LTR / RTL relationship of a user's language.
  - Lots of browser specific syntax: `padding-block-start` vs. `-webkit-padding-start`