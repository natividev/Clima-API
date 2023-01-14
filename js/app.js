const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
  formulario.addEventListener('submit', buscarClima);

});

function buscarClima(e) {
  e.preventDefault();
  // * Validar
  const ciudad = document.querySelector('#ciudad').value;
  const pais = document.querySelector('#pais').value;

  if (ciudad === '' || pais === '') {
    mostrarError('Ambos campos son obligatorios', 'error');
    return;
  }

  // * Consultar la API
  consultarAPI(ciudad, pais);
  //mostrarError('Peticion enviada', 'success');
}


function consultarAPI(ciudad, pais) {
  const appId = '497de5d7466bd65ffc322130de8238ee';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

  Spinner(); // * Muestra un Spinner de carga

  fetch(url)
    .then(respuesta => {

      return respuesta.json();
    })
    .then(datos => {
      console.log(datos);
      limpiarHTML(); // * Limpiar HTML previo
      if (datos.cod === '404') {
        mostrarError('Ciudad no encontrada', 'error')
        return;
      }
      // * Imprimir la respuesta en el HTML
      console.log(datos);
      mostrarClima(datos);
    })
    .catch(err => {
      console.log(err);
    })


}

function mostrarClima(datos) {
  const { name, main: { temp, temp_max, temp_min } } = datos;

  // * Convertir de Kevin a centrigrados -273.15
  const centigrados = kelvinACentigrados(temp);
  const max = kelvinACentigrados(temp_max);
  const min = kelvinACentigrados(temp_min);

  const nombreCiudad = document.createElement('P');
  nombreCiudad.textContent = `Clima en ${name}`;
  nombreCiudad.classList.add('font-bold', 'text-2xl')


  const actual = document.createElement('P');
  actual.innerHTML = `${centigrados} &#8451;`;
  actual.classList.add('font-bold', 'text-6xl');


  const tempMax = document.createElement('P');
  tempMax.innerHTML = `Max: ${max} &#8451;`;
  tempMax.classList.add('text-xl');

  const tempMin = document.createElement('P');
  tempMin.innerHTML = `Min: ${min} &#8451;`;
  tempMin.classList.add('text-xl');




  const resultadoDiv = document.createElement('DIV');
  resultadoDiv.classList.add('text-center', 'text-white');

  resultadoDiv.appendChild(nombreCiudad);
  resultadoDiv.appendChild(actual);
  resultadoDiv.appendChild(tempMax);
  resultadoDiv.appendChild(tempMin);

  resultado.appendChild(resultadoDiv);
}

const kelvinACentigrados = (grados) => parseInt(grados - 273.15);

function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);

  }

}

function mostrarError(mensaje, tipo) {

  if (tipo === 'error') {
    Swal.fire({
      icon: tipo,
      text: mensaje,
    })
    return;
  } else {
    Swal.fire({
      icon: tipo,
      text: mensaje,
    })
  }

}

function Spinner() {
  limpiarHTML();
  const divSpinner = document.createElement('DIV');

  divSpinner.classList.add('sk-fading-circle');

  divSpinner.innerHTML = `

  <div class="sk-circle1 sk-circle"></div>
  <div class="sk-circle2 sk-circle"></div>
  <div class="sk-circle3 sk-circle"></div>
  <div class="sk-circle4 sk-circle"></div>
  <div class="sk-circle5 sk-circle"></div>
  <div class="sk-circle6 sk-circle"></div>
  <div class="sk-circle7 sk-circle"></div>
  <div class="sk-circle8 sk-circle"></div>
  <div class="sk-circle9 sk-circle"></div>
  <div class="sk-circle10 sk-circle"></div>
  <div class="sk-circle11 sk-circle"></div>
  <div class="sk-circle12 sk-circle"></div>
  `;

  resultado.appendChild(divSpinner);


}