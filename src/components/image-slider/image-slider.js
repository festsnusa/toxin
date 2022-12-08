let slideIndex = []
let maxSlides = []

let slideshowContainer = document.querySelectorAll(".slideshow-container")

slideshowContainer.forEach((container, i) => {

  let containerSlides = container.getElementsByClassName('mySlides')
  maxSlides.push(containerSlides.length)
  slideIndex.push(1)
  let containerDots = container.getElementsByClassName('slideshow-container__dot')

  Array.from(containerDots).forEach((e, i) => {
    e.addEventListener('click', currentSlide.bind(null, i))
  })

  let previousButton = container.getElementsByClassName('slideshow-container__prev')[0]
  let nextButton = container.getElementsByClassName('slideshow-container__next')[0]

  previousButton.addEventListener('click', plusSlides.bind(null, -1, i))
  nextButton.addEventListener('click', plusSlides.bind(null, 1, i))

  showSlides(slideIndex[i], i)

  function showSlides(n, i) {
  
    if (n > containerSlides.length) { 
      slideIndex[i] = 1 
      // return
    }
    if (n < 1) { slideIndex[i] = containerSlides.length }

    for (let j = 0; j < containerSlides.length; j++) {
      containerSlides[j].style.display = "none"
    }
    for (let j = 0; j < containerDots.length; j++) {
      containerDots[j].className = containerDots[j].className.replace(" slideshow-container__dot_active", "")
    }
    containerSlides[slideIndex[i] - 1].style.display = "block"
    containerDots[slideIndex[i] - 1].className += " slideshow-container__dot_active"
  }

  function plusSlides(n, i) {
    if (slideIndex[i] == maxSlides[i] && n == 1) return
    else if (slideIndex[i] == 1 && n == -1) return
    showSlides(slideIndex[i] += n, i)
  }
  
  function currentSlide(n) {
    showSlides(slideIndex[i] = n, n)
  }

})