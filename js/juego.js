const juego=document.getElementsByClassName("Nivel")[0];
tablero();

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
						div.onclick=function(){mover(div.className)};
						juego.appendChild(div);
					}
			}
	}

function mover(col)
	{
		
		if(col.slice(5) != "fil6")
			{
				pos=col.slice(0,4)+" fil6"
			}
		let mov=document.getElementsByClassName(pos)[0];
		console.log(mov);
	}