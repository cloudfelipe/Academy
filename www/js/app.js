// Ionic Starter App

angular.module('starter', ['ionic', 'services', 'controllers', 'testers', 'ngResource', 'ngCordova', 'angular-svg-round-progress'])

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  //Disable swipe to go back
  $ionicConfigProvider.views.swipeBackEnabled(false);

  $urlRouterProvider.otherwise('/quiz')

  $stateProvider

  .state('quiz', {
    url: '/quiz',
    cache: false,
    templateUrl: "templates/quizHome.html",
    controller: 'QuizHomeCtrl'
  })

  .state('quizAtIndex', {
    url: '/quiz:idQuiz/question:idQuestion',
    templateUrl: 'templates/quiz.html',
    cache: false,
    controller: 'QuizCtrl',
    resolve: {
        question: function($stateParams, $quizService) {
          return $quizService.getQuiz().questions[$stateParams.idQuestion]
        },
        myQuiz: function($quizService) {
          return $quizService.getQuiz()
        }
    }
  })

  .state('score', {
    url: '/score',
    cache: false,
    templateUrl: 'templates/score.html',
    controller: 'ScoreCtrl',
    resolve: {
        myQuiz: function($quizService) {
          return $quizService.getQuiz()
        }
    }
  })

  .state('quizUI', {
    url: '/quizUI',
    templateUrl: 'templates/quizUI2.html',
    controller: 'QuizUICtrl'
  })

  .state('score2', {
    url: '/score2',
    templateUrl: 'templates/score2.html',
    controller: 'Score2Ctrl'
  })

})


.run(function($ionicPlatform, $cordovaStatusbar) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      //Change status bar color to white
      $cordovaStatusbar.styleHex('#FFFFFF') //red
    }

  });
})

;
