'use strict';
angular.module('myApp.searchoutlets', ['ngRoute', 'firebase'])
 // Declared route 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/searchoutlets', {
        templateUrl: 'searchoutlets/searchoutlets.html',
        controller: 'searchoutletsCtrl'
    });
}])
.controller('searchoutletsCtrl', function($scope, $location, $firebaseObject ,$firebaseArray) {   
//Handle Account Status
  firebase.auth().onAuthStateChanged(user => {
  if(user == null ) 
  {
        window.location = 'login.html'; //After successful login, user will be redirected to home.html
  }   
    $scope.localities = null;
    $scope.submit = function(form){
        if(form.$valid) {
            //e.preventDefault();
             var storesRef = firebase.database().ref().child('stores').orderByChild('locality').equalTo($scope.localities);
             $scope.stores = $firebaseArray(storesRef);
        }
        else{
            console.log('ERROR');
        }
    }
  $scope.name = null;
    $scope.submit1 = function(form){
        if(form.$valid) {
            //e.preventDefault();
             var storesRef = firebase.database().ref().child('stores').orderByChild('name').equalTo($scope.name);
             $scope.stores = $firebaseArray(storesRef);
        }
        else{
            console.log('ERROR');
        }
    }
    $scope.submit2 = function(form){
        if(form.$valid) {
            //e.preventDefault();
             var storesRef = firebase.database().ref().child('stores').orderByChild('trending').equalTo($scope.trending);
             $scope.stores = $firebaseArray(storesRef);
        }
        else{
            console.log('ERROR');
        }
    }
    var storesRef = firebase.database().ref().child('stores'); 
    $scope.stores = $firebaseArray(storesRef); 
    $scope.goToCashbacks = function(){
        $location.path('/cashbacks');
     }
     $scope.goToBills = function(){
        $location.path('/bills');
     }

     $scope.goToOutlets = function(){
        $location.path('/outlets');
    }
    $scope.goToOffers = function(){
        $location.path('/offers');
    }
    $scope.goToDashboard = function()
    {
        $location.path('/dashboard')
    }
    $scope.goToUsers = function()
    {
        $location.path('/users')
    }
});
});
