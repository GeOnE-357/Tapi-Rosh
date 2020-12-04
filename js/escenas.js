const escenas=document.querySelectorAll(".Escena");
let activo=0;

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