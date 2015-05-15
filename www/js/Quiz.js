function Quiz(id) {

  this.id = id;
  this.correctAnswers = 0;
  this.wrongAnswers = 0;
  this.questions = [];
  this.currentQuestions = 0;

  this.launch = function() {
    alert("Se creo un quiz");
  }
}