// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/')

  $stateProvider.state('home', {
    url: '/home',
    templateUrl: 'home.html'
  })

  $stateProvider
  .state('question', {
    url: '/',
    templateUrl: 'question2.html'
  })

  $stateProvider
  .state('index', {
    url: '/home2',
    templateUrl: 'todos.html'
  })

  .state('question.detail', {
    url: '/:todo',
    templateUrl: 'question2.html',
    controller: 'Question2Ctrl',
    resolve: {
        todo: function($stateParams, QuestionsService2) {
          return QuestionsService2.getQuestion($stateParams.todo)
        }
    }
  });

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
.factory('QuestionsService', function() {
  var questions = [
      { "questionText": "A woman with essential hypertension presents at 6 weeks gestation. Which of the following anti-hypertensive medications would NOT be appropriate for her to take in pregnancy?", 
      "answerA": "ACE inhibitor, eg, Enalapril", 
      "answerB": "Methyldopa", 
      "answerC": "Beta-blocker", 
      "answerD": "Calcium channel blocker, eg, Nifedipine",
      "answerE": "All of the above would be appropriate for use in pregnancy",  
      "correctAnswer" : "A" },

      { "questionText": "What are potential complications of ACE inhibitor use in pregnancy?", 
      "answerA": "Cardiovascular and neurological malformations", 
      "answerB": "Oligohydramnios, renal failure and fetal hypotension", 
      "answerC": "Decreased skull ossification, hypocalvaria and renal tubular dysgenesis", 
      "answerD": "Fetal death",
      "answerE": "All of the above",  
      "correctAnswer" : "E" },

      { "questionText": "Side effects of Methyldopa include which of the following?", 
      "answerA": "Depression", 
      "answerB": "Postural hypotension", 
      "answerC": "Sedation", 
      "answerD": "Liver function test abnormalities",
      "answerE": "All of the above",  
      "correctAnswer" : "E" },

      { "questionText": "At what mean arterial pressure does a loss of cerebral autoregulation occur?", 
      "answerA": "130", 
      "answerB": "140", 
      "answerC": "150", 
      "answerD": "160", 
      "answerE": "170",  
      "correctAnswer" : "C" }
      
   ]

  return {
    questions: questions,
    getQuestion: function(index) {
      return questions[index]
    }
  }
})

.factory('QuestionsService2', function() {
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

  return {
    questions: questions,
    getQuestion: function(index) {
      return questions[index]
    }
  }
})


//Def controllers

.controller('TodosCtrl', function($scope) {
  $scope.todos = [
      {title: "Take out the trash", done: true},
      {title: "Do laundry", done: true},
      {title: "Start cooking dinner", done: false}
   ]
})


.controller('QuestionCtrl', function($scope){

  $scope.item = { "questionText": "A woman with essential hypertension presents at 6 weeks gestation. Which of the following anti-hypertensive medications would NOT be appropriate for her to take in pregnancy?", 
    "answerA": "ACE inhibitor, eg, Enalapril", 
    "answerB": "Methyldopa", 
    "answerC": "Beta-blocker", 
    "answerD": "Calcium channel blocker, eg, Nifedipine",
    "answerE": "All of the above would be apprancy",  
    "correctAnswer" : "A" }

  $scope.item2 = 
  {
    "questionText": "At what mean arterial pressure does a loss of cerebral autoregulation occur?",
    "answers": [
      "1",
      "2",
      "3"
    ],
    "correctAnswer": "1"
  };

  $scope.greeting = 'Hola!';

  $scope.normal = true;

  $scope.push = function(name) {
        if($scope.item.correctAnswer == name){
          $scope.spice = "Sisas!";
          $scope.normal = false;
        }else{
          $scope.spice = "nope";
        }
  };

})


.controller('Question2Ctrl', function($scope, QuestionsService2){

  $scope.item2 = QuestionsService2.questions;



  $scope.push = function(index, element) {
    /**
    var keyName = "";
    switch(index) {
        case 0:
            keyName = "A";
            break;
        case 1:
            keyName = "B";
            break;
        case 2:
            keyName = "C";
            break;
        case 3:
            ckeyName = "D";
            break;
        case 4:
            keyName = "E";
            break;
      return keyName;
    }
    **/
    var cos = $scope.item2.correctAnswer;

    if (index == cos) {
      element.state = "great";
    }else{
      element.state = "bad";
      $scope.item2.answers[cos].state = "great";
    };

  }

  //not working :(
  $scope.getKeyByIndex = function (anIndex){
    var keyName = "";
    switch(anIndex) {
        case 0:
            keyName = "A";
            break;
        case 1:
            keyName = "B";
            break;
        case 2:
            keyName = "C";
            break;
        case 3:
            ckeyName = "D";
            break;
        case 4:
            keyName = "E";
            break;
      return keyName;
    }
  };
})





;
