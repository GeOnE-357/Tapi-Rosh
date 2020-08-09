const juego=document.getElementsByClassName("Nivel")[0];
let puntos=document.getElementById("puntos");
let vidas=document.getElementById("vidas");
let pausa = false;
let tapi = new Tapi(1);
let spawn;
let enemigos=[];

function Inicio()
	{
		Tablero();
		tapi.dibujar();
		spawn=setInterval(CrearEnemigos,800);
	}


function Tablero()
	{
		for (let i=0; i < 6; i++)
			{
				for(let a=0; a<4; a++)
					{
						let div=document.createElement("div");
						num=a+1;
						num2=i+1;
						div.className="col"+num+"-fil"+num2;
						div.onclick=function(){tapi.mover(a+1)};
						juego.appendChild(div);
					}
			}
	}


function CrearEnemigos()
	{
		let factu = new Factura(numero(5),numero(5));
		factu.id=enemigos.length;
		factu.dibujar();
		factu.tiempo=setInterval(function(){factu.bajar()},factu.velocidad);
		enemigos.push(factu);
	}


function Pausar()
	{
		if(pausa==false)
			{
				pausa=true;
				clearInterval(spawn);
				for(let i=0; i<enemigos.length;i++)
					{
						clearInterval(enemigos[i].tiempo);
					}
			}
		else
			{
				pausa=false;
				for(let i=0; i<enemigos.length;i++)
					{
						enemigos[i].tiempo=setInterval(function(){enemigos[i].bajar()},enemigos[i].velocidad)	
					}
				spawn=setInterval(CrearEnemigos,800);	
			}
	}

function FinJuego()
	{
		Pausar();
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
				let bloque=document.getElementsByClassName("col"+this.columna+"-fil"+this.fila)[0];
				let dibu=document.createElement("div");
				dibu.className="tapi";
				bloque.appendChild(dibu);	
			}

		function mover(col)
			{
				if(this.vidas>0 && pausa==false)
					{
						borrar(this.columna, this.fila, "tapi");
						this.columna=col;
						this.dibujar();
					}
			}
	}



//---------------- Objetos Factura ----------------


function Factura(tip,col)
	{
		this.id=0;
		this.tipo=tip;
		this.fila=1;
		this.columna=col;
		this.puntos=5;
		this.velocidad=200;
		this.tiempo;

		//Funciones del objeto
		this.dibujar=dibujar;
		this.bajar=bajar;
		this.parar=parar;

		function dibujar()
			{
				let bloque=document.getElementsByClassName("col"+this.columna+"-fil"+this.fila)[0];
				let dibu=document.createElement("div");
				dibu.className="factura fac"+this.tipo;
				bloque.appendChild(dibu);
			}
		
		function bajar()
			{
				if(tapi.vidas>0 && pausa==false)
					{
						borrar(this.columna, this.fila, "factura");
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
										setTimeout(borrar,100,this.columna,this.fila,"factura");
										vidas.innerHTML=tapi.vidas;
										if(tapi.vidas==0)
											{
												FinJuego();
											}
									}
								enemigos.splice(this.id, 1);
								this.parar();
							}
				}
			}

		function parar()
			{
				clearInterval(this.tiempo);
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


function borrar(columna,fila,tipo)
	{
		// Funcion para remover elementos en una columna "X" y fila "Y".
		let grilla="div.col"+columna+"-fil"+fila;
		let bloque=document.querySelector(grilla);
		let elemento=grilla+" div."+tipo;
		let hijo=document.querySelector(elemento);
		bloque.removeChild(hijo);
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