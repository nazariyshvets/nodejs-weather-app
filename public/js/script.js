const weatherForm = document.querySelector('form')
const weatherLocationInput = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()

  messageOne.textContent = 'loading...'
  messageTwo.textContent = ''

  fetch(`http://localhost:8000/weather?address=${weatherLocationInput.value}`)
    .then((response) => response.json())
    .then((data) => {
      messageTwo.innerHTML = data.error || `${data.location}<br/>${data.forecast}`
    })
    .catch((error) => {
      messageTwo.textContent = error
    })
    .finally(() => {
      messageOne.textContent = ''
    })
})