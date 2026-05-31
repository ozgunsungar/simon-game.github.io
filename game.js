var buttonColours = ["red", "blue", "green", "yellow"]
var gamePattern = []
var userClickedPattern = []
var level = 0
var atStart = true
$(document).on("keypress", function (e) {

    if (atStart) {
        nextSequence()
    }
    atStart = false

})


$(".btn").on("click", function (event) {

    var userChosenColor = event.target.id
    userClickedPattern.push(userChosenColor)
    playSound(userChosenColor)
    animatePress(userChosenColor)

    checkAnswer(userClickedPattern.length - 1)
})

function nextSequence() {
    userClickedPattern = []

    $("h1").text("Level " + level)


    var randomNumber = Math.floor(Math.random() * 4)
    var randomChosenColor = buttonColours[randomNumber]
    gamePattern.push(randomChosenColor)

    $("." + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor)
    animatePress(randomChosenColor)

    level++
}

function playSound(name) {
    new Audio("./sounds/" + name + ".mp3").play()
}

function animatePress(currentColour) {
    $("." + currentColour).addClass("pressed")
    setTimeout(function () {
        $("." + currentColour).removeClass("pressed")
    }, 100)

}
function checkAnswer(currentChosenIndex) {
    if (gamePattern[currentChosenIndex] == userClickedPattern[currentChosenIndex]) {
        console.log("success")
        if (gamePattern.length == userClickedPattern.length) {

            setTimeout(nextSequence, 1000)
        }

    } else {
        playSound("wrong")
        $("body").addClass("game-over")
        setTimeout(() => {
            $("body").removeClass("game-over")
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart")
        startOver()
    }
}

function startOver() {
    level = 0
    gamePattern = []
    atStart = true

}