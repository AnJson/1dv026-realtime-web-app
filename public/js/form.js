/**
 * Script to disable submit-button when form is submitted.
 *
 * @author Anders Jonsson
 * @version 1.0.0
 */

/**
 * Add eventlistener to form that disables button on submit-event.
 *
 */
const main = () => {
  try {
    const form = document.querySelector('#form')
    const submitButton = document.querySelector('#submit-button')
    form.addEventListener('submit', event => {
      event.stopPropagation()
      submitButton.setAttribute('disabled', '')
    })
  } catch (error) {
    console.log(error)
  }
}

main()
