let listado=document.querySelector(".cont-tabla");

// base de datos offline
db.enablePersistence()
	.catch(err => {
		if(err.code ==='failed-precondition'){
			//Probablemente halla muchas 'tabs'.
			console.log('fallo la persistencia.');
		}else if(err.code === 'uninplemented'){
			//El navegador no lo soporta.
			console.log('la persistencia no esta disponible.');
		}
	})

//escucha a la db en tiempo-real
db.collection('puntajes').onSnapshot((snapshot) => {

	snapshot.docChanges().forEach(change => {

		if(change.type === 'added'){
			renderPuntaje(change.doc.data(), change.doc.id);
		}
		if(change.type === 'removed'){

		}
	});

})


/*Puntajes de todos*/

const renderPuntaje = (data, id) => {
	const contenido = `<div class="tabla-item" id="${id}"><h3>1°</h3><h3>${data.nombre}</h3><h3>${data.puntos}</h3></div>`;
	listado.innerHTML += contenido;

}