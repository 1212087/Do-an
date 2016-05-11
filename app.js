angular.module('myApp', [
	'ngRoute',
	'myApp.account'
	])

.config(['$routeProvider',function($routeProvider) {
	$routeProvider.when('/home', {
		templateUrl: 'index/html',
		controller: 'HomeCtrl'
	}).
	otherwise({ redirectTo: 'index.html' });
}])

.controller('HomeCtrl', ['$scope', function ($scope) {
	
}])
