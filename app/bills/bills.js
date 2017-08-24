'use strict';
 
angular.module('myApp.bills', ['ngRoute', 'firebase'])
 
// Declared route 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/bills', {
        templateUrl: 'bills/bills.html',
        controller: 'BillsCtrl'
    });
}])

// Home controller
.controller('BillsCtrl', function($scope, $location, $firebaseObject ,$firebaseArray) { 
//Handle Account Status
firebase.auth().onAuthStateChanged(user => {
  if(user == null ) {
    window.location = 'login.html'; //After successful login, user will be redirected to home.html
  }
    var billsRef = firebase.database().ref().child('bills'); 
     $scope.bills = $firebaseArray(billsRef);
     $scope.accept = function(data){
        var userRef= firebase.database().ref('users/'+ data.user_id);
        var points;
         userRef.once('value').then(function(user) {
             var points = user.val().points + (data.offer_cashback * 0.01 * data.amount);
             userRef.update({
                 points: points
             })
         })
         var ref = firebase.database().ref('bills/' + data.$id);
         ref.update({
             status: 'APPROVED',
             admin_id: window.localStorage.getItem('user_id')
         })
     }
     $scope.reject = function(data){
         var ref = firebase.database().ref('bills/' + data.$id);
         ref.update({
             status: 'REJECTED',
             admin_id: window.localStorage.getItem('user_id')
         })
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
