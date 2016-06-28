angular.module('appRoutes', [])
.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
    /*Điều hướng 404*/
    $urlRouterProvider.otherwise('/404.html');
    $urlRouterProvider.when('/_=_', '/');

    /*Thiết lập các state*/
    $stateProvider

        /*===============QUESTIONS================*/
        .state('home', {
            url: '/',
            templateUrl: 'views/public/home.html',
            controller: 'ListQuestionController',
            access: {
                requiredLogin: false
            }
        })
        .state('about', {
            url: '/gioi-thieu.html',
            templateUrl: 'views/public/about.html',
            title: 'Giới thiệu',
            access: {
                requiredLogin: false
            }
        })
        .state('question-detail', {
            url: '/cau-hoi/chi-tiet/:id/:slug',
            templateUrl: 'views/public/question/detail.html',
            controller: 'DetailQuestionController',
            title: 'Chi tiết tin',
            access: {
                requiredLogin: false
            }
        })
        .state('system-question', {
            url: '/system/questions',
            templateUrl: 'views/private/question/manage.html',
            controller: 'ListQuestionController',
            title: 'Quản lý rao vặt',
            access: {
                requiredLogin: true
            }
        })
        .state('system-question-edit', {
            url: '/system/questions/edit/:id',
            templateUrl: 'views/private/question/edit.html',
            controller: 'QuestionController',
            title: 'Quản lý rao vặt',
            access: {
                requiredLogin: true
            }
        })

        /*===============ANSWERS================*/
        .state('system-answer', {
            url: '/system/answers',
            templateUrl: 'views/private/answer/manage.html',
            controller: 'AnswerController',
            title: 'Quản lý câu trả lời',
            access: {
                requiredLogin: true
            }
        })
        .state('system-answer-detail', {
            url: '/system/answers/detail/:id',
            templateUrl: 'views/private/answer/detail.html',
            controller: 'AnswerController',
            title: 'Quản lý câu trả lời',
            access: {
                requiredLogin: true
            }
        })

        /*===============USERS================*/
        .state('users', {
            url: '/thanh-vien.html',
            templateUrl: 'views/public/user/list.html',
            controller: 'ListUserController',
            title: 'Danh sách thành viên đã đăng ký',
            access: {
                requiredLogin: false
            }
        })
        .state('profile', {
            url: '/thong-tin-thanh-vien/:id/:slug',
            templateUrl: 'views/public/user/profile.html',
            controller: 'ProfileUserController',
            title: 'Chi tiết tài khoản',
            access: {
                requiredLogin: false
            }
        })
        .state('forgot_password', {
            url: '/thanh-vien/quen-mat-khau.html',
            templateUrl: 'views/public/user/resetpass.html',
            controller: 'UserController',
            title: 'Khôi phục mật khẩu',
            access: {
                requiredLogin: false
            }
        })
        .state('reset-password', {
            url: '/users/reset-password/:token',
            templateUrl: 'views/public/user/form-reset.html',
            controller: 'resetPasswordController',
            title: 'Khôi phục mật khẩu',
            access: {
                requiredLogin: false
            }
        })
        .state('edit-user', {
            url: '/chinh-sua-thong-tin/:id/:slug',
            templateUrl: 'views/public/user/edit.html',
            controller: 'EditProfile',
            title: 'Chỉnh sửa thông tin',
            access: {
                requiredLogin: true
            }
        })
        .state('register', {
            url: '/dang-ky.html',
            templateUrl: 'views/public/register.html',
            controller: 'UserController',
            title: 'Đăng ký thành viên',
            access: {
                requiredLogin: false
            }
        })
        .state('new_post', {
            url: '/dang-tin.html',
            templateUrl: 'views/public/new_post.html',
            controller: 'QuestionController',
            title: 'Đăng tin rao bán',
            access: {
                requiredLogin: true
            }
        })
        .state('login', {
            url: '/dang-nhap.html',
            templateUrl: 'views/public/login.html',
            controller: 'UserController',
            title: 'Đăng nhập hệ thống',
            access: {
                requiredLogin: false
            }
        })
        .state('active_account', {
            url: '/users/active/:user_id/:token',
            templateUrl: 'views/public/notice.html',
            controller: 'UserController',
            title: 'Kích hoạt tài khoản',
            access: {
                requiredLogin: false
            }
        })
        .state('system-user', {
            url: '/system/users',
            templateUrl: 'views/private/user/manage.html',
            controller: 'ListUserController',
            title: 'Quản lý thành viên',
            access: {
                requiredLogin: true
            }
        })
        .state('system-user-permission', {
            url: '/system/users/permission/:id',
            templateUrl: 'views/private/user/permission.html',
            controller: 'EditProfile',
            title: 'Quản lý thành viên',
            access: {
                requiredLogin: true
            }
        })

        /*================SYSTEM================*/
        .state('system', {
            url: '/system',
            templateUrl: 'views/private/system.html',
            controller: 'MainController',
            title: 'Quản lý Hệ thống',
            access: {
                requiredLogin: true
            },
        /*isadmin:{requireAdmin: true}*/
        })

        /*===============TAGS================*/
        .state('tags', {
            url: '/tags.html',
            templateUrl: 'views/public/tag/index.html',
            controller: 'ListTagController',
            title: 'Tags',
            access: {
                requiredLogin: false
            }
        })
        .state('questions_tag', {
            url: '/cau-hoi-theo-tag/:id/:slug',
            templateUrl: 'views/public/tag/question.html',
            controller: 'getQuestionByTagController',
            title: 'Tagged Question',
            access: {
                requiredLogin: false
            }
        })
        .state('system-tag', {
            url: '/system/tags',
            templateUrl: 'views/private/tag/manage.html',
            controller: 'ListTagController',
            title: 'Quản lý danh mục',
            access: {
                requiredLogin: true
            }
        })
        .state('system-tag-edit', {
            url: '/system/tags/edit/:id',
            templateUrl: 'views/private/tag/edit.html',
            controller: 'TagDetail',
            title: 'Quản lý danh mục',
            access: {
                requiredLogin: true
            }
        })

        /*================SYSTEM SETTING==============*/
        .state('system-report', {
            url: '/system/report',
            templateUrl: 'views/private/report/manage.html',
            controller: 'ReportController',
            title: 'Quản lý vi phạm',
            access: {
                requiredLogin: true
            }
        })

        /*===============404 NOT FOUND================*/
        .state('404', {
            url: '/404.html',
            templateUrl: 'views/public/404.html',
            title: '404 - Không tìm thấy trang yêu cầu',
            access: {
                requiredLogin: false
            }
        });

    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
}]);
