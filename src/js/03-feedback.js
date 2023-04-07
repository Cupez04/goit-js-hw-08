/*añada al proyecto y use la biblioteca lodash.throttle.*/
let throttle = require('lodash.throttle');

const form = document.querySelector('.feedback-form');

const itemsStorage = JSON.parse(localStorage.getItem('feedback-form-state'));

/*Cuando la página se cargue, compruebe el estado del almacenamiento y si hay datos guardados*/
if (itemsStorage !== null) {
  form['email'].value = itemsStorage.email;
  form['message'].value = itemsStorage.message;
}

/* Rastrea el evento input  cada 500milisegundos en el formulario y Almacene los un objeto con los campos almacenados en el formulario*/

const setFields = throttle(() => {
  localStorage.setItem(
    'feedback-form-state',
    JSON.stringify({
      email: `${form['email'].value}`,
      message: `${form['message'].value}`,
    })
  );
}, 500);
form.addEventListener('input', setFields);

/*Rastrea el evento sumit en el formulario y Maneja los datos de envio del formulario y muestra por consola un objeto con dichos datos*/
function handleSubmit(event) {
  event.preventDefault();

  if (form['email'].value === '' || form['message'].value === '') {
    return alert('Please fill in all fields!');
  }

  console.log({
    email: `${form['email'].value}`,
    message: `${form['message'].value}`,
  });
  event.currentTarget.reset();
}
form.addEventListener('submit', handleSubmit);
