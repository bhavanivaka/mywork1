'use strict';
angular.module('myApp.dashboard', ['ngRoute', 'firebase'])
// Declared route 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/dashboard', {
        templateUrl: 'dashboard/dashboard.html',
        controller: 'DboardCtrl'
    });
}])
// Home controller
.controller('DboardCtrl', function($scope,$rootScope, $location, $firebaseObject ,$firebaseArray) { 
//Handle Account Status
firebase.auth().onAuthStateChanged(user => {
  if(user == null ) {
    window.location = 'login.html';
  } 
    var billsRef = firebase.database().ref().child('bills'); 
    $scope.bills = $firebaseArray(billsRef); 
    $scope.Math = window.Math;
    $scope.Bcount = function(c) {
        $scope.Billcount = c;
        console.log(c);
    }
    var pendingbillsRef = firebase.database().ref().child('bills').orderByChild('status').equalTo('PENDING'); 
    $scope.pendingbills = $firebaseArray(pendingbillsRef);
    $scope.BPcount = function(BP) {
        $scope.PendingBillcount = BP;
        console.log(BP);
    }
    var checkedAbillsRef = firebase.database().ref().child('bills').orderByChild('status').equalTo('APPROVED'); 
    $scope.checkedAbills = $firebaseArray(checkedAbillsRef);
    $scope.BCAcount = function(BCA) {
        $scope.AcheckedBillcount = BCA;
        console.log(BCA+'hiii');
    }
    var checkedRbillsRef = firebase.database().ref().child('bills').orderByChild('status').equalTo('REJECTED'); 
    $scope.checkedRbills = $firebaseArray(checkedRbillsRef);
    $scope.BCRcount = function(BCR) {
        $scope.RcheckedBillcount = BCR;
        console.log(BCR+'hiii');
    }
    var outletRef = firebase.database().ref().child('stores'); 
    $scope.outlets = $firebaseArray(outletRef); 
    $scope.Ocount = function(d) {
        $scope.Outletcount = d;
        console.log(d);
    }
    var userRef = firebase.database().ref().child('users'); 
    $scope.users = $firebaseArray(userRef); 
    $scope.Ucount = function(e) {
        $scope.Usercount = e;
        console.log(e);
    }
    var locationRef = firebase.database().ref().child('localities'); 
    $scope.localities = $firebaseArray(locationRef); 
    $scope.Lcount = function(f) {
        $scope.Locationcount = f;
        console.log(f);
    }
    var cashbackRef = firebase.database().ref().child('cashbacks'); 
    $scope.cashbacks = $firebaseArray(cashbackRef); 
    $scope.Ccount = function(g) {
        $scope.Cashbackcount = g;
        console.log(g);
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
    $scope.goToBills = function(){
        $location.path('/bills');
     }  
});
});
