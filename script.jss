// create an object array with all images used in the game
var animals = [
  { name: 'Bear', image: '<img src="bear.gif" alt="bear">'},
  { name: 'Elephant', image: '<img src="elephant.gif" alt="elephant">'},
  { name: 'Giraffe', image: '<img src="giraffe.jpg" alt="giraffe">' },
  { name: 'Lion', image: '<img src="lion.gif" alt="lion">'},
  { name: 'Tiger', image: '<img src="tiger.gif" alt="tiger">'},
  { name: 'Monkey', image: '<img src="monkey.gif" alt="monkey">'}
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
shuffleArray(animals);

for (var i = 0; i < animals.length; i++) {
  $('#board').append('<div class="card">' + animals[i].image + '</div>')
}

$cards = $('.card')
$faceup = $('.frontside')
$facedown = $('.backside')

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
$cards.on('click', function(){
  $(this).toggleClass('backside')
  console.log($(this).find("img").attr('src'));
  if (!cardSelected) {
    cardSelected = $(this)
    //.find("img").attr('src')
    // $(this).toggleClass('backside')
      // if (cardSelected.hasClass('backside')) {
        // $(this).unbind('click');
      // } else if(!cardSelected.hasClass('backside')) {
        // $(this).bind('click');
  } else {
    var matched = (cardSelected.find("img").attr('src') == $(this).find("img").attr('src'))
    // console.log(cardSelected.find("img").attr('src') == $(this).find("img").attr('src'));

      if (matched) {
        // cardSelected !== $(this)
        // var matchedDivs = $('img[src="' +cardSelected+'"]').parent()
        cardSelected.unbind('click');
        // cardSelected.animate({opacity:0.5})
        cardSelected.addClass("matched")
        $(this).unbind('click');
        // $(this).animate({opacity:0.5})
        $(this).addClass("matched")
        counter++;
        checkMatchingCards()
      } else {
        var secondCard = $(this)
          $(cardSelected).addClass('backside')
          $(this).addClass('backside')
          setTimeout(function(){
            console.log(cardSelected + "removing class")
            $(cardSelected).removeClass('backside')
            secondCard.removeClass('backside')
            console.log(secondCard)
          },500)

          // console.log($(cardSelected).removeClass('backside'));
          // $(this).removeClass('backside')
        console.log("Sorry! Try again!");
    }
    setTimeout(function(){
      cardSelected = null
      console.log(cardSelected)
    },1000)
  }

  // }
});
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
  var myInterval = setInterval(function() {
      $('.timer').text(++time + ' Seconds');}, 1000);
      $('.p1-score').innerText = 'Player 1 Score: ' + time
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

    switchingPlayers()
  }

};

function switchingPlayers() {
  $cards.removeClass('backside')
  $cards.removeClass('matched')
  // $cards.bind('click')
  console.log(time);
}

//     var image = ($(this).children('img'))
//     console.log(image[0].src)
//     if (image[0].src == 'mole.gif') {
//       image[0].src = ""
//     randomMole()
// }
// else {
//   console.log('not here')
//

//   }
// });

// $cards.on('click',function(){
//
//   ;
// });
// selectedAnimals.forEach(function(value) {
// for (i=0; i< selectedAnimals.length; i= i+1) {
//
//   var chosenAnimal = selectedAnimals.pop[i];
//   $('.cards').forEach(chosenAnimal);
// }








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
//create a function to click on cards
// function playerTurn() {
//   $(this).toggleClass("faceup");
//   $(this).text(selectedAnimals.pop())
//   $(this).unbind('click')
// };



//create a for loop to push each array into a div
//
// function Animal (type, image) {
//   this.type = type
//   this.image = image
// };
// var animal1 = new Animal(giraffe,"giraffe");
// var animal2 = new Animal(bear,"bear");
// var animal3 = new Animal(elephant,"elephant");
// var animal4 = new Animal(lion,"lion");
// var animal5 = new Animal(tiger,"tiger");
// var animal6 = new Animal(monkey,"monkey");
//
// var animals = [animal1,animal2,animal3,animal4,animal5,animal6]

// theBody = document.body
// for (i = 0; i<animals.length; i= i+1) {
//   paragraphElement = document.createElement("p")
//   paragraphElement.innerText = "The name of the " + rangers[i].color + " power ranger is " + rangers[i].name
//   theBody.appendChild(paragraphElement);
//   paragraphElement.style.color = rangers[i].color;
//   rangerImages = document.createElement("img")
//   rangerImages.src = rangers[i].logo
//   theBody.appendChild(rangerImages)
// }
