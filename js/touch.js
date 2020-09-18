/*Pequeño js para convertir todos los clicks que realiza el usuario en hover
, para que vea las animaciones de la pagina/juego.*/ 
const hover= document.querySelectorAll(".Hov");

//Funcion que atrapa todos los eventos en el documento html
const EventHandler =(e)=>
	{
		var evento = e || window.event;
		var objetivo = evento.target || evento.srcElement;
		evento.preventDefault()

		if(objetivo.classList.contains("Hov"))
			{
				EstadoHover(objetivo);		
			}
	
		if(objetivo.parentElement.classList.contains("Hov"))
			{
				EstadoHover(objetivo.parentElement);
			}
		if(objetivo.parentElement.parentElement.classList.contains("Hov"))
			{
				EstadoHover(objetivo.parentElement);
			}			
		}


const EstadoHover=(objetivo)=>
	{
		objetivo.classList.add("presionado");
		setTimeout(SacarHover,300,objetivo);
	}


const SacarHover=(objetivo)=>
	{
		objetivo.classList.remove("presionado");
		if(objetivo.classList.contains("Es0")){cambioEscena(0)};
		if(objetivo.classList.contains("Es1")){cambioEscena(1)};
		if(objetivo.classList.contains("Es2")){cambioEscena(2)};
		if(objetivo.classList.contains("Es3")){cambioEscena(3)};
		if(objetivo.classList.contains("Pau")){Pausar()};
		if(objetivo.classList.contains("Pri")){Principio()};
		if(objetivo.classList.contains("Ins")){InstalarPwa()};
		if(objetivo.classList.contains("creador")){window.open(objetivo.href)};
		if(objetivo.classList.contains("Lin")){location.assign(objetivo.href)};	
	}
