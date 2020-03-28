var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ['red', 'blue', 'yellow', 'green'];
var randomChosenColour = '';
var btns = $("div .btn");
var gameOn = false;
var level = 0;
var h1 = $("h1");

$(document).on("keydown", function (event) {
    if (event.key === "a") {


        if (!gameOn) {

           
            nextSequence();
            gameOn = true;
        }


    }

});





btns.on("click", function (event) {

    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);

});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        if (userClickedPattern.length === gamePattern.length) {

            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        console.log("Meeh");
        var audio = new Audio('sounds/wrong.mp3');
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        h1.html("Game Over, Press Any Key to Restart");

        $("body").on("keydown", replay);
    }

}


function nextSequence() {
    userClickedPattern = [];
    level++;
    h1.html("Level " + level);
    var randomNumber = Math.round(Math.random() * 3);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(btn) {
    var audio = new Audio("sounds/" + btn + ".mp3");
    audio.play();
}

function animatePress(btn) {
    $('#' + btn).addClass("pressed");
    setTimeout(function () { $('#' + btn).removeClass("pressed"); }, 100);
}

function replay() {
    console.log("opss");
    gamePattern = [];
    level = -1;
    h1.html("Press A Key to Start");
    gameOn = false;
}

