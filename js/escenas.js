const escenas=document.querySelectorAll(".Escena");
let activo=0;
const listado=document.querySelector(".cont-tabla");


const cambioEscena=(entrada)=>
	{
		activo=entrada;
		for (let i=0; i<escenas.length; i++)
			{
				escenas[i].classList.remove('mostrar','animate__animated', 'animate__backInRight', 'animate__backOutRight');
			}
		
		escenas[activo].classList.add('mostrar','animate__animated', 'animate__backInRight');
		if(activo==3)
			{
				setTimeout(Inicio,1000);
			}	
	}

/*Puntajes de todos*/

const renderPuntajes = (data, id) => {
	const contenido = `<div class="tabla-item" id="${id}"><h3>1°</h3><h3>${data.nombre}</h3><h3>${data.puntos}</h3></div>`;
	listado.innerHTML += contenido;

}