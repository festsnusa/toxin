const emailElements = document.querySelectorAll('input[type=email]')
const forwardButtons = document.querySelectorAll('.subscription-field__input-button')

forwardButtons.forEach((e, i) => {
  e.addEventListener('click', () => {

    let email = emailElements[i]

    const validateEmail = (email) => {
      return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    }

    if (!validateEmail(email.value)) {
      alert('Enter valid Email!')
      return
    }
  })
})