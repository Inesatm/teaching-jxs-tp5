

var pokeApp = angular.module('pokedex', ['ngResource']);
// With this you can inject POKEAPI url wherever you want
pokeApp.constant('POKEAPI', 'https://pokeapi.co/api/v2/');

pokeApp.config(['$resourceProvider', function ($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
}]);
pokeApp.controller('searchPokemon', function ($scope, $resource, PokedexService, POKEAPI) {
    var ApiData = $resource(POKEAPI + "pokemon/?limit=60");
    ApiData.get().$promise.then(function (results) {
        $scope.pokemons = results.results;
        console.log($scope.pokemons);
    });
    $scope.ichooseu = function (pkmn) {
        console.log("whoopsi " + pkmn);
        PokedexService.getPokemon(pkmn);
    }
});
pokeApp.factory('PokedexService', function ($resource, $log, $rootScope) {
    var pokemon = {};
    var desc = {};
    function getPokemon(url) {
        var urlBase = $resource(url);
        urlBase.get().$promise.then(function (result) {
            pokemon = result;
            //get the pokemon details(description text)
            var details = $resource(result.species.url);
            details.get().$promise.then(function (result) {
                var description = result.flavor_text_entries;
                // Get the latest English description.         
                for (i = 0; i < description.length; i++) {
                    const entry = description[i];
                    if (entry.language.name === 'en') {
                        desc = entry.flavor_text;
                        // console.log("sss"+desc);
                        break;
                                        }
                }
                pokemon.description = desc;
                console.log("description" + pokemon.description);
            });
        });
    }
    function getPoke() {
        return pokemon;
    }
    return { getPokemon: getPokemon, getPoke: getPoke }
});
pokeApp.controller('pokeWtach', function ($scope, PokedexService) {
    $scope.$watch(function () {
        return PokedexService.getPoke()
    },
     function (newVal) {
            $scope.pokemon = newVal;
        });
});

pokeApp.directive('pokedex',function(){
    return {
        templateUrl: 'pokedex.html'
    };
});