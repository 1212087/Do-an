/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider',function($routeProvider) {
	$routeProvider.
	when('/', {
		templateUrl: 'views/layout/welcome.html',
		controller: 'HomeCtrl'
	}).
	when('/main', {
		templateUrl: 'views/layout/main.html',
		controller: 'MainCtrl'
	}).
	when('/login', {
		templateUrl: 'views/account/login.html',
		controller: 'LoginCtrl'
	}).
	when('/register', {
		templateUrl: 'views/account/register.html',
		controller: 'RegisterCtrl'
	}).
	when('/forget', {
		templateUrl: 'views/account/forget.html',
		controller: 'ForgetCtrl'
	}).
	when('/about', {
		templateUrl: 'views/about/about.html',
		controller: 'AboutCtrl'
	}).
	when('/post', {
		templateUrl: 'views/post/post.html',
		controller: 'PostCtrl'
	}).
	otherwise({ 
		template : "404"
	});
}]);

myApp.controller('HomeCtrl', ['$scope', function ($scope) {
	
}]);

myApp.controller('MainCtrl', ['$scope', function ($scope) {
	
}]);

myApp.controller('LoginCtrl', ['$scope', function ($scope) {
	
}]);

myApp.controller('RegisterCtrl', ['$scope', function ($scope) {
	
}]);

myApp.controller('ForgetCtrl', ['$scope', function ($scope) {
	
}])

myApp.controller('AboutCtrl', ['$scope', function ($scope) {
	
}])

myApp.controller('PostCtrl', ['$scope', function ($scope) {
	
}])

