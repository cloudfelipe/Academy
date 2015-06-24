angular.module('services', [])
 
.factory("$quizzesProvider", function ($resource) {
  return $resource('resources/questions/quiz1.json', {}, 
    { 
      get: { method: "GET", isArray: true },

    })
})

.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    removeItem: function(key){
      return $window.localStorage.removeItem(key);
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || null);
    }
  }
}])

.factory("$quizService", function ($quizzesProvider, $localstorage) {
  
  //Get questions from provider
  var questions = $quizzesProvider.get();
  
  //The current quizz 
  var myQuiz;

  //the initial quizz
  var quizzesCount = 0;

  return {
    questions : questions,
    newQuiz: function(idQ) {

      
      var arrayIndexes = []; 
      var newQuestions = [];

      //Generate random questions nonrepeated from Questions Array and set into the new quiz
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
      return $localstorage.setObject('myQuiz', myQuiz);
    },
    cleanQuizState: function(){
      //return $localstorage.setObject('myQuiz', "");
      return $localstorage.removeItem('myQuiz');
    },
    restart: function(){
      questions = $quizzesProvider.get();
      quizzesCount = 0;
      myQuiz = null;
      return
    }

  };

})

;