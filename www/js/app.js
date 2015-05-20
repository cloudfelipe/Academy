// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngResource'])

.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/quizzes')

  $stateProvider

  .state('quizzes', {
    url: '/quizzes',
    templateUrl: 'quizzes.html',
    controller: 'QuizzesCtrl'
  })

  .state('quiz', {
    url: '/quizzes/quiz:idQuiz',
    templateUrl: 'quiz.html',
    controller: 'QuizCtrl'
  })

})




.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

//Def factories

.factory("quizzesProvider", function ($resource) {
  return $resource('resorces/questions/quiz1.json', {}, 
    { 
      get: { method: "GET", isArray: true },

    })
})

.factory("quizService", function (quizzesProvider) {
  var questions = quizzesProvider.get();

  return {
    questions : questions,
    getQuestion: function(index) {
      return jsonQuestions[index]
    },
  };

})


//Def Controllers

.controller('QuizzesCtrl', function($scope) {
  $scope.quizzes = [1,2,3,4,5];
})

.controller('QuizCtrl', function($scope, quizService) {
  $scope.questions = quizService.questions;
})

;
