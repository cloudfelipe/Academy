// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngResource', 'ngCordova', 'angular-svg-round-progress'])

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  //Disable swipe to go back
  $ionicConfigProvider.views.swipeBackEnabled(false);

  $urlRouterProvider.otherwise('/quizzes/quiz')

  $stateProvider

  .state('quizzes', {
    url: '/quizzes',
    templateUrl: 'quizzes.html',
    controller: 'QuizzesCtrl'
  })

  .state('quiz', {
    url: '/quizzes/quiz',
    cache: false,
    templateUrl: 'quizHome.html',
    controller: 'QuizHomeCtrl',
    // resolve: {
    //     newQuiz: function(quizService) {
    //       return quizService.newQuiz();
    //     }
    // }
  })

  .state('quizAtIndex', {
    url: '/quizzes/quiz:idQuiz/question:idQuestion',
    templateUrl: 'quiz.html',
    cache: false,
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
    cache: false,
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
    templateUrl: 'quizUI2.html',
    controller: 'QuizUICtrl'
  })

  .state('score2', {
    url: '/score2',
    templateUrl: 'score2.html',
    controller: 'Score2Ctrl'
  })

})




.run(function($ionicPlatform, $cordovaStatusbar, localstorage) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      //StatusBar.styleDefault();
      $cordovaStatusbar.styleHex('#FFFFFF') //red
    }

    

    //$cordovaStatusbar.overlaysWebView(true);
    //$cordovaStatusBar.style(1); //Light



    //Create local file in the first ejecution
    //localstorage.setObject('myQuiz', '');

  });
})

//Def factories

.factory("quizzesProvider", function ($resource) {
  return $resource('resources/questions/quiz1.json', {}, 
    { 
      get: { method: "GET", isArray: true },

    })
})

.factory('localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    removeItem: function(key){
      return $window.localStorage.removeItem(key);
      //return localStorage.clear();
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || null);
    }
  }
}])

.factory("quizService", function (quizzesProvider, localstorage) {
  
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
  var quizzesCount = 0;

  return {
    questions : questions,
    newQuiz: function(idQ) {

      //Generate random questions and set into the new quiz
      var arrayIndexes = []; 
      var newQuestions = [];
      var items = ["a","e","i","o","u"];

      while(newQuestions.length < 5){
        var randomElement = Math.floor(Math.random()*questions.length);

        if(arrayIndexes.indexOf(randomElement)==-1){
          //"element doesn't exist"
          arrayIndexes.push(randomElement);
          newQuestions.push(questions[randomElement]);
        }
      }

      //Create a new quiz
      myQuiz = new Quiz(quizzesCount++);
      myQuiz.questions = newQuestions;


      //Save quiz locally
      this.saveQuizState();

      return myQuiz;
    },
    resumeQuiz: function(currentQ){

      myQuiz = currentQ;

      return myQuiz;

    },
    getQuiz: function() {
      return myQuiz;
    },
    getQuestion: function(index) {
      return myQuiz.questions[index]
    },
    saveQuizState: function(){
      return localstorage.setObject('myQuiz', myQuiz);
    },
    cleanQuizState: function(){
      //return localstorage.setObject('myQuiz', "");
      return localstorage.removeItem('myQuiz');
    },
    restart: function(){
      questions = quizzesProvider.get();
      quizzesCount = 0;
      myQuiz = null;
      return
    }



  };

})



//Def Controllers

.controller('QuizzesCtrl', function($scope, quizService) {
  $scope.quizzes = [1,3];

})

.controller('QuizHomeCtrl', function($scope, $state, quizService, localstorage) {

  //var myq = newQuiz;
  //alert("2da");

  //$scope.quizId = myq.id;
  $scope.title = "Home Screen"; //parseInt(myq.id) +  1;
  //$scope.showResumeButton = false;
  //$scope.questions = myq.questions;


  var currentQuiz = localstorage.getObject('myQuiz');
  console.log(currentQuiz);

  //Exist previous quiz
  if(!angular.equals(currentQuiz, null)) {
    $scope.newQuizBtnDisabled = true;
    $scope.showResumeButton = true;
  }

  $scope.commenceQuiz = function(){

    var myq = quizService.newQuiz();

    //Start Quiz with question 1
    $state.go('quizAtIndex', {idQuiz: myq.id, idQuestion: 0});

  }

  $scope.resumeQuiz = function(){

    quizService.resumeQuiz(currentQuiz);

    $state.go('quizAtIndex', {idQuiz: currentQuiz.id, idQuestion: currentQuiz.currentQuestion});
  }
  
  
})

.controller('QuizCtrl', function($scope, quizService, question, myQuiz, $state, $cordovaDialogs, localstorage, $ionicHistory) {

  var post = localstorage.getObject('myQuiz');
  console.log(post);

  myQuiz.currentQuestion++;

  var currentCount = myQuiz.currentQuestion;

  $scope.showNextbutton = false;

  $scope.countIntoTitle = "" + (currentCount) + " of " + myQuiz.questions.length;

  $scope.questionIndex = currentCount;

  $scope.item = question;

  //------ Methods ------------------//

  $scope.selectAnswer = function(index, element) {

    var correctAnswer = question.correctAnswer;

    if ($scope.showNextbutton) {return};

    //myQuiz.currentQuestion++;

    if (index == correctAnswer) {
      myQuiz.correctAnswers++;
      element.state = "great";
    }else{
      element.state = "bad";
      myQuiz.wrongAnswers++;
      question.answers[correctAnswer].state = "great";
    };

    //$scope.questionBtnDisabled = true;

    //Save the new quiz state
    quizService.saveQuizState();

    //Show next button
    $scope.showNextbutton = true;

  }

  $scope.nextQuestion = function(questionIndex){

    if (myQuiz.questions.length < questionIndex +1) {
      $state.go('score');
    }else{
      $state.go('quizAtIndex', {idQuiz: myQuiz.id, idQuestion: questionIndex});
    }

  }

  $scope.confirmQuit = function(){
    $cordovaDialogs.confirm('Are you sure?', 'Quit Quiz', ['Yes','No'])
      .then(function(buttonIndex) {
        // no button = 0, 'OK' = 1, 'Cancel' = 2
        if (buttonIndex == 1) {
          //Clean current quiz locally
          quizService.cleanQuizState();
          quizService.restart();

          //To go to first view
          $ionicHistory.goBack(-100);
          $ionicHistory.clearCache();

        };

      }
    );
  }

})

.controller('ScoreCtrl', function($scope, quizService, myQuiz, $state, $ionicHistory, roundProgressService){

  var correctAnswers = myQuiz.correctAnswers;
  var totalQuestions = myQuiz.questions.length;

  $scope.correctQuestions = correctAnswers;
  $scope.wrongQuestions = myQuiz.wrongAnswers;
  $scope.totalQuestions = totalQuestions;

  $scope.totalScore = "" + correctAnswers + "/" + totalQuestions;


  //Prepare progress bar information
  $scope.current =        27;
  $scope.max =            50;
  $scope.uploadCurrent =  0;
  $scope.stroke =         9;
  $scope.radius =         66;
  $scope.isSemi =         false;
  $scope.rounded =        false;
  $scope.clockwise =      true;
  $scope.currentColor =   '#45ccce';
  $scope.bgColor =        '#b9bbbd';
  $scope.iterations =     50;
  $scope.currentAnimation = 'easeOutQuad';
  $scope.animations = [];
  angular.forEach(roundProgressService.animations, function(value, key){
      $scope.animations.push(key);
  });

  $scope.getFontSize = function(){
    return "60px";
    //return $scope.radius/($scope.isSemi ? 3.5 : 3) + 'px';
  };


  //Clean current quiz locally
  quizService.cleanQuizState();
  quizService.restart();

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



  var items = ["a","e","i","o","u"];
  var arrayIndexes = []; 
  var newQuestions = [];

  while(newQuestions.length < 3){
    var randomElement = Math.floor(Math.random()*questions.length);

    if(arrayIndexes.indexOf(randomElement)==-1){
      //alert("element doesn't exist");
      arrayIndexes.push(randomElement);
      newQuestions.push(questions[randomElement]);
    }
  }

  //alert(arrayIndexes);
  //alert(newQuestions);


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

.controller('Score2Ctrl', function($scope, roundProgressService){

  $scope.current =        27;
  $scope.max =            50;
  $scope.uploadCurrent =  0;
  $scope.stroke =         6;
  $scope.radius =         65;
  $scope.isSemi =         false;
  $scope.rounded =        false;
  $scope.clockwise =      true;
  $scope.currentColor =   '#45ccce';
  $scope.bgColor =        '#b9bbbd';
  $scope.iterations =     50;
  $scope.currentAnimation = 'easeOutQuad';

  $scope.animations = [];

  angular.forEach(roundProgressService.animations, function(value, key){
      $scope.animations.push(key);
  });

  $scope.getFontSize = function(){
      return $scope.radius/($scope.isSemi ? 3.5 : 3) + 'px';
  };


})

;
