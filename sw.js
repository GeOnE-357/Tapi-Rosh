const nombreCache="sitio-cache";
const dinamicoCache="sitio-dinamico";
const elementos=["/Tapi-Rosh/","/Tapi-Rosh/index.html","/Tapi-Rosh/fallback.html","/Tapi-Rosh/css/estilo.css","/Tapi-Rosh/css/animate.css","/Tapi-Rosh/js/app.js","/Tapi-Rosh/js/escenas.js","/Tapi-Rosh/js/juego.js","/Tapi-Rosh/js/touch.js","/Tapi-Rosh/manifest.webmanifest","/Tapi-Rosh/img/creditos/icon-art.webp","/Tapi-Rosh/img/creditos/icon-down.webp","/Tapi-Rosh/img/creditos/icon-prog.webp","/Tapi-Rosh/img/tramas/patron200x200blanco.webp","/Tapi-Rosh/img/back1.webp","/Tapi-Rosh/img/fac1.webp","/Tapi-Rosh/img/fac2.webp","/Tapi-Rosh/img/fac3.webp","/Tapi-Rosh/img/fac4.webp","/Tapi-Rosh/img/fac5.webp","/Tapi-Rosh/img/logo.webp","/Tapi-Rosh/img/ups.webp","/Tapi-Rosh/img/tapi.webp","https://fonts.googleapis.com/css2?family=Rowdies&display=swap"];

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
				return caches.open(dinamicoCache).then(cache => {
					cache.put(evt.request.url, fetchRes.clone());
					limiteCache(dinamicoCache, 20);
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

