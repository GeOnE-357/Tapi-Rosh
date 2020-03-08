const juego=document.getElementsByClassName("Nivel")[0];
tablero();
let factu = new Factura(numero(4),numero(5));
let tapi = new Tapi(1);
factu.dibujar();
setInterval(function(){factu.bajar()},factu.velocidad);


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
		this.borrar=borrar;


		function dibujar()
			{
				let bloque=document.getElementsByClassName("col"+this.columna+" fil"+this.fila)[0];
				let dibu=document.createElement("div");
				dibu.className="tapi";
				bloque.appendChild(dibu);	
			}

		function mover(col)
			{
				this.borrar();
				this.columna=col;
				this.dibujar();
			}

		function borrar()
			{
				num=this.columna;
				let bloque=document.getElementsByClassName("col"+this.columna+" fil"+this.fila)[0];
				bloque.removeChild(bloque.firstChild);
			}
	}


//---------------- Objetos Factura ----------------

function Factura(tip,col)
	{
		this.tipo=tip;
		this.fila=1;
		this.columna=col;
		this.puntos=5;
		this.velocidad=1000;
		//Funciones del objeto
		this.dibujar=dibujar;
		this.bajar=bajar;
		this.borrar=borrar;

		function dibujar()
			{
				let bloque=document.getElementsByClassName("col"+this.columna+" fil"+this.fila)[0];
				let dibu=document.createElement("div");
				dibu.className="factura";
				bloque.appendChild(dibu);
			}
		
		function bajar()
			{
				this.borrar();
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
							}
						else
							{
								this.fila+=1;
								this.dibujar();
								tapi.vidas-=1;
								this.borrar();
							}
					}
			}

		function borrar()
			{
				let num=this.fila;
				let bloque=document.getElementsByClassName("col"+this.columna+" fil"+num)[0];
				bloque.removeChild(bloque.firstChild);
			}
	}


//---------------- Funciones Generales ----------------

function numero(max)
	{
		// Retorna un entero aleatorio entre min (incluido) y max (excluido)
		// ¡Usando Math.round() te dará una distribución no-uniforme!
  		return Math.floor(Math.random() * (max - 1)) + 1;
	}
