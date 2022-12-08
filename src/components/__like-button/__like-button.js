//* LIKE BUTTON *//
const likeButton = document.querySelectorAll('.js-like-button__button')
const likeButtonIcon = document.querySelectorAll('.js-like-button__icon')
const likeButtonLikes = document.querySelectorAll('.js-like-button__likes')

likeButton.forEach((element, index) => {
    element.addEventListener('click', applyLikeButtonAction.bind(null, index))
})

function applyLikeButtonAction(i) {

    if (likeButtonIcon[i].textContent == 'favorite_border') {
        likeButtonIcon[i].textContent = 'favorite'
        likeButtonLikes[i].textContent = Number(likeButtonLikes[i].textContent) + 1
        likeButtonIcon[i].classList.add('like-button__active')
    }
    else if (likeButtonIcon[i].textContent == 'favorite') {
        likeButtonIcon[i].textContent = 'favorite_border'
        likeButtonLikes[i].textContent = Number(likeButtonLikes[i].textContent) - 1
        likeButtonIcon[i].classList.remove('like-button__active')
    }
}