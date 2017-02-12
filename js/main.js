
var myApp = angular.module('FilmAPP', ['ui.bootstrap']);

var mockPeliculas = [
	{
	    name: 'Piratas del caribe',
	    url: 'http://pics.filmaffinity.com/pirates_of_the_caribbean_on_stranger_tides-755499916-large.jpg',
	    tags: ['piratas', 'caribe', 'jack'],
	    favorite: true,
	    desc: 'Mar Caribe, siglo XVIII. El aventurero capitán Jack Sparrow piratea en aguas caribeñas, pero su andanzas terminan cuando su enemigo, el Capitán Barbossa, después de robarle su barco, el Perla Negra, ataca la ciudad de Port Royal y secuestra a Elizabeth Swann, la hija del Gobernador. Will Turner, amigo de la infancia de Elizabeth, se une a Jack para rescatarla y recuperar el Perla Negra. Pero Barbossa y su tripulación son víctimas de un conjuro que los condena a vivir eternamente y a transformarse cada noche en esqueletos vivientes.El rescate de la bella Elizabeth será una tarea difícil, pues la maldición es real y será difícil enfrentarse con quienes no pueden morir',
	    link: 'https://es.wikipedia.org/wiki/Piratas_del_Caribe' 
	}, 
	{
	    name: 'Sharknado',
	    url: 'https://upload.wikimedia.org/wikipedia/en/9/93/Sharknado_poster.jpg',
	    tags: ['Shark', 'nado', 'tiburon'],
	    favorite: false,
	    desc: 'La trama se centra en una ciudad que está aterrorizada por miles de tiburones que han sido transportados por un huracán. Cuando los tornados se empiezan a formar, los mortíferos escualos comienzan su destrucción en el agua, la tierra y en el aire. ',
	    link:'https://en.wikipedia.org/wiki/Sharknado'
	},
	{
	    name: 'Killer Klowns from Outer Space',
	    url: 'http://pics.filmaffinity.com/killer_klowns_from_outer_space-306025741-large.jpg',
	    tags: ['Killer', 'Clown', 'Space'],
	    favorite: false,
	    desc: 'Deb y Mike ven caer un meteorito en el bosque. Cuando se acercan a investigar descubren que se trata de una carpa de circo llena de payasos asesinos. Después de huir de ellos por los pelos, acuden a la comisaría donde chocan con la incredulidad de Kirk, un viejo policía antipático. Sin embargo, ante su insistencia, consiguen la ayuda de Dave, un amigo de la infancia de Deb, que les ayuda en este surrealista caso. Mientras, la población sufre los hilarantes ataques de los payasos ',
	    link: 'https://en.wikipedia.org/wiki/Killer_Klowns_from_Outer_Space'
	},
	{
	    name: 'Juanito y los clonosaurios',
	    url: 'http://mexablog.com/wp-content/uploads/2013/05/seymour_skinner_juanito_y_los_clonosaurios_thumb.jpg',
	    tags: ['Juanito', 'clonosaurios', 'simur'],
	    favorite: false,
	    desc: 'Cuando Juanito y su amiga caen del barco que los llevaba a Estados Unidos, comienzan a naufragar y desembarcan en una isla aparentemente deshabitada. Grande es la sorpresa cuando descubren que esa isla esta repleta de animales mal clonados. Cuando estos animales les piden ayuda a cambio de dejarlos vivos, a Juanito y su amiga no le queda otra alternativa que cruzar los peligrosos senderos de la isla para llegar al centro, donde deberan desactivar una bomba que hundira la isla en 24Hs. ',
	    link: 'https://www.youtube.com/watch?v=Z281UQ3bM20'
	}
];

// MoviesController
myApp.controller('FilmAPPController', ["$scope",'Storage',
	function($scope,Storage) {
	 	var peliOriginal;
	 	$scope.editando = -1;
	 	$scope.movielist = Storage.list();

		$scope.delete = function(index) {
	    	Storage.remove(index);
	    }

	    $scope.cancelar = function(index) {
	    	$scope.movielist[index]=peliOriginal;
	    	$scope.editando = -1;
	    }

	    $scope.guardar = function(index)
	    {
	    	Storage.edit(index,$scope.movielist[index]);
	    	$scope.editando = -1;
	    }


	    $scope.edit = function(index){
	    	$scope.editando = index;
	    	peliOriginal = Object.assign({}, $scope.movielist[index]);
	    	
	    }				

	}
]);

// MenuController
myApp.controller('MenuController', ['$scope', 'Storage',
    function($scope, Storage) {
    	var pelicula= {}
    	$scope.add = function(){
    		$scope.agregar = true;

    	}
    	$scope.guardar = function(){
    		pelicula.nombre=$scope.nombre;
    		pelicula.url=$scope.url;
    		pelicula.desc=$scope.desc;
    		pelicula.link=$scope.link;

    		Storage.save(pelicula);
    		$scope.agregar = false;
    	}

    	$scope.cancelar = function(){
    		$scope.agregar = false;
    		$scope.nombre ="";
    		$scope.url= "";
    		$scope.desc= "";
    		$scope.link="";
    	}
  

        
    }
]);

// Service for local storage
myApp.service('Storage', ['$window',
    function($window) {
        var peliculas = [];
        if (!$window.localStorage) {
            alert('No tienes localStorage activado');
        } else {
        	var ls = angular.fromJson($window.localStorage.getItem('movielist'));

        	if (!ls) {
        		$window.localStorage.setItem('movielist', JSON.stringify(mockPeliculas));
        		peliculas = mockPeliculas;
        	} else {
        		peliculas = ls;
        	}
        }

        this.save = function(pelicula) {
            peliculas.push(pelicula);
            peliculasString = JSON.stringify(peliculas);
            $window.localStorage.setItem('movielist', peliculasString);

        }

        this.get = function(key) {

        }

        this.remove = function(key) {
        	 peliculas.splice(key,1);
        	 $window.localStorage.setItem('movielist',JSON.stringify(peliculas) );
  		}

        this.list = function() {
            return peliculas;
        }

        this.edit = function(key, pelicula){
        	peliculas[key]= Object.assign({}, pelicula);
        	$window.localStorage.setItem('movielist',JSON.stringify(peliculas) );
        }
    }


]);

