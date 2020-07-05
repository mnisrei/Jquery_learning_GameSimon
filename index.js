var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
// ...........Place to Add Highest Score and Current Score......................
// this place is for adding highest score and current score later
// .............................................................................


// ..................Drivers When first page is loaded....................
// 1)..............Action performed over the Button Press....................
$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  playSound(userChosenColor);
  animatePress(userChosenColor);
  userClickedPattern.push(userChosenColor);
  checkAns(userClickedPattern.length);
});
// 2)..................Keypress to start the Game..........................
$(document).keypress(function() {
  if (started == false) {
    nextSequence();
    started = true;
  }
});


// ................To Make the New Sequence.................
function nextSequence() {
  level++;
  userClickedPattern = [];
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 3) + 1;
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).delay(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}


// ....................Checking if the sequence matches the user sequence............
function checkAns(currentLevel) {
  console.log(currentLevel);
  console.log(gamePattern);
  console.log(userClickedPattern);
  for (var i = 0; i < currentLevel; i++) {
    if (gamePattern[i] === userClickedPattern[i]) {
      console.log("right");
    } else {
      $("h1").text("Game Over, Press Any Key to Restart!")
      $("body").addClass("game-over");
      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 200);
      playSound("wrong");
      startOver();
    }
  }
  if (gamePattern.length == userClickedPattern.length) {
    setTimeout(function() {
      nextSequence();
    }, 1000);
  }
}


// ..........................Animation for the Keypress....................
function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");
  setTimeout(function() {
    $("." + currentColor).removeClass("pressed");
  }, 100);
}


// .............Playing the Sounds............................
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


// .................Starting over if game is over.....................
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
