(async function () {
  new SliderController().start()
})()

function SliderController() {

  const arrowElements = document.querySelectorAll('.default__arrow')
  let imagesCounter = 0
  let currentWidth = 0

  this.start = async () => {
    await this.getImages()
    this.onClickArrow()
  }

  this.getImages = () => {
    Array.from(document.querySelectorAll('.default__image')).forEach((ele, i) => {
      ele.setAttribute('data-position', i)
      imagesCounter += 1
    })
  }

  this.onClickArrow = () => {
    let index = 0

    arrowElements.forEach(ele => ele.addEventListener('click', () => {
      if (ele.classList.contains('left')) {
        if (index - 1 < 0) return
        index -= 1
        this._moveImage(index, 'left')
      } else {
        if (index + 1 == imagesCounter) return
        index += 1
        this._moveImage(index, 'right')
      }
    }))
  }

  this._moveImage = (imageIdx, to) => {
    const carouselContainer = document.querySelector('.default__carousel')
    const widthCarousel = carouselContainer.offsetWidth
    const imagesSlider = document.querySelector('.default__images__container')

    if (to == 'left') {
      currentWidth += widthCarousel
      imagesSlider.style.left = `${currentWidth}px`
    } else {
      currentWidth -= widthCarousel
      imagesSlider.style.left = `${currentWidth}px`
    }
  }
}