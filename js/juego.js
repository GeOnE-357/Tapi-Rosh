const juego=document.getElementsByClassName("Nivel")[0];
tablero();
let factu = new Factura(numero(4),numero(5));

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
						div.onclick=function(){moverTapi(div.className)};
						juego.appendChild(div);
					}
			}
	}

//---------------- Objetos Tapi ----------------
function Tapi(col)
	{
		this.columna=col;
		this.fila=6;


		function mover(col)
			{
				let ulti=document.getElementsByClassName("fil6");
				for(let i=0; i <4;i++)
					{
						num=i+1;
						ulti[i].className="col"+num+" fil6";
					}
				if(col.slice(5) != "fil6")
					{
						pos=col.slice(0,4)+" fil6";
					}
				else
					{
						pos=col;
					}
				let mov=document.getElementsByClassName(pos)[0];
				mov.className+=" mov";
			}
	}

//---------------- Objetos Factura ----------------

function Factura(tip,col, )
	{
		this.tipo=tip;
		this.fila=1;
		this.columna=col;
		this.velocidad=1000;
		//Funciones del objeto
		this.dibujar=dibujar;
		this.bajar=bajar;
		this.borrar=borrar;

		function dibujar()
			{
				if(this.fila>1)
					{
						this.borrar();		
					}
				let bloque=document.getElementsByClassName("col"+this.columna+" fil"+this.fila)[0];
				let dibu=document.createElement("div");
				dibu.className="factura";
				bloque.appendChild(dibu);
			}
		
		function borrar()
			{
				num=this.fila-1;
				let bloque=document.getElementsByClassName("col"+this.columna+" fil"+num)[0];
				bloque.removeChild(bloque.firstChild);
			}

		function bajar()
			{
				if(this.fila<6)
					{
						this.fila+=1;
					}
			}
	}

function numero(max)
	{
		// Retorna un entero aleatorio entre min (incluido) y max (excluido)
		// ¡Usando Math.round() te dará una distribución no-uniforme!
  		return Math.floor(Math.random() * (max - 1)) + 1;
	}
