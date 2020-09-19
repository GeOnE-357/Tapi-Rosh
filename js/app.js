const instalar=document.querySelector(".instalar");
let deferredPrompt;

if('serviceWorker' in navigator)
	{
		console.log("Acepta service worker");
		navigator.serviceWorker.register('sw.js')
		.then((reg) => console.log("Service Worker Registrado",reg)) /*Si el registro sucede, entoces realiza esto.*/
		.catch((err) => console.log("Service Worker No Registrado",err)); /*Sino, atrapa el error e informa.*/
	}

window.addEventListener('beforeinstallprompt', (e) => {
  // Previene que la opcion de instalar se muestre.
  e.preventDefault();
  // Guarda el evento para poder ser disparado cuando quiera.
  deferredPrompt = e;
  instalar.classList.remove("oculto");
});

const InstalarPwa = () => {
    instalar.classList.add("oculto");
    // Muestra la opcion de instalar.
    deferredPrompt.prompt();
    // Espera a la opcion del usuario.
    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('El usuario acepto el A2HS prompt');
        } else {
          console.log('El usuario no acepto el A2HS prompt');
        }
        deferredPrompt = null;
      });
  }