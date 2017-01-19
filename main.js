angular
    .module('anguweather', ['ngRoute'])
    .config(($routeProvider, $locationProvider)=>{
        $locationProvider.hashPrefix('')
        $routeProvider.when('/',{
            controller : 'RootCtrl',
            templateUrl : 'partials/root.html'
        })
        .when('/weather/:zipcode',{
            controller : 'WeatherCtrl',
            templateUrl : '/partials/weather.html'
        })
    })
    .controller('RootCtrl', function($scope, $location){
        $scope.gotoWeather = ()=>{
            $location.url(`/weather/${$scope.zip}`)
        }
    })
    .controller('WeatherCtrl',function($routeParams, $scope, weatherFactory){
        console.log("I'm weather");
        weatherFactory
            .getweather($routeParams.zipcode)
            .then((weather)=>{
                $scope.temperature = weather.temp
                $scope.location = weather.city
            })
    })
    .factory('weatherFactory',($http)=>{
        return{
            getweather(zipcode){
                return $http
                .get(`http://api.wunderground.com/api/ff20e9c4e24ff2d5/conditions/q/${zipcode}.json`)
                .then((res)=>({
                    temp : res.data.current_observation.temp_f,
                    city : res.data.current_observation.display_location.full
                    })
                )
            }
        }
    })
