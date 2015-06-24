angular.module('controllers', ['services'])
 
 //Controller for Home view
.controller('QuizHomeCtrl', function($scope, $state, $quizService, $localstorage) {

  //Set title view. Default empty
  $scope.title = "";

  var currentQuiz = $localstorage.getObject('myQuiz');
  console.log(currentQuiz);

  //Check if exist previous quiz
  if(!angular.equals(currentQuiz, null)) {
  	//Disable new quiz btn 
    $scope.newQuizBtnDisabled = true;

    //Show resume btn
    $scope.showResumeButton = true;
  }

  //Function for start a new quiz
  $scope.commenceQuiz = function(){

    var myq = $quizService.newQuiz(); //Crear a new quiz

    //Start Quiz into the question 1
    $state.go('quizAtIndex', {idQuiz: myq.id, idQuestion: 0});

  }

  //Function for resume a previous quiz
  $scope.resumeQuiz = function(){

    $quizService.resumeQuiz(currentQuiz);

    $state.go('quizAtIndex', {idQuiz: currentQuiz.id, idQuestion: currentQuiz.currentQuestion});
  }
   
})

//Controller for Quiz view
.controller('QuizCtrl', function($scope, $quizService, $state, $cordovaDialogs, $localstorage, $ionicHistory, question, myQuiz) {

  var post = $localstorage.getObject('myQuiz');
  console.log(post);

  myQuiz.currentQuestion++;

  var currentCount = myQuiz.currentQuestion;

  $scope.showNextbutton = false;

  $scope.countIntoTitle = "" + (currentCount) + " of " + myQuiz.questions.length;

  $scope.questionIndex = currentCount;

  $scope.item = question;

  //------ Functions ------------------//

  $scope.selectAnswer = function(index, element) {

    var correctAnswer = question.correctAnswer;

    if ($scope.showNextbutton) {return};

    if (index == correctAnswer) {
      myQuiz.correctAnswers++;
      element.state = "great";
    }else{
      element.state = "bad";
      myQuiz.wrongAnswers++;
      question.answers[correctAnswer].state = "great";
    };

    //Save the new quiz state
    $quizService.saveQuizState();

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

  //Confirm to finish a quiz
  $scope.confirmQuit = function(){
    $cordovaDialogs.confirm('Are you sure?', 'Quit Quiz', ['Yes','No'])
      .then(function(buttonIndex) {
        // no button = 0, 'OK' = 1, 'Cancel' = 2
        if (buttonIndex == 1) {
          //Clean current quiz locally
          $quizService.cleanQuizState();
          $quizService.restart();

          //To go to first view
          $ionicHistory.goBack(-100);
          $ionicHistory.clearCache();

        };

      }
    );
  }

})

//Controler for Score view
.controller('ScoreCtrl', function($scope, $quizService, myQuiz, $state, $ionicHistory, roundProgressService){

	//Set title view
	$scope.title = "SCORE";

	//Get the quiz scores
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
	};

	//Clean current quiz locally
	$quizService.cleanQuizState();
	$quizService.restart();

	$scope.finishQuiz = function(){
	  $ionicHistory.goBack(-100);
	  $ionicHistory.clearCache();
	  
	}

})


;