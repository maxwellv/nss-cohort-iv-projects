(function(){
  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $('#start-game').click(startGame);
    $('#reset-game').click(resetGame);
    $('#grid td').click(guess);
  }
  var gameStarted = false;
  function startGame(){
    if (gameStarted){
      alert('The game has already been started. Click \"Reset Game\" if you would like to start over.');
      return;
    }
    gameStarted = true;
    populateLocations();
    alert('Game started.');
  }

  var locations = {};
  function populateLocations(){
    var alph = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var letters = '';
    for (var x = 0;x < 10;x++){
      var randomChar = Math.floor(Math.random() * alph.length);
      letters = letters + alph[randomChar];
      alph = alph.slice(0, randomChar) + alph.slice(randomChar + 1, alph.length);
    }
    letters = letters + letters;
    for (var y = 0; y < 20; y++){
      var randomChar2 = Math.floor(Math.random() * letters.length);
      locations['space' + y] = letters[randomChar2];
      letters = letters.slice(0, randomChar2) + letters.slice(randomChar2 + 1, letters.length);
    }
  }

  var lastGuess = null;
  var moves = 0;
  var gameWon = false;
  function guess(){
    if (!gameStarted){
      alert('Game not started.');
      return;
    } else if (gameWon){
      alert('You\'ve already won. Click \"Reset Game\" to play again.');
      return;
    }
    if (lastGuess === null){
      lastGuess = this.id;
      $(this).addClass('current');
      $(this).text(locations['space' + this.id]);
    } else if ($(this).hasClass('solved')){
      return;
    } else if (locations['space' + lastGuess] === locations['space' + this.id]){
      if (this.id === lastGuess){
        return; //the player decided to be tricky by clicking on
      }         //the same space he clicked last turn
      $(this).text(locations['space' + this.id]);
      $(this).removeClass('current');
      $(this).addClass('solved');
      $('#' + lastGuess).removeClass('current');
      $('#' + lastGuess).addClass('solved');
      lastGuess = null;
    } else {
      $('#' + lastGuess).removeClass('current');
      if (!($('#' + lastGuess).hasClass('solved'))){
        $('#' + lastGuess).text('');
      }
      $(this).addClass('current');
      $(this).text(locations['space' + this.id]);
      $(this).show();
      lastGuess = this.id;
    }
    moves++;
    winCheck();
  }

  function winCheck(){
    var win = true;
    for (var z = 0;z < 20;z++){
      if (!($('#' + z).hasClass('solved'))){
        win = false;
      }
    }
    if (win){
      gameWon = true;
      alert('Congratulations, you won! You won in ' + moves + ' moves. Click \"Reset Game\" to play again.');
    }
  }

  function resetGame(){
    gameStarted = false;
    locations = {};
    lastGuess = null;
    moves = 0;
    gameWon = false;
    for (var w = 0;w < 20;w++){
      $('#' + w).removeClass('current');
      $('#' + w).removeClass('solved');
      $('#' + w).text('');
    }
    alert('Game reset. Click \"Start Game\" to start a new game.');
  }
})();
