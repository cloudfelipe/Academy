function Quiz(idQ) {

  this.id = idQ;
  this.correctAnswers = 0;
  this.wrongAnswers = 0;
  this.counter = 1;
  this.questions = [];
  this.currentQuestion = 0;

  this.launch = function() {
    alert("Se creo un quiz");
  }

  this.getCounter = function(){
  	return this.counter ++;
  }
}