import { classToggler } from './DOMUtills'

export const btnAction = imageSelector => {
  const imageToHide = document.querySelector('.active');
  let imageToShownNext = imageSelector(imageToHide);
  classToggler(imageToHide, 'active');
  classToggler(imageToShownNext, 'active');
}

export const imageClickAction = e => {
  // Using event bubbling and handling only relvent events e.g img tags clicks
  if (e.target.tagName == 'IMG') {
    const imageToFocus = e.target;
    if (!imageToFocus.classList.contains('active')) {
      const imageToUnFocus = document.querySelector('.active');
      classToggler(imageToUnFocus, 'active');
      classToggler(imageToFocus, 'active');
    }
  }
}
