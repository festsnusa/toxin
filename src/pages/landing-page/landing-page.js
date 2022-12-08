const imgLinks = [
  {src: '../../assets/images/room-1.jpg', alt: "Фото 1"},
  {src: '../../assets/images/room-2.jpg', alt: "Фото 2"},
  {src: '../../assets/images/room-3.jpg', alt: "Фото 3"}
]

let delay = 5000
let currentIndex = 1
let page = document.querySelector('.landing-page')

// setInterval(function() {

//   let imgSrc = imgLinks[currentIndex].src

//   page.style.backgroundImage = `url(${imgSrc})`

//   currentIndex++

//   if(currentIndex >= imgLinks.length) {
//       currentIndex = 0
//   }
// }, delay)