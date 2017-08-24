'use strict';
angular.module('myApp.outlets', ['ngRoute', 'firebase'])
 // Declared route 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/outlets', {
        templateUrl: 'outlets/outlets.html',
        controller: 'OutletsCtrl'
    });
}])
// Home controller
.controller('OutletsCtrl', function($scope, $location, $firebaseObject ,$firebaseArray, $filter) { 
    firebase.auth().onAuthStateChanged(user => {
    if(user == null ) {
        window.location = 'login.html'; //After successful login, user will be redirected to home.html
        }
    $scope.date = new Date();
    $scope.formattedDate =  $filter('date')($scope.date, "dd-MM-yyyy");
    $scope.outlet = {
        "address" : "",
        "cashback" : 0,
        "mobile":"",
        "description" : "",
        "face" : "",
        "id" : 0,
        "locality" : "",
        "name" : "",
        "offer" : "",
        "date":$scope.formattedDate,
        "trending" : false
    }
    var localitiesRef = firebase.database().ref().child('localities'); 
    $scope.localities = $firebaseArray(localitiesRef);
    var outletsRef = firebase.database().ref().child('stores'); 
    $scope.outlets = $firebaseArray(outletsRef);

     $scope.goToCashback = function(){
        $location.path('/cashbacks');
     }
    $scope.goToSearchOutlets = function(){
        $location.path('/searchoutlets');
     }

     $scope.goToBills = function(){
        $location.path('/bills');
    }
    
    $scope.goToOffers = function(){
        $location.path('/offers');
    }
    $scope.goToeditoutlets = function(){
        $location.path('/editoutlets');
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
            var key = firebase.database().ref().child('stores').push().key
            var newOutletRef = firebase.database().ref().child('stores/'+ key)
            newOutletRef.set($scope.outlet);
            newOutletRef.update({
                id: key
            });
            $('#outletForm').trigger("reset");
            $(".modal").modal("toggle");
        }
        else{
            console.log('ERROR');
        }
    } 
    $scope.Ename = function(data,storeName){
        var input = document.getElementById('storeName'),
        storeName = input.value;
        console.log(storeName);
        //console.log(data.id);
        var ref = firebase.database().ref('stores/' + data.$id);
         ref.update({
             name: storeName,
            // admin_id: window.localStorage.getItem('user_id')
         })
         window.alert('Name Edited successfully');
         window.location.reload(true);
     }
     $scope.Ecashback = function(data,storeCashback){
        var input = document.getElementById('storeCashback'),
        storeCashback = input.value;
        console.log(storeCashback);
        //console.log(data.id);
        var ref = firebase.database().ref('stores/' + data.$id);
         ref.update({
             cashback: storeCashback,
            // admin_id: window.localStorage.getItem('user_id')
         })
         window.alert('Cashbacks Edited successfully');
         window.location.reload(true);
     }
     $scope.Eoffer = function(data,storeOffer){
        var input = document.getElementById('storeOffer'),
        storeOffer = input.value;
        console.log(storeOffer);
        //console.log(data.id);
        var ref = firebase.database().ref('stores/' + data.$id);
         ref.update({
             offer: storeOffer,
            // admin_id: window.localStorage.getItem('user_id')
         })
         window.alert('Offers Edited successfully');
         window.location.reload(true);
     }
     $scope.Emobile = function(data,storeMobile){
        var input = document.getElementById('storeMobile'),
        storeMobile = input.value;
        console.log(storeMobile);
        //console.log(data.id);
        var ref = firebase.database().ref('stores/' + data.$id);
         ref.update({
             mobile: storeMobile,
            // admin_id: window.localStorage.getItem('user_id')
         })
         window.alert('Mobile Number Edited successfully');
         window.location.reload(true);
     }
     $scope.enterMobile = function(data,newMobile){
        var input = document.getElementById('newMobile'),
        newMobile = input.value;
        console.log(newMobile);
        //console.log(data.id);
        var ref = firebase.database().ref('stores/' + data.$id);
         ref.update({
             mobile: newMobile,
            // admin_id: window.localStorage.getItem('user_id')
         })
         window.alert('Mobile Number Edited successfully');
         window.location.reload(true);
     }
     $scope.Edescription = function(data,storeDes){
        var input = document.getElementById('storeDes'),
        storeDes = input.value;
        console.log(storeDes);
        //console.log(data.id);
        var ref = firebase.database().ref('stores/' + data.$id);
         ref.update({
             description: storeDes,
            // admin_id: window.localStorage.getItem('user_id')
         })
         window.alert('Description Edited successfully');
         window.location.reload(true);
     }
     $scope.Eaddress = function(data,storeAddress){
        var input = document.getElementById('storeAddress'),
        storeAddress = input.value;
        console.log(storeAddress);
        //console.log(data.id);
        var ref = firebase.database().ref('stores/' + data.$id);
         ref.update({
             address: storeAddress,
            // admin_id: window.localStorage.getItem('user_id')
         })
         window.alert('address Edited successfully');
         window.location.reload(true);
     }
     $scope.Elocality = function(data,storeLocality){
        var input = document.getElementById('storeLocality'),
        storeLocality = input.text;
        console.log(storeLocality);
        //console.log(data.id);
        var ref = firebase.database().ref('stores/' + data.$id);
         ref.update({
             locality: storeLocality,
            // admin_id: window.localStorage.getItem('user_id')
         })
         window.alert('location Edited successfully');
         window.location.reload(true);
     }
     $scope.Etrending = function(data,storeTrending){
        var input = document.getElementById('storeTrending'),
        storeTrending = input.text;
        console.log(storeTrending);
        //console.log(data.id);
        var ref = firebase.database().ref('stores/' + data.$id);
         ref.update({
             trending: storeAddress,
            // admin_id: window.localStorage.getItem('user_id')
         })
         window.alert('trending Edited successfully');
         window.location.reload(true);
     }
});
});