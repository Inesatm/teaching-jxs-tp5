

var pokeApp = angular.module('pokedex', ['ngResource']);
// With this you can inject POKEAPI url wherever you want
pokeApp.constant('POKEAPI', 'https://pokeapi.co/api/v2/');

pokeApp.config(['$resourceProvider', function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
}]);


pokeApp.controller('searchPokemon',function($scope, $resource,PokedexService,POKEAPI){

    var ApiData = $resource(POKEAPI + "pokemon/?limit=60");
    ApiData.get().$promise.then(function(results){
        $scope.pokemons = results.results;
        console.log($scope.pokemons);
    });
    $scope.ichooseu = function(pkmn){
        PokedexService. getPokemon(pkmn);
    }  }
);
pokeApp.factory('PokedexService', function($resource, $log, $rootScope){
    var pokemon = {};
    var description = {};

    function getPokemon(url){
      
        $resource(url).get().$promise.then(function(result){
            pokemon = result;
            //get the pokemon details(description text)
            //var details = $resource(result.species.url);
            $resource(result.species.url).get().$promise.then(function(result){
             var description = result.flavor_text_entries;
         // Get the latest English description.         
                for (let i = 0; i < entries.length; i++) {
                    const entry = entries[i];
              if (entry.language.name === 'en') {
                      description = entry.flavor_text;
                      break;
                    }
                pokemon.description = description.flavor_text;
            }});
        });
    }
    function pokemon(){
        return pokemon;
    }
    return {getPokemon: getPokemon, pokemon: pokemon}
});




   
    