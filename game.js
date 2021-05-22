
var level = 0;
var gamePattern = [];
var userClickedPattern = [];
var started = false;

// keydown to start gamePattern
$("input").click(function(){
    if (started === false) {
      nextSequence();
      started =! started;
    }
});

$(document).on("keydown",function(){
    if (started === false) {
      nextSequence();
      started =! started;
    }
});

// Sequence Function

function nextSequence() {

  // random color picker

  var randomNumber = Math.floor(Math.random() * 4);
  var buttonColors = ["red", "blue", "green", "yellow"];
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  // sound play and fade effect

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  var colorSound = new Audio("sounds/" + randomChosenColor + ".mp3");
  colorSound.play();

  // level changing in h1 text

  $("#level-title").html("Level " + level);
  level++;
}

// User Input


$(".btn").on("click", function() {
  userClickedPattern.push(this.id);
  checkAnswer(userClickedPattern.length - 1);
});

// checkAnswer

function checkAnswer(currentLevel) {
  console.log(gamePattern);
  console.log(userClickedPattern);
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("Success");

    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(nextSequence, 1000);
      userClickedPattern = [];
    }

  }
   else {
     var wrongSound =new Audio("sounds/wrong.mp3");
     wrongSound.play();

     $("body").addClass("game-over");
     setTimeout(function(){ $("body").removeClass("game-over")}, 200);

     $("#level-title").html("Game Over, Press a Key or Start game to Restart.");

     started = false;

     gamePattern = [];
     userClickedPattern = [];
     level = 0;
    console.log("Wrong");
  }

}


// On Button click Sound and blink

$(".btn").click(function() {
  var buttonClicked = $(this).attr("id");
  $("#" + buttonClicked).fadeOut(100).fadeIn(100);

  var btnSound = new Audio("sounds/" + buttonClicked + ".mp3");
  btnSound.play();
});
