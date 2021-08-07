(async function () {
  new SliderController().start()
})()

function SliderController() {

  const imagesSlider = document.querySelector('.default__images__container') // Retorna o elemento que contém todos os slides

  const generalConfigs = [
    {
      'loop':'active',
      'transition_time':'1',
      'counter':'active',
      'autoplay':'desactive'
    }
  ]

  const viewsConfigs = [
    {
      'view_type':'image',
      'render':'https://picsum.photos/1200/800',
      'image_scale':'full'
    },
    {
      'view_type':'image',
      'render':'https://picsum.photos/600/1000',
      'image_scale':'size'
    },
    {
      'view_type':'element',
      'render':'<div class="render__div"></div>',
      'image_scale':''
    }
  ]

  const arrowElements = document.querySelectorAll('.default__arrow')
  let imagesCounter = 0
  let currentWidth = 0

  this.start = async () => {
    await this.renderConfigs(generalConfigs, viewsConfigs)
    await this.getImages()
    this.onClickArrow()
  }

  this.renderConfigs = (general, views) => {
    console.log(general)
    console.log(views)

    console.log()

    imagesSlider.style.transition = general[0].transition_time ? `all ${general[0].transition_time}s` : "all 0.5s" // Configura o tempo de transição dos slides
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
        this._moveImage('left')
      } else {
        if (index + 1 == imagesCounter) return
        index += 1
        this._moveImage('right')
      }
    }))
  }

  this._moveImage = (to) => {
    const carouselContainer = document.querySelector('.default__carousel')
    const widthCarousel = carouselContainer.offsetWidth // Retorna a largura do container onde está sendo exibido o carrossel

    if (to == 'left') {
      currentWidth += widthCarousel
      imagesSlider.style.left = `${currentWidth}px`
    } else {
      currentWidth -= widthCarousel
      imagesSlider.style.left = `${currentWidth}px`
    }
  }
}