const dropdownInputsGuests = document.querySelectorAll('.js-dropdown__input--guests')
const dropdownInputsRooms = document.querySelectorAll('.js-dropdown__input--rooms')
const dropdownLists = document.querySelectorAll('.dropdown__list')

const icons = document.querySelectorAll('.dropdown__icon')
const guests = []
const rooms = []

for (let i=0; i<dropdownInputsGuests.length; i++) {
    guests.push([i, [0, 0]])
}

for (let i=0; i<dropdownInputsRooms.length; i++) {
    rooms.push([i, [0, 0, 0]])
}

dropdownInputsGuests.forEach((dropdownInput, index) => {
    dropdownInput.addEventListener('click', hideRevealList.bind(null, index, dropdownInput, 'guests'))
})

dropdownInputsRooms.forEach((dropdownInput, index) => {
    dropdownInput.addEventListener('click', hideRevealList.bind(null, index, dropdownInput, 'rooms'))
})

icons.forEach((icon, index) => {
    icon.addEventListener('click', hideRevealList.bind(null, index))
})

function hideRevealList(i, dropdownInput, category) {

    // dropdownLists[i].classList.toggle('dropdown__list-shrinked')
    let listClass = `dropdown__list-shrinked--${category}`
    // dropdownLists[i].classList.toggle(listClass)
    let parentList = dropdownInput.parentElement.children[2]
    parentList.classList.toggle(listClass)

    if (dropdownInput.value == '' || parentList.classList.contains(listClass)) {
    // if (dropdownInput.value == '' || dropdownLists[i].classList.contains(listClass)) {
    // if (dropdownInputsGuests[i].value == '' || dropdownLists[i].classList.contains('dropdown__list-shrinked')) {
        hideRevealClearButton(i, true)
    }

    else if (dropdownInput.value != '') {
    // else if (dropdownInputsGuests[i].value != '') {
        hideRevealClearButton(i, false)
    }

    icons[i].classList.toggle('dropdown__icon_rotated')

}

const clearButtons = document.querySelectorAll('.dropdown__clear-button__caption_visible')

clearButtons.forEach((clearButton, index) => {
    clearButton.addEventListener('click', applyClearButton.bind(null, index))
})

const dropdownSubmitButtons = document.querySelectorAll('.dropdown__submit-button')

dropdownSubmitButtons.forEach((dropdownSubmitButton, index) => {
    dropdownSubmitButton.addEventListener('click', applyGuestsChanges.bind(null, index))
})

const guestsCategories = ['adults', 'children', 'babies']
guestsCategories.forEach(e => {
    createGuestsCategory(e)
})

const roomsCategories = ['bedrooms', 'beds', 'bathrooms']

roomsCategories.forEach(e => {
    createRoomsCategories(e)
})

function createRoomsCategories(str) {

    const buttonsMinus = document.querySelectorAll(`.js-dropdown__list-item__counter-button-minus-${str}`)
    const counters = document.querySelectorAll(`.js-dropdown__list-item__counter-${str}`)
    const buttonsPlus = document.querySelectorAll(`.js-dropdown__list-item__counter-button-plus-${str}`)

    buttonsMinus.forEach((buttonMinus, index) => {
        buttonMinus.addEventListener('click', applyButtonEvent.bind(null, index, str, '-'))
    })

    buttonsPlus.forEach((buttonsPlus, index) => {
        buttonsPlus.addEventListener('click', applyButtonEvent.bind(null, index, str, '+'))
    })

    function applyButtonEvent(i, str, operator) {

        if (counters[i].textContent == '0' && operator == '-') return
        counters[i].textContent = changeCounter(counters[i].textContent, operator)
        changeNumberOfRooms(i, str, operator)
        
    }

}

function createGuestsCategory(str) {

    let isAdult = (str == 'babies') ? false : true

    const buttonsMinus = document.querySelectorAll(`.js-dropdown__list-item__counter-button-minus-${str}`)
    const counters = document.querySelectorAll(`.js-dropdown__list-item__counter-${str}`)
    const buttonsPlus = document.querySelectorAll(`.js-dropdown__list-item__counter-button-plus-${str}`)

    buttonsMinus.forEach((buttonMinus, index) => {
        buttonMinus.addEventListener('click', applyButtonEvent.bind(null, index, '-'))
    })

    buttonsPlus.forEach((buttonsPlus, index) => {
        buttonsPlus.addEventListener('click', applyButtonEvent.bind(null, index, '+'))
    })

    function applyButtonEvent(i, operator) {

        if (counters[i].textContent == '0' && operator == '-') return
        counters[i].textContent = changeCounter(counters[i].textContent, operator)
        changeNumberOfGuests(i, operator, isAdult)
    }
}

function changeNumberOfRooms(i, category, operator) {

    if (category == 'bedrooms') {
        let quantity = eval(`${rooms[i][1][0]} ${operator} 1`)
        rooms[i][1][0] = (quantity < 0) ? 0 : quantity
    }
    else if (category == 'beds') {
        let quantity = eval(`${rooms[i][1][1]} ${operator} 1`)
        rooms[i][1][1] = (quantity < 0) ? 0 : quantity
    }
    else {
        let quantity = eval(`${rooms[i][1][2]} ${operator} 1`)
        rooms[i][1][2] = (quantity < 0) ? 0 : quantity
    }

    let nums = [2, 3, 4]

    let numBedrooms = rooms[i][1][0]
    let bedroomsWord = numBedrooms == 1 ? 'спальня' : nums.includes(numBedrooms) ? 'спальни' : 'спален'
    let numBeds = rooms[i][1][1]
    let bedsWord = numBeds == 1 ? 'кровать' : nums.includes(numBeds) ? 'кровати' : 'кроватей'
    let numBathrooms = rooms[i][1][2]
    let bathroomsWord = numBathrooms == 1 ? 'ванная комната' : nums.includes(numBathrooms) ? 'ванные комнаты' : 'ванных комнат'

    let result = []

    if (numBedrooms > 0) result.push(`${numBedrooms} ${bedroomsWord}`)
    if (numBeds > 0) result.push(`${numBeds} ${bedsWord}`)
    if (numBathrooms > 0) result.push(`${numBathrooms} ${bathroomsWord}`)

    dropdownInputsRooms[i].value = result.join(', ')

}

function changeCounter(value, operator) {
    let result = eval(`${value} ${operator} 1`)
    return result < 0 ? 0 : result
}

function changeNumberOfGuests(i, operator, isAdult = true) {

    if (isAdult) {
        let res = eval(`${guests[i][1][0]} ${operator} 1`)
        guests[i][1][0] = (res < 0) ? 0 : res
    }
    else {
        let res = eval(`${guests[i][1][1]} ${operator} 1`)
        guests[i][1][1] = (res < 0) ? 0 : res
    }

    let nums = [2, 3, 4]

    let numAdults = guests[i][1][0]
    let adultWord = numAdults == 1 ? 'гость' : nums.includes(numAdults) ? 'гостя' : 'гостей'
    let numBabies = guests[i][1][1]
    let babyWord = numBabies == 1 ? 'младенец' : nums.includes(numBabies) ? 'младенца' : 'младенцев'

    let result = []

    if (numAdults > 0) result.push(`${numAdults} ${adultWord}`)
    if (numBabies > 0) result.push(`${numBabies} ${babyWord}`)

    let hide = (result.length == 0) ? true : false
    hideRevealClearButton(i, hide)

    dropdownInputsGuests[i].value = result.join(', ')

}

// clear button //
function hideRevealClearButton(i, hide = false) {
    clearButtons[i].style.visibility = hide ? 'hidden' : 'visible'

}

function applyClearButton(i) {

    dropdownInputsGuests[i].value = ''

    for (let j=0; j<guestsCategories.length; j++) {
        let category = guestsCategories[j]
        document.querySelectorAll(`.js-dropdown__list-item__counter-${category}`)[i].textContent = '0'
    }

    guests[i][1][0] = 0
    guests[i][1][1] = 0

    hideRevealClearButton(i, true)
}

function applyGuestsChanges(i) {
    dropdownLists[i].classList.add('dropdown__list-shrinked--guests')
    hideRevealClearButton(i, true)
}