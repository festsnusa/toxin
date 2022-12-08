const checkboxHeaders = document.querySelectorAll('.checkbox__header_expandable')
const checkboxLists = document.querySelectorAll('.checkbox__list_expandable')
const checkboxIcons = document.querySelectorAll('.checkbox__icon')

checkboxHeaders.forEach((e, i) => {
  e.addEventListener('click', () => {
    checkboxLists[i].classList.toggle('checkbox__list_expandable-expanded')
    checkboxIcons[i].classList.toggle('checkbox__button_transform')
  })
})