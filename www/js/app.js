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
    templateUrl: 'quizHome.html',
    controller: 'QuizHomeCtrl',
    resolve: {
        newQuiz: function($stateParams, quizService) {
          return quizService.newQuiz($stateParams.idQuiz)
        }
    }
  })

  .state('quizAtIndex', {
    url: '/quizzes/quiz:idQuiz/question:idQuestion',
    templateUrl: 'quiz.html',
    controller: 'QuizCtrl',
    resolve: {
        question: function($stateParams, quizService) {
          return quizService.getQuiz().questions[$stateParams.idQuestion]
        },
        myQuiz: function(quizService) {
          return quizService.getQuiz()
        }
    }
  })

  .state('score', {
    url: '/score',
    templateUrl: 'score.html',
    controller: 'ScoreCtrl',
    resolve: {
        myQuiz: function(quizService) {
          return quizService.getQuiz()
        }
    }
  })

  .state('quizUI', {
    url: '/quizUI',
    templateUrl: 'quizUI.html',
    controller: 'QuizUICtrl'
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


  /**
  var questions = [

  {
    "questionText": "A woman with essential hypertension presents at 6 weeks gestation. Which of the following anti-hypertensive medications would NOT be appropriate for her to take in pregnancy?",
    "answers": [
      {"keyName": "A", "answerText":"ACE inhibitor, eg, Enalapril", "state":"normal"},
      {"keyName": "B", "answerText":"Methyldopa", "state":"normal"},
      {"keyName": "C", "answerText":"Beta-blocker", "state":"normal"},
      {"keyName": "D", "answerText":"Calcium channel blocker, eg, Nifedipine", "state":"normal"},
      {"keyName": "E", "answerText":"All of the above would be appropriate for use in pregnancy", "state":"normal"},
    ],
    "correctAnswer": 0
  },
  {
    "questionText": "What are potential complications of ACE inhibitor use in pregnancy?",
    "answers": [
      {"keyName": "A", "answerText":"Cardiovascular and neurological malformations", "state":"normal"},
      {"keyName": "B", "answerText":"Cardiovascular and neurological malformations", "state":"normal"},
      {"keyName": "C", "answerText":"Decreased skull ossification, hypocalvaria and renal tubular dysgenesis", "state":"normal"},
      {"keyName": "D", "answerText":"Fetal death", "state":"normal"},
      {"keyName": "E", "answerText":"All of the above", "state":"normal"},
    ],
    "correctAnswer": 4
  },
  {
    "questionText": "Side effects of Methyldopa include which of the following?",
    "answers": [
      {"keyName": "A", "answerText":"Depression", "state":"normal"},
      {"keyName": "B", "answerText":"Postural hypotension", "state":"normal"},
      {"keyName": "C", "answerText":"Sedation", "state":"normal"},
      {"keyName": "D", "answerText":"Liver function test abnormalities", "state":"normal"},
      {"keyName": "E", "answerText":"All of the above", "state":"normal"},
    ],
    "correctAnswer": 4
  },
  {
    "questionText": "At what mean arterial pressure does a loss of cerebral autoregulation occur?",
    "answers": [
      {"keyName": "A", "answerText":"130", "state":"normal"},
      {"keyName": "B", "answerText":"140", "state":"normal"},
      {"keyName": "C", "answerText":"150", "state":"normal"},
      {"keyName": "D", "answerText":"160", "state":"normal"},
      {"keyName": "E", "answerText":"170", "state":"normal"},
    ],
    "correctAnswer": 3
  }


  ]

  **/

  var myQuiz;

  return {
    questions : questions,
    newQuiz: function(idQ) {
      myQuiz = new Quiz(idQ);
      myQuiz.questions = questions;
      return myQuiz;
    },
    getQuiz: function() {
      return myQuiz;
    },
    getQuestion: function(index) {
      return myQuiz.questions[index]
    }
  };

})


//Def Controllers

.controller('QuizzesCtrl', function($scope) {
  $scope.quizzes = [1,2,3,4,5];
})

.controller('QuizHomeCtrl', function($scope, quizService, newQuiz) {

  var myq = newQuiz;

  $scope.quizId = myq.id;
  $scope.title = parseInt(myq.id) +  1;
  $scope.questions = myq.questions;

  if(myq.currentQuestion > 0) {
    $scope.showResumeButton = true;
  }
  
  
})

.controller('QuizCtrl', function($scope, question, myQuiz, $state) {

  var currentCount = myQuiz.getCounter();

  $scope.showNextbutton = false;

  $scope.countIntoTitle = "" + (currentCount) + " of " + myQuiz.questions.length;

  $scope.questionIndex = currentCount;

  $scope.item = question;

  //Methods
  $scope.selectAnswer = function(index, element) {

    var correctAnswer = question.correctAnswer;
    myQuiz.currentQuestion++;

    if (index == correctAnswer) {
      myQuiz.correctAnswers++;
      element.state = "great";
    }else{
      element.state = "bad";
      myQuiz.wrongAnswers++;
      question.answers[correctAnswer].state = "great";
    };

    $scope.showNextbutton = true;

  }

  $scope.nextQuestion = function(questionIndex){

    if (myQuiz.questions.length < questionIndex +1) {
      $state.go('score');
    }else{
      $state.go('quizAtIndex', {idQuiz: myQuiz.id, idQuestion: questionIndex});

    }

  }

})

.controller('ScoreCtrl', function($scope, myQuiz, $state, $ionicHistory){

  var correctAnswers = myQuiz.correctAnswers;
  var totalQuestions = myQuiz.questions.length;

  $scope.correctQuestions = correctAnswers;
  $scope.wrongQuestions = myQuiz.wrongAnswers;

  $scope.totalScore = "" + correctAnswers + "/" + totalQuestions;

  $scope.finishQuiz = function(){
    $ionicHistory.goBack(-100);
    $ionicHistory.clearCache();
  }

})


//Testing

.controller('QuizUICtrl', function($scope) {

  var currentCount = 2;

  $scope.showNextbutton = false;

  $scope.countIntoTitle = "" + (currentCount) + " of " + 12;

  $scope.questionIndex = currentCount;

  $scope.item = {
    "questionText": "A woman with essential hypertension presents at 6 weeks gestation. Which of the following anti-hypertensive medications would NOT be appropriate for her to take in pregnancy?",
    "answers": [
      {"keyName": "A", "answerText":"ACE inhibitor, eg, Enalapril", "state":"normal"},
      {"keyName": "B", "answerText":"Methyldopa", "state":"normal"},
      {"keyName": "C", "answerText":"Beta-blocker", "state":"normal"},
      {"keyName": "D", "answerText":"Calcium channel blocker, eg, Nifedipine", "state":"normal"},
      {"keyName": "E", "answerText":"All of the above would be appropriate for use in pregnancy", "state":"normal"},
    ],
    "correctAnswer": 0
  };

  $scope.texto = "All of the above would be appropriate for use in pregnancy";

  //Methods
  $scope.selectAnswer = function(index, element) {

    element.state = "bad";

    // var correctAnswer = question.correctAnswer;
    // myQuiz.currentQuestion++;

    // if (index == correctAnswer) {
    //   myQuiz.correctAnswers++;
    //   element.state = "great";
    // }else{
    //   element.state = "bad";
    //   myQuiz.wrongAnswers++;
    //   question.answers[correctAnswer].state = "great";
    // };

    // $scope.showNextbutton = true;

  }

  $scope.nextQuestion = function(questionIndex){

    // if (myQuiz.questions.length < questionIndex +1) {
    //   $state.go('score');
    // }else{
    //   $state.go('quizAtIndex', {idQuiz: myQuiz.id, idQuestion: questionIndex});

    // }

  }

})

;
