(async function () {
  new SliderController({
    loop: true,
    transition_time: 0.5,
    autoplay: true,
    autoplay_time: 1,
    counter: true
  }).start()
})()

// const configs = {
//   'loop' : true/false,
//   'transition_time' : 1, tempo deve ser em segundos
//   'autoplay' : true/false,
//   'autoplay_time' : 2, tempo deve ser em segundos
//   'counter' : true/false
// }

function SliderController(configs) {

  const carouselContainer = document.querySelector('.dc-carousel')
  const carouselView = document.querySelector('.dc-carousel-slides')
  const carouselSliders = document.querySelectorAll('.dc-carousel-slide')

  const arrowElements = document.querySelectorAll('.default__arrow')

  let slidesCounter = 0
  let currentWidth = 0
  let index = 1

  this.start = () => {
    this.getSlides()
    this.renderConfigs(configs)
  }

  this.renderConfigs = (configs) => {
    document.documentElement.style.setProperty('--counter-transition-time', `${configs.transition_time}s`)

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
      const counterContainer = document.createElement('div')
      counterContainer.classList.add('dc-carousel-counters')

      for (let i = 0; i < parseInt(slidesCounter); i++) {
        const counter = document.createElement('div')
        counter.classList.add('dc-carousel-counter')
        if (i == 0) counter.classList.add('selected')
        counterContainer.appendChild(counter)
      }

      carouselContainer.appendChild(counterContainer)
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
    carouselView.style.left = `${currentWidth}px`

    switch (loop) {
      case true:
        arrowElements.forEach(ele => ele.addEventListener('click', () => {
          const widthCarousel = carouselContainer.offsetWidth

          if (ele.classList.contains('left')) {
            if (index - 1 < 1) {
              index = slidesCounter
              currentWidth = (index - 1) * - widthCarousel
              carouselView.style.left = `${currentWidth}px`
              this.counterControl(index)
              return
            }

            index -= 1
            currentWidth = (index - 1) * - widthCarousel
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
            currentWidth = (index - 1) * - widthCarousel
            carouselView.style.left = `${currentWidth}px`
            this.counterControl(index)
            return
          }
        }))

        if (autoplay) {
          setInterval(() => { 
            const widthCarousel = carouselContainer.offsetWidth

            carouselView.style.left = `${currentWidth}px`

            if (index + 1 > slidesCounter) {
              index = 1
              currentWidth = 0
              carouselView.style.left = `${currentWidth}px`
              this.counterControl(index)
              return
            }
            index += 1
            currentWidth = (index - 1) * - widthCarousel
            carouselView.style.left = `${currentWidth}px`
            this.counterControl(index)
          }, configs.autoplay_time * 1000 + configs.transition_time * 1000);
        }
        break

      case false:
        arrowElements.forEach(ele => ele.addEventListener('click', () => {
          const widthCarousel = carouselContainer.offsetWidth

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
        const indexPosition = ele.path[0].getAttribute('index')
        const widthCarousel = carouselContainer.offsetWidth
        const newWidth = (indexPosition - 1) * - widthCarousel
        index = parseInt(indexPosition)
        currentWidth = newWidth

        carouselView.style.left = `${newWidth}px`
        this.counterControl(indexPosition)
      })
    })
  }
}