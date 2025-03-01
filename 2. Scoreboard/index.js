let homeScoreElement = document.getElementById("home-score")
let guestScoreElement = document.getElementById("guest-score")
let homeScore = 0
let guestScore = 0

function onePoint() {
    homeScore += 1
    homeScoreElement.textContent = homeScore
}

function twoPoint() {
    homeScore += 2
    homeScoreElement.textContent = homeScore
}

function threePoint() {
    homeScore += 3
    homeScoreElement.textContent = homeScore
}


function onePnt() {
    guestScore += 1
    guestScoreElement.textContent = guestScore
}

function twoPnt() {
    guestScore += 2
    guestScoreElement.textContent = guestScore
}

function threePnt() {
    guestScore += 3
    guestScoreElement.textContent = guestScore
}