const nombreCache="sitio-cache-v1";
const dinamicoCache="sitio-dinamico-v1";
const elementos=["/","/index.html","/fallback.html","/css/estilo.css","/css/animate.css","/js/app.js","/js/escenas.js","/js/juego.js","/js/touch.js","/manifest.json","/img/creditos/icon-art.png","/img/creditos/icon-down.png","/img/creditos/icon-prog.png","/img/tramas/patron200x200blanco.png","/img/back1.png","/img/fac1.png","/img/fac2.png","/img/fac3.png","/img/fac4.png","/img/fac5.png","/img/logo.png","/img/tapi.png","https://fonts.googleapis.com/css2?family=Rowdies&display=swap"];

//Funcion para limitar el cache
const limiteCache = (nombre, tamaño)=> {
	caches.open(nombre).then(cache => {
		cache.keys().then(keys =>{
			if(keys.length > tamaño){
				cache.delete(keys[0]).then(limiteCache(nombre, tamaño));
			}
		})
	})
};

//Instalar el service worker.
self.addEventListener("install", evt => {
	console.log("El service worker se instalo.");
	//1°-Guardamos en el cache, los elementos predefinidos de la pagina. Css, Javascripts y HTML.
	evt.waitUntil(caches.open(nombreCache).then((cache) => {
					console.log("Definimos el cache predeterminado.");
					cache.addAll(elementos);
				})
		);
});


//Activar el service worker.
self.addEventListener("activate", evt =>{
		//console.log("El service worker se activo.");
		//3°-Chequearemos la version de cache, borraremos la version obsoleta.
		evt.waitUntil(
			caches.keys().then(keys => {
				console.log(keys);
				return Promise.all(keys
					.filter(key => key !== nombreCache && key !== dinamicoCache)
					.map(key => caches.delete(key))
				)
			})
		);
	});

//Eventos Fetch (fetch request o pedido de busqueda).
self.addEventListener("fetch", evt =>{
	//console.log("Se atrapo el evento: ",evt);
	//2°-Atrapamos los pedidos, para que los busque en el cache.
	evt.respondWith(
		caches.match(evt.request).then(cacheRes => {
			return cacheRes || fetch(evt.request).then(fetchRes =>{
				return caches.open(nombreCache).then(cache => {
					cache.put(evt.request.url, fetchRes.clone());
					limiteCache(dinamicoCache, 5);
					return fetchRes;
				})
			})
		}).catch(() => {
			if(evt.request.url.indexOf(".html") > -1){
				return caches.match("fallback.html");	
			}	
		})
	);
});

