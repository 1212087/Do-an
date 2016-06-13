angular.module('myApp.account', ['ngRoute',])

.config(['$routeProvider',function($routeProvider) {
	$routeProvider.
	when('/login',{
		templateUrl: 'login.html',
		controller: 'LoginCtrl'
	}).
	when('/register', {
		templateUrl: 'register.html',
		controller: 'RegisterCtrl'
	}).
	when('/forget', {
		templateUrl: 'forget.html',
		controller: 'ForgetCtrl'
	}).
	otherwise({ redirectTo: '/index.html' });
}])

.controller('LoginCtrl', ['$scope', function ($scope) {
	
}])

.controller('RegisterCtrl', ['$scope', function ($scope) {
	
}])

.controller('ForgetCtrl', ['$scope', function ($scope) {
	
}])