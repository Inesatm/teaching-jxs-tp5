var pokeApp = angular.module('pokedex', ['ngResource']);
pokeApp.controller('searchPk', ['$scope', 
function($scope) {
    $scope.pokemon = {id: '', name: ''};
    
  }]);;
// With this you can inject POKEAPI url wherever you want
pokeApp.constant('POKEAPI', 'http://pokeapi.co');

pokeApp.config(['$resourceProvider', function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
}]);

