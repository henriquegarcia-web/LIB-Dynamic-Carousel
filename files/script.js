(async function () {
  new SliderController().start()
})()

function SliderController() {

  const carouselContainer = document.querySelector('.dc-carousel')
  const carouselView = document.querySelector('.dc-carousel-slides')
  const carouselSliders = document.querySelectorAll('.dc-carousel-slide')

  const arrowElements = document.querySelectorAll('.default__arrow')

  const configs = {
    'loop' : true,
    'transition_time' : '1',
    'autoplay' : true,
    'autoplay_time' : '2',
    'counter' : true
  }

  let slidesCounter = 0
  let currentWidth = 0

  this.start = async () => {
    await this.renderConfigs(configs)
    await this.getSlides()
  }

  this.renderConfigs = (general) => {
    if (general.loop) {
      if (general.autoplay) {
        this.sliderControl(true, true)
      } else {
        this.sliderControl(true, false)
      }
    } else {
      this.sliderControl(false)
    }

    carouselView.style.transition = general.transition_time ? `all ${general.transition_time}s` : "all 0.5s"
  }

  this.getSlides = () => {
    Array.from(carouselSliders).forEach(() => {
      slidesCounter += 1
    })
  }

  this.sliderControl = (loop, autoplay) => {
    const widthCarousel = carouselContainer.offsetWidth
    let index = 1

    carouselView.style.left = `${currentWidth}px`

    switch (loop) {
      case true:
        arrowElements.forEach(ele => ele.addEventListener('click', () => {
          if (ele.classList.contains('left')) {
            if (index - 1 < 1) {
              index = slidesCounter
              currentWidth = (slidesCounter - 1) * -widthCarousel
              carouselView.style.left = `${currentWidth}px`
              return
            }
            index -= 1
            currentWidth += widthCarousel
            carouselView.style.left = `${currentWidth}px`
            return
          } else {
            if (index + 1 > slidesCounter) {
              index = 1
              currentWidth = 0
              carouselView.style.left = `${currentWidth}px`
              return
            }
            index += 1
            currentWidth -= widthCarousel
            carouselView.style.left = `${currentWidth}px`
            return
          }
        }))

        if (autoplay) {
          setInterval(() => { 
            if (index + 1 > slidesCounter) {
              index = 1
              currentWidth = 0
              carouselView.style.left = `${currentWidth}px`
              return
            }
            index += 1
            currentWidth -= widthCarousel
            carouselView.style.left = `${currentWidth}px`
          }, configs.autoplay_time * 1000 + configs.transition_time * 1000);
        }
        break

      case false:
        arrowElements.forEach(ele => ele.addEventListener('click', () => {
          if (ele.classList.contains('left')) {
            if (index - 1 < 1) return
            index -= 1
            currentWidth += widthCarousel
            carouselView.style.left = `${currentWidth}px`
          } else {
            if (index + 1 > slidesCounter) return
            index += 1
            currentWidth -= widthCarousel
            carouselView.style.left = `${currentWidth}px`
          }
        }))

        // ADICIONAR OU NÃO AUTOPLAY QUANDO NÃO HOVER LOOP ?

        // if (autoplay) {
        //   setInterval(() => { 
        //     if (index + 1 > slidesCounter) return
        //     index += 1
        //     currentWidth -= widthCarousel
        //     carouselView.style.left = `${currentWidth}px`
        //   }, configs.autoplay_time * 1000 + configs.transition_time * 1000);
        // }
        break
    }
  }
}