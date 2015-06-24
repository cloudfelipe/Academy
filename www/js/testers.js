angular.module('testers', [])
 
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

.controller('Score2Ctrl', function($scope, roundProgressService, $ionicScrollDelegate){

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

  $ionicScrollDelegate.resize();

  $scope.getFontSize = function(){
      return $scope.radius/($scope.isSemi ? 3.5 : 3) + 'px';
  };


})

;