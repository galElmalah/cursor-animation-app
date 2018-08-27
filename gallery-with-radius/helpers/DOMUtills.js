export const nextSiblingCircular = currentImage => {
  if (currentImage.nextElementSibling === null) {
    return document.getElementById('image-container').firstElementChild;
  }
  return currentImage.nextElementSibling;
};

export const prevSiblingCircular = currentImage => {
  if (currentImage.previousElementSibling === null) {
    return document.getElementById('image-container').lastElementChild;
  }
  return currentImage.previousElementSibling;
};

export const classToggler = (element, className) => {
  element.classList.toggle(className);
};

