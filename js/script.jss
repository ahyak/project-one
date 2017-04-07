var exposeTime = 1000

// create an object array with all images used in the game
var animals = [
  { name: 'Maroon Giraffe', image: '<img src="giraffe/imgbk/maroon-giraffe.jpg" alt="maroon-giraffe">'},
  { name: 'Yellow Giraffe', image: '<img src="giraffe/imgbk/yellow-giraffe.jpg" alt="yellow-giraffe">'},
  { name: 'Orange Giraffe', image: '<img src="giraffe/imgbk/orange-giraffe.jpg" alt="orange-giraffe">' },
  { name: 'Neutral Giraffe', image: '<img src="giraffe/imgbk/neutral-giraffe.jpg" alt="neutral-giraffe">'},
  { name: 'Redbrown Giraffee', image: '<img src="giraffe/imgbk/redbrown-giraffe.jpg" alt="redbrown-giraffe">'},
  { name: 'Brown Giraffee', image: '<img src="giraffe/imgbk/brown-giraffe.jpg" alt="brown-giraffe">'}
];

// double the animals
animals = animals.concat(animals);

//setting game players (two players)
var game = {
  player1: {time: "", name: "player1"},
  player2: {time: "", name: "player2"}
}
var currentPlayer = game.player1
var matches = 0; //checks number of matches
var cardSelected = null;
var $cards = null
var $faceup = null
var $facedown = null
var myInterval = null

// $('.scoreboard').append('<h1>player1</h1>')
// $('.scoreboard').append('<h1>player2</h1>')
// setTimeout(function(){
        // console.log(cardSelected)
      // },1000)

//activating clicks on cards function
function activateCards() {
  $cards.not('.matched').on('click', function(){
    $(this).toggleClass('backside')
    // console.log($(this).find("img").attr('src'));
    if (!cardSelected) {
      cardSelected = $(this)
      $(this).off()
      console.log(cardSelected)
    } else {
      deactivateCards()
      var matched = (cardSelected.find("img").attr('src') == $(this).find("img").attr('src'))
      // console.log(cardSelected.find("img").attr('src') == $(this).find("img").attr('src'));
        if (matched) {
          // cardSelected.animate({opacity:0.5})
          cardSelected.addClass("matched")
          // $(this).animate({opacity:0.5})
          $(this).addClass("matched")
          activateCards()
          matches++;
          checkMatchingCards(myInterval)
        } else {
          var secondCard = $(this)
          console.log(secondCard);
            $(cardSelected).addClass('backside')
            $(this).addClass('backside')
            setTimeout(function(){
              // console.log(cardSelected + "removing class")
              // $(cardSelected).removeClass('backside')
              // secondCard.removeClass('backside')
              $('.backside').not('.matched').removeClass('backside')
              activateCards()
              // console.log(secondCard)
            }, exposeTime)
            // $(this).removeClass('backside')
          console.log("Sorry! Try again!");
      }
        cardSelected = null
    }
  });

}

function deactivateCards() {
  $cards.off()
}


//start time +game using start button
var time = 0;

function startRound() {
  $('#board').empty()
  shuffleArray(animals);

  for (var i = 0; i < animals.length; i++) {
    $('#board').append('<div class="card">' + animals[i].image + '</div>')
  }

  $cards = $('.card')
  // $faceup = $('.frontside')
  $facedown = $('.backside')

  myInterval = setInterval(function() {
    $('.timer').text(++time + ' Seconds');
  }, 1000);
  // $('.p1-score').innerText = 'Player 1 Score: ' + time
  activateCards()
  checkMatchingCards(myInterval)
}

$('.start-game').one('click', startRound);// to stop the time--clearInterval(myInterval);

function checkMatchingCards(func) {
  if(matches == 6){
    currentPlayer.time = time
    console.log(currentPlayer);
    console.log(currentPlayer.time);
    console.log('time is over!');
    clearInterval(func);
    switchPlayers();
  }
};

//create a function to switch between players
function switchPlayers() {
  setTimeout(function() {
  $cards.removeClass('backside')
  $cards.removeClass('matched')
  $cards.off();
  }, exposeTime)
    if (currentPlayer == game.player1) {
      currentPlayer = game.player2
    } else {
      checkWinner();
      currentPlayer = game.player1
    }
    $('.start-game').html(currentPlayer.name)
    $('.start-game').one('click', startRound);
  matches = 0
  time = 0
};

function checkWinner(){
  if (game.player1.time > game.player2.time){
    alert('player 2 wins!')
  }else if (game.player1.time === game.player2.time){
    alert('it\'s a tie!')
  } else {
    alert("player 1 wins!")
  }
};


//create a function to randomly shuffle the images
function shuffleArray(array){
  var i = 0
  var j = 0
  temp = null

  for (i = array.length - 1 ;i>0; i = i -1) {
    j = Math.floor(Math.random()*(i + 1))
    temp = array [i]
    array[i] = array[j]
    array[j] = temp
  }
};
