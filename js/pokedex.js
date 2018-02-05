var pokeApp = angular.module('pokedex', ['ngResource']);
pokeApp.controller('searchPk', ['$scope', '$http',
function($scope) {
    $scope.pokemons =[
            {name : 'Pikachu' , id : 1},
            {name : 'Bulbizarre' , id : 2},
            {name : 'Herbizarre' , id : 3},
            {name : 'Aspicot' , id : 4},
            {name : 'Ortide' , id : 5},
            {name : 'Kabuto' , id : 6},
            {name : 'Pyroli' , id : 7},
            {name : 'Mew' , id : 8},
            {name : 'Ronflex' , id : 9}
    ];
    $scope.ichooseu = function(pkmn){
        console.log(" I CHOOSE YOU :"+pkmn);
    }  }
]);
pokeApp.controller('pkmnfromapi', function($scope, $http){ 
    $http.get("https://pokeapi.co/api/v2/pokemon/")
    .then(function(response) {

        $scope.content = response.data.results;
        console.log($scope.content);
})});


// With this you can inject POKEAPI url wherever you want
pokeApp.constant('POKEAPI', 'http://pokeapi.co');

pokeApp.config(['$resourceProvider', function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
}]);

