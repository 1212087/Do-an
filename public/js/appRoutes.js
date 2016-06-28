/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module('appRoutes', [])
	.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',function($stateProvider, $urlRouterProvider, $locationProvider) {
		/* Xử lý URL not found/404 error */
		$urlRouterProvider.otherwise('/views/layout/404.html');

		/* Thiết lập URL */
		$stateProvider
			.state('welcome', {
				url: '/',
				templateUrl: 'views/layout/welcome.html',
				controller: 'WelcomeCtrl',
				title: 'iMarket',
				access: {
					requiredLogin: false
				}
			})
			.state('home', {
				url: '/home',
				templateUrl: 'views/layout/home.html',
				controller: 'HomeCtrl',
				title: 'Trang chủ',
				access: {
					requiredLogin: false
				}
			})
			.state('login', {
				url: '/login',
				templateUrl: 'views/account/login.html',
				controller: 'LoginCtrl',
				title: 'Đăng nhập',
				access: {
					requiredLogin: false
				}
			})
			.state('register', {
				url: '/register',
				templateUrl: 'views/account/register.html',
				controller: 'RegisterCtrl',
				title: 'Đăng ký',
				access: {
					requiredLogin: false
				}
			})
			.state('forget_password', {
				url: '/forget',
				templateUrl: 'views/account/forget.html',
				controller: 'ForgetCtrl',
				title: 'Quên mật khẩu',
				access: {
					requiredLogin: false
				}
			})
			.state('about', {
				url: '/about',
				templateUrl: 'views/about/about.html',
				controller: 'AboutCtrl',
				title: 'Về chúng tôi',
				access: {
					requiredLogin: false
				}
			})
			.state('post', {
				url: '/post',
				templateUrl: 'views/post/post.html',
				controller: 'PostCtrl',
				title: "Chi tết bài viết",
				access: {
					requiredLogin: false
				}
			})
			.state('new', {
				url: '/new',
				templateUrl: 'views/post/new.html',
				controller: 'NewCtrl',
				title: 'Đăng bài viết mới',
				access: {
					requiredLogin: false
				}
			})
			.state('404', {
				url: '/404',
				templateUrl: 'views/layout/404.html',
				title: "404 - Không tìm thấy trang yêu cầu",
				access : {
					requiredLogin: false
				}
			})

		$locationProvider.html5Mode(true);
		$locationProvider.hashPrefix('!');
	}]);
