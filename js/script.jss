var exposeTime = 1000

// create an object array with all images used in the game
var animals = [
  { name: 'Maroon Giraffe', image: '<img src="giraffe/maroon-giraffe.jpg" alt="maroon-giraffe">'},
  { name: 'Yellow Giraffe', image: '<img src="giraffe/yellow-giraffe.jpg" alt="yellow-giraffe">'},
  { name: 'Orange Giraffe', image: '<img src="giraffe/orange-giraffe.jpg" alt="orange-giraffe">' },
  { name: 'Neutral Giraffe', image: '<img src="giraffe/neutral-giraffe.jpg" alt="neutral-giraffe">'},
  { name: 'Redbrown Giraffee', image: '<img src="giraffe/redbrown-giraffe.jpg" alt="redbrown-giraffe">'},
  { name: 'Brown Giraffee', image: '<img src="giraffe/brown-giraffe.jpg" alt="brown-giraffe">'}
];

// double the animals
animals = animals.concat(animals);

//create an empty array, and push 2 of each image
 // var selectedAnimals = [];
 //  for (i = 0; i < animals.length; i= i+1) {
 //   var listOfAnimals = animals[i].image
 //    selectedAnimals.push(listOfAnimals);
 //    selectedAnimals.push(listOfAnimals);
 //  }







var game = {
  player1: {time: "0", name: "player1"},
  player2: {time: "0", name: "player2"}
}
var currentPlayer = game.player1
var numFlipped = 0;
var firstCard;
var counter = 0;
var cardSelected = null;
var lastClicked =null;
var $cards = null
var $faceup = null
var $facedown = null
var myInterval = null

// $('.scoreboard').append('<h1>player1</h1>')
// $('.scoreboard').append('<h1>player2</h1>')







// $cards.on('click', function(){
//   console.log($(this).find("img").attr('src'))
//   if (!cardSelected) {
//     cardSelected = $(this).find("img").attr('src')
//   } else {
//     var matched = (cardSelected == $(this).find("img").attr('src'))
//       if (matched) {
//         var matchedDivs = $('img[src="' +cardSelected+'"]').parent()
//         matchedDivs.unbind('click');
//         matchedDivs.animate({opacity:0.5})
//         score++;
//       } else {
//         alert("Sorry! Try again!");
//     }

function activateCards() {
  $cards.not('.matched').on('click', function(){
    $(this).toggleClass('backside')
    console.log($(this).find("img").attr('src'));
    if (!cardSelected) {
      cardSelected = $(this)
      $(this).off()
      //.find("img").attr('src')
      // $(this).toggleClass('backside')
        // if (cardSelected.hasClass('backside')) {
          // $(this).unbind('click');
        // } else if(!cardSelected.hasClass('backside')) {
          // $(this).bind('click');
    } else {
      deactivateCards()
      var matched = (cardSelected.find("img").attr('src') == $(this).find("img").attr('src'))
      // console.log(cardSelected.find("img").attr('src') == $(this).find("img").attr('src'));

        if (matched) {

          // cardSelected !== $(this)
          // var matchedDivs = $('img[src="' +cardSelected+'"]').parent()
          // cardSelected.unbind('click');
          // cardSelected.animate({opacity:0.5})
          cardSelected.addClass("matched")
          // $(this).unbind('click');
          // $(this).animate({opacity:0.5})
          $(this).addClass("matched")
          activateCards()
          counter++;
          checkMatchingCards(myInterval)
        } else {
          var secondCard = $(this)
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

            // console.log($(cardSelected).removeClass('backside'));
            // $(this).removeClass('backside')
          console.log("Sorry! Try again!");
      }
      // setTimeout(function(){
        cardSelected = null
        console.log(cardSelected)
      // },1000)
    }

    // }
  });
}

function deactivateCards() {
  $cards.off()
}
// $($faceup).on('click', function() {
//   if (numFlipped < 2) {
//     // var currentCard = selectedAnimals.pop();
//     $(this).toggleClass("backside");
//     // $(this).html(currentCard);
//     numFlipped++;
//     $(this).unbind('click');
//       if (numFlipped == 0) {
//       firstCard = currentCard
//       console.log(firstCard)
//       } else {
//       firstCard == currentCard
//       console.log(firstCard == currentCard)
//       if (firstCard == currentCard) {
//         // console.log("Sucess! We have a match");
//         // $(this).fadeOut( "slow" );
//         // score++;
//       // }else {// success. we have a match. write code for that. .toggleClass('f')
//       //remove cells
//       //bind click back all other cells
//       // console.log("Sorry! Try again!")
//       // $(this).toggleClass("frontside");
//       }
//     }//close else
//   }//end of if statement
//   // $(this).unbind( "click" );
// });//end of click function


//start time using start button
var time = 0;
$('.start-game').on('click', function () {
  $('#board').empty()


  shuffleArray(animals);

  for (var i = 0; i < animals.length; i++) {
    $('#board').append('<div class="card">' + animals[i].image + '</div>')
  }

  $cards = $('.card')
  $faceup = $('.frontside')
  $facedown = $('.backside')

  myInterval = setInterval(function() {
    $('.timer').text(++time + ' Seconds');
  }, 1000);
  $('.p1-score').innerText = 'Player 1 Score: ' + time
  activateCards()
  checkMatchingCards(myInterval)
});// to stop the time--clearInterval(myInterval);

function checkMatchingCards(func) {
  // for (var i = 0; i < selectedAnimals.length; i++) {
  //   selectedAnimals[i].id = i
  //   $faceup[i].innerHTML = selectedAnimals.pop()[i].image
  // }
  if(counter == 6){
    currentPlayer.time = time
    console.log(currentPlayer);
    console.log('time is over!')
    clearInterval(func);
    currentPlayer = game.player2
    console.log(currentPlayer);
    switchingPlayers();
  }

};

//create a function to switch between players
function switchingPlayers() {
  $('.start-game').html("Player 2!")
  $cards.removeClass('backside')
  $cards.removeClass('matched')
  $cards.off();
  // $cards.on('click');
  console.log(time);
  counter = 0
  time = 0
}

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
