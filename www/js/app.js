// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/')

  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'home.html'
  })
  /**
  $stateProvider
  .state('question', {
    url: '/',
    templateUrl: 'question2.html'
  })**/

  $stateProvider
  .state('todos', {
    url: '/todos',
    templateUrl: 'todos.html',
    controller: 'TodosCtrl'
  })

  .state('detail', {
    url: '/todos/:todo',
    templateUrl: 'todo.html',
    controller: 'TodoCtrl',
    resolve: {
      todo: function($stateParams, TodosService) {
        return TodosService.getTodo($stateParams.todo)
      }
    }
  })

  $stateProvider.state('score', {
    url: '/score',
    templateUrl: 'score.html',
    controller: 'ScoreCtrl'
  })

  .state('questionIndex', {
    cache: false,
    url: '/questions/:todo',
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

/**
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
      alert(index);
      return questions[index]
    }
  }
})
**/

.factory('findSamplesFactory', function($http) {


  /**
  var factory = {};
  factory.getSamples = function() {
    return $http.get('resorces/questions/quiz1.json');
  };
  return factory;

  **/

  alert("Ejecute quizservice1");

  var quiz = new Quiz(1);

  quiz.questions = $http.get('resorces/questions/quiz1.json').success(function(data) {
    alert("Ejecute quizservice2");
          return data;
  });

  return quiz;

})

.factory('quizFactory', ["id", function(id) {
  return new Quiz(id);
}])

.factory('QuestionsService2', function($http, findSamplesFactory) {

  alert("ejecute questionService");



  /**
  var questions1 =  $http.get('resorces/questions/quiz1.json').success(function(data) {
          // you can do some processing here
          alert(data);
          return data;
  });  
  

  findSamplesFactory.getSamples().then(function(data){
        questions = data.data;
        alert(data.data);
  });

  **/

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

  var contador = 1;
  var correctAnswerss = 0;

  return {
    questions: questions,
    getQuestion: function(index) {
      //contador++;
      return questions[index]
    },
    getConter: function(d){
      return contador++;
    },
    addCorrectAnswer: function(){
       correctAnswerss++;
    },
    getCorrectAnswersCount: function(){
      return correctAnswerss;
    },

  };
})

.factory('TodosService', function() {
  var todos = [
      {title: "Take out the trash", done: true},
      {title: "Do laundry", done: false},
      {title: "Start cooking dinner", done: false}
   ]

  return {
    todos: todos,
    getTodo: function(index) {
      return todos[index]
    }
  }
})


//Def controllers

.controller('TodosCtrl', function($scope, TodosService) {
  $scope.todos = TodosService.todos
})

.controller('TodoCtrl', function($scope, todo) {
  $scope.todo = todo
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

/**
* $ionicNavBarDelegate: NavigationBar's delegate, to change the navigation title 
**/
.controller('Question2Ctrl', function($scope, todo, QuestionsService2, $ionicNavBarDelegate, $state){

  $scope.showstartCard = false;

  var currentCount = QuestionsService2.getConter();
  $scope.countIntoTitle = "" + (currentCount) + " of " + QuestionsService2.questions.length;

  /**
  $scope.setNavTitle = function(title) {
    $ionicNavBarDelegate.title("" + (currentCount) + " of " + QuestionsService2.questions.length);
  }
  **/

  $scope.questionIndex = currentCount;

  $scope.item = todo;



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
    var cos = $scope.item.correctAnswer;

    if (index == cos) {
      QuestionsService2.addCorrectAnswer();
      element.state = "great";
    }else{
      element.state = "bad";
      $scope.item.answers[cos].state = "great";
    };

    $scope.showstartCard = true;

  }

  $scope.nextQuestion = function(questionIndex){

    if (QuestionsService2.questions.length < questionIndex +1) {
      $state.go('score');
    }else{
      $state.go('questionIndex', {todo: questionIndex});
    }

    
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

.controller('ScoreCtrl', function($scope, QuestionsService2, $state, $ionicHistory){

  var correctAnswers = QuestionsService2.getCorrectAnswersCount();
  var totalQuestions = QuestionsService2.questions.length;

  $scope.correctQuestions = correctAnswers;
  $scope.wrongQuestions = totalQuestions - correctAnswers;

  $scope.totalScore = "" + correctAnswers + "/" + totalQuestions;

  $scope.finishQuiz = function(){
    $ionicHistory.goBack(-100);
    $ionicHistory.clearCache();
  }



})



;
