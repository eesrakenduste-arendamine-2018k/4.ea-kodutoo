let input

window.onload = function () {
  console.log('App loaded')

  document
    .querySelector('#saveLocal')
    .addEventListener('click', saveLocal)

  input = document.querySelector('#textInput')

  const localValue = localStorage.getItem('textInput')
  if (localValue) input.value = JSON.parse(localValue).text

  window.addEventListener('keypress', autosave)
}

let timer // GLOBAL

function autosave () {
// after typing init autosave

  const doneTypingInterval = 2500

  if (timer) { clearTimeout(timer) }
  timer = window.setTimeout(function () {
    // TODO check if really changed
    saveLocal()
    console.log('autosave')
  }, doneTypingInterval)
}

function saveLocal () {
  const o = {
    text: input.value,
    date: new Date()
  }
  localStorage.setItem('textInput', JSON.stringify(o))
}