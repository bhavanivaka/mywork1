'use strict';
angular.module('myApp.offers', ['ngRoute', 'firebase'])
// Declared route 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/offers', {
        templateUrl: 'offers/offers.html',
        controller: 'OffersCtrl'
    });
}])
// Home controller
.controller('OffersCtrl', function($scope, $location, $firebaseObject ,$firebaseArray) { 
  firebase.auth().onAuthStateChanged(user => {
  if(user == null ) {
    window.location = 'login.html'; //After successful login, user will be redirected to home.html
  }
     var offersRef = firebase.database().ref().child('offers'); 
     $scope.offers = $firebaseArray(offersRef);

     $scope.offer = { 
         id: 0,
         title: "",
         cashback: 0,
         store_id: 0
     }
     $scope.goToCashback = function(){
        $location.path('/cashbacks');
     }
     $scope.goToBills = function(){
        $location.path('/bills');
    }
    $scope.goToOutlets = function(){
        $location.path('/outlets');
    }
    $scope.goToDashboard = function()
    {
        $location.path('/dashboard')
    }
    $scope.goToUsers = function()
    {
        $location.path('/users')
    }
    $scope.submit = function(form){
        if(form.$valid) {
            var key = firebase.database().ref().child('offers').push().key
            var newOfferRef = firebase.database().ref().child('offers/'+ key)
            newOfferRef.set($scope.offer);
            newOfferRef.update({
                id: key
            });
        }
        else{
            console.log('ERROR');
        }
    }    
});
});
