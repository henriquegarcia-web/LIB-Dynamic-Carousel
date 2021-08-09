(async function () {
  new SliderController().start()
})()

function SliderController() {

  const carouselContainer = document.querySelector('.dc-carousel')
  const carouselView = document.querySelector('.dc-carousel-slides')
  const carouselSliders = document.querySelectorAll('.dc-carousel-slide')
  const carouselCounter = document.querySelector('.dc-carousel-counters')

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
  let index = 1

  this.start = async () => {
    await this.getSlides()
    await this.renderConfigs(configs)
  }

  this.renderConfigs = (configs) => {
    if (configs.loop) {
      if (configs.autoplay) {
        this.sliderControl(true, true)
      } else {
        this.sliderControl(true, false)
      }
    } else {
      this.sliderControl(false)
    }

    if (configs.counter) {
      // const counterElement = document.createElement('div')
      // counterElement.classList.add('dc-carousel-counter')

      // for (var i = 0; i < 10; i++) {
      //   console.log(i)
      //   carouselCounter.appendChild(counterElement)
      // }
      this.counterControl()
    }

    carouselView.style.transition = configs.transition_time ? `all ${configs.transition_time}s` : "all 0.5s"
  }

  this.getSlides = () => {
    Array.from(carouselSliders).forEach(() => {
      slidesCounter += 1
    })
  }

  this.sliderControl = (loop, autoplay) => {
    const widthCarousel = carouselContainer.offsetWidth

    carouselView.style.left = `${currentWidth}px`

    switch (loop) {
      case true:
        arrowElements.forEach(ele => ele.addEventListener('click', () => {
          if (ele.classList.contains('left')) {
            if (index - 1 < 1) {
              index = slidesCounter
              currentWidth = (slidesCounter - 1) * -widthCarousel
              carouselView.style.left = `${currentWidth}px`
              this.counterControl(index)
              return
            }
            index -= 1
            currentWidth += widthCarousel
            carouselView.style.left = `${currentWidth}px`
            this.counterControl(index)
            return
          } else {
            if (index + 1 > slidesCounter) {
              index = 1
              currentWidth = 0
              carouselView.style.left = `${currentWidth}px`
              this.counterControl(index)
              return
            }
            index += 1
            currentWidth -= widthCarousel
            carouselView.style.left = `${currentWidth}px`
            this.counterControl(index)
            return
          }
        }))

        if (autoplay) {
          setInterval(() => { 
            if (index + 1 > slidesCounter) {
              index = 1
              currentWidth = 0
              carouselView.style.left = `${currentWidth}px`
              this.counterControl(index)
              return
            }
            index += 1
            currentWidth -= widthCarousel
            carouselView.style.left = `${currentWidth}px`
            this.counterControl(index)
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

  this.counterControl = (idx) => {
    const carouselCounters = document.querySelectorAll('.dc-carousel-counter')

    if (idx) {
      Array.from(carouselCounters).forEach((ele) => {
        ele.classList.remove('selected')
        if (ele.getAttribute('index') == idx) {
          ele.classList.add('selected')
        }
      })
      return
    }

    Array.from(carouselCounters).forEach((ele, i) => {
      ele.setAttribute('index', i+1)

      ele.addEventListener('click', (ele) => {
        console.log(ele.path[0].getAttribute('index'))
      })
    })
  }
}