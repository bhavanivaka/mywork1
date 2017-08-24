'use strict';
 
angular.module('myApp.users', ['ngRoute', 'firebase'])
 
// Declared route 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/users', {
        templateUrl: 'users/users.html',
        controller: 'UsersCtrl'
    });
}]) 
// Home controller
.controller('UsersCtrl', function($scope, $location, $firebaseObject ,$firebaseArray) { 
  firebase.auth().onAuthStateChanged(user => {
  if(user == null ) {
    window.location = 'login.html'; //After successful login, user will be redirected to home.html
  }
     var usersRef = firebase.database().ref().child('users'); 
     $scope.users = $firebaseArray(usersRef);

    $scope.referee = null;
    $scope.submit = function(form){
        if(form.$valid) {
            //e.preventDefault();
            console.log($scope.referee);
             var usersRef = firebase.database().ref().child('users').orderByChild('referee').equalTo($scope.referee);
             $scope.users = $firebaseArray(usersRef);
        }
        else{
            console.log('ERROR');
        }
    }
     $scope.goToBills = function(){
        $location.path('/bills');
    }
    $scope.goToCashback = function(){
        $location.path('/cashbacks');
     }

     $scope.goToOutlets = function(){
        $location.path('/outlets');
    }

    $scope.goToOffers = function(){
        $location.path('/offers');
    }

    $scope.goToOffers = function(){
        $location.path('/offers');
    }

    $scope.goToBillsByOutlet = function() {
        $location.path('/outlet-bills')
    }
    $scope.goToSearchOutlets = function() {
        $location.path('/searchoutlets')
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
