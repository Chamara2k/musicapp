var app = angular.module('musicApp', ['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider.when("/Items", {
      templateUrl: "view-list.html",
      controller: "listController"
    })
    .when("/Items/add", {
      templateUrl: "view-detail.html",
      controller: "addController"
    })
    .when("/Items/:index", {
      templateUrl: "view-detail.html",
      controller: "editController"
    })
    .when("/Items/delete:index", {
      templateUrl: "view-list.html",
      controller: "deleteController"
    })
    .otherwise({
      redirectTo: "/Items"
    })
});






app.factory('musicService', ['$http', function($http) {
  var svc = {};

  //var baseUrl = 'http://192.168.1.64/MusicService/api/music';
  
  var urlBase = 'http://192.168.1.64/MusicService/api/music/';
 
 

  var data = [{
    name: "Grouplove",
    genre: "Alternative",
    rating: "4",
    year: "1987"
  }, {
    name: "The Beatles",
    genre: "Rock",
    rating: "5",
    year: "2005"
  }, {
    name: "The Cure",
    genre: "Alternative",
    rating: "7",
    year: "2001"
  }, {
    name: "One Direction",
    genre: "Classic",
    rating: "5",
    year: "1998"
  }];


  svc.getArtists = function() {
    return data;
	//return $http.get(urlBase);
  };


  svc.addArtist = function(artist) {
    data.push(artist);
  };


  svc.editArtist = function(index, artist) {
    data[index] = artist;
  };


  svc.removeArtist = function(index, artist) {
    alert(index);
    if (index > -1) {
      data.splice(index, 1);
      alert("Record deleted");
    }
  };

  return svc;
}]);





app.controller("listController", ["$scope", "$location", "$routeParams", "musicService",
  function($scope, $location, $routeParams, musicService) {
    $scope.data = musicService.getArtists();
alert($scope.data);

    $scope.addArtist = function() {
      $location.path("/Items/add");

    };


    $scope.editItem = function(index) {
      $location.path("/Items/" + index);
    };

    $scope.removeItem = function(index) {
      musicService.removeArtist(index, $scope.Item);
    };


    $scope.loadMapView = function() {
         var map = new L.Map('map');                       
                
      	 L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      	    attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
            maxZoom: 18
         }).addTo(map);
         map.attributionControl.setPrefix(''); // Don't show the 'Powered by Leaflet' text.
         
         // Location to centre the map
         var london = new L.LatLng(51.505, -0.09); 
         map.setView(london, 13);
         
         // Location of the marker
         var markerLocation = new L.LatLng(51.5, -0.09);

         var marker = new L.Marker(markerLocation);
         map.addLayer(marker);
         
         // Add a circle...
         var circleLocation = new L.LatLng(51.508, -0.11),
             circleOptions = {
                 color: 'red', 
                 fillColor: '#f03', 
                 fillOpacity: 0.5
             };
             
         var circle = new L.Circle(circleLocation, 500, circleOptions);
         map.addLayer(circle);

         // ...and a triangle
         var p1 = new L.LatLng(51.509, -0.08),
             p2 = new L.LatLng(51.503, -0.06),
             p3 = new L.LatLng(51.51, -0.047),
             polygonPoints = [p1, p2, p3];
         
         var polygon = new L.Polygon(polygonPoints);
         map.addLayer(polygon);   
    };

  }
]);


app.controller("addController", ["$scope", "$location", "$routeParams", "musicService",
  function($scope, $location, $routeParams, musicService) {
    $scope.save = function() {
      musicService.addArtist({
        name: $scope.Item.name,
        genre: $scope.Item.genre,
        rating: $scope.Item.rating,
        year: $scope.Item.year
      });
      $location.path("/Items");
    };


    $scope.cancel = function() {
      $location.path("/Items");
    };

  }
]);


app.controller("editController", ["$scope", "$location", "$routeParams", "musicService",
  function($scope, $location, $routeParams, musicService) {
    $scope.Item = musicService.getArtists()[parseInt($routeParams.index)];

    $scope.save = function() {
      musicService.editArtist(parseInt($routeParams.index), {
        name: $scope.Item.name,
        genre: $scope.Item.genre,
        rating: $scope.Item.rating,
        year: $scope.Item.year
      });
      $location.path("/Items");
    };





    $scope.cancel = function() {
      $location.path("/Items");
    };

  }
]);


app.controller("deleteController", ["$scope", "$location", "$routeParams", "musicService",
  function($scope, $location, $routeParams, musicService) {

    $scope.delete = function() {
      alert("TEST ME");
      $location.path("/Items");
    };

  }
]);

