
function fetchImages(requester, url) {
  return requester(url).then(res => res.json()).then(data => data)
}

function truncate(text) {
  let textTrimmed = text.trim();
  if(textTrimmed.length >= 15) {
    return textTrimmed.slice(0,12).concat('...');
  }
  return textTrimmed;
}

function imageBuilder(dto) {
  return `<section class="img-wrapper">
    <img src="https://picsum.photos/${dto.filename}" alt="freaking awesome dog">
    <div class="overlay">
      <span class="author"> <h1>${truncate(dto.author)}</h1> </span>
    </div>
  </section>`
}

function innerHTMLAppender(appendTo, elements) {
  elements.forEach( element => appendTo.innerHTML += element)
}

function getFirstChildElement(elm){
  return  elm.firstElementChild
}

function setClipPath(image, size, e) {
  image.style.clipPath = `circle(${size}px at ${e.layerX}px ${e.layerY}px)`
}

function addListenersForSpotlight(imgWrapper) {
  let intervalId;
  let size = 0;
  const MAX_SIZE = 150;
  const imageTag = getFirstChildElement(imgWrapper);

  imgWrapper.addEventListener('mousemove', (e) => {
    if( size < MAX_SIZE) {
      intervalId = setInterval(() => {
        if( size < MAX_SIZE) {
          size ++;
          setClipPath(imageTag, size, e)
        }
      }, 5)
    }
    if(size === MAX_SIZE){
      clearInterval(intervalId)
    }
    setClipPath(imageTag, size, e)
  })

  imgWrapper.addEventListener('mouseleave', (e) => {
    size = 0;
    clearInterval(intervalId)
    setClipPath(imageTag, size, e)
    imageTag.style.opacity = `0`
  })

  imgWrapper.addEventListener('mouseenter', (e) => {
    size = 0;
    clearInterval(intervalId)
    setClipPath(imageTag, size, e)
    imageTag.style.opacity = `1`
  })

}

function galleryLoader(){ 
  const images = fetchImages(fetch, 'https://picsum.photos/list').then(images => {
    const imagesWithWrapper = images.slice(300,350).map(imageBuilder);
    innerHTMLAppender(document.querySelector('.gallery-wrapper'), imagesWithWrapper)
    document.querySelectorAll('.img-wrapper').forEach(addListenersForSpotlight);
  });
}

galleryLoader()