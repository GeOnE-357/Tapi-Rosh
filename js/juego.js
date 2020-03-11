const juego=document.getElementsByClassName("Nivel")[0];
let puntos=document.getElementById("puntos");
let vidas=document.getElementById("vidas");
let tapi = new Tapi(1);
inicio();


function inicio()
	{
		tablero();
		tapi.dibujar();
		// Velocidad inicial ponerla en 800, y empezar a bajar de a 200.
		// Velocidad Limites 800 - 400.
		let spawn=setInterval(enemigos,800);
	}


function tablero()
	{
		for (let i=0; i < 6; i++)
			{
				for(let a=0; a<4; a++)
					{
						let div=document.createElement("div");
						num=a+1;
						num2=i+1;
						div.className="col"+num+" fil"+num2;
						div.onclick=function(){tapi.mover(a+1)};
						juego.appendChild(div);
					}
			}
	}


//---------------- Objetos Tapi ----------------

function Tapi(col)
	{
		this.columna=col;
		this.fila=6;
		this.puntos=0;
		this.vidas=3;
		//Funciones del objeto
		this.dibujar=dibujar;
		this.mover=mover;


		function dibujar()
			{
				let bloque=document.getElementsByClassName("col"+this.columna+" fil"+this.fila)[0];
				let dibu=document.createElement("div");
				dibu.className="tapi";
				bloque.appendChild(dibu);	
			}

		function mover(col)
			{
				borrar(this.columna, this.fila);
				this.columna=col;
				this.dibujar();
			}
	}


//---------------- Objetos Factura ----------------

function enemigos()
	{
		let factu = new Factura(numero(4),numero(5));
		factu.dibujar();
		factu.tiempo=setInterval(function(){factu.bajar()},factu.velocidad);
	}

function Factura(tip,col)
	{
		this.tipo=tip;
		this.fila=1;
		this.columna=col;
		this.puntos=5;
		this.velocidad=200;

		//Funciones del objeto
		this.dibujar=dibujar;
		this.bajar=bajar;
		this.tiempo;

		function dibujar()
			{
				let bloque=document.getElementsByClassName("col"+this.columna+" fil"+this.fila)[0];
				let dibu=document.createElement("div");
				dibu.className="factura";
				bloque.appendChild(dibu);
			}
		
		function bajar()
			{
				borrar(this.columna, this.fila);
				if(this.fila<5)
					{
						this.fila+=1;
						this.dibujar();
					}
				else
					{
						if(tapi.columna==this.columna)
							{
								tapi.puntos+=this.puntos;
								puntos.innerHTML=tapi.puntos;
							}
						else
							{
								this.fila+=1;
								this.dibujar();
								tapi.vidas-=1;
								setTimeout(borrar,100,this.columna,this.fila);
								vidas.innerHTML=tapi.vidas;
							}
						clearInterval(this.tiempo);
					}
			}
	}


//---------------- Funciones Generales ----------------

window.addEventListener("keydown", teclado,false);

function numero(max)
	{
		// Retorna un entero aleatorio entre min (incluido) y max (excluido)
		// ¡Usando Math.round() te dará una distribución no-uniforme!
  		return Math.floor(Math.random() * (max - 1)) + 1;
	}


function borrar(columna,fila)
	{
		// Funcion para remover elementos en una columna "X" y fila "Y".
		let bloque=document.getElementsByClassName("col"+columna+" fil"+fila)[0];
		bloque.removeChild(bloque.firstChild);
	}

function teclado(event)
	{
  		if(event.keyCode==39 || event.keyCode==68)
  			{
  				if(tapi.columna<4)
  					{
  						tapi.mover(tapi.columna+1);		
  					}
  				
  			}
  		if(event.keyCode==37 || event.keyCode==65)
  			{
  				if(tapi.columna>1)
					{
						tapi.mover(tapi.columna-1);		
					}
  						
  			}
	}