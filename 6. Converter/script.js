/*
1 meter = 3.281 feet
1 liter = 0.264 gallon
1 kilogram = 2.204 pound
*/


const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const lenghtEl = document.getElementById("lenght-el")
const volumeEl = document.getElementById("volume-el")
const massEl = document.getElementById("mass-el")

inputBtn.addEventListener("click", function() {
    const valueEl = inputEl.value
    const roundValue = parseFloat(valueEl)

    const mToFt = roundValue * 3.281
    const ftToM = roundValue / 3.281
    lenghtEl.innerHTML = `${valueEl} meters = ${mToFt.toFixed(3)} feet | ${valueEl} feet = ${ftToM.toFixed(3)} meters`

    const literToGallon = roundValue * 0.264
    const gallonToLiter = roundValue / 0.264
    volumeEl.innerHTML = `${valueEl} liters = ${literToGallon.toFixed(3)} gallon | ${valueEl} gallon = ${gallonToLiter.toFixed(3)} liter `

    const kgToPound = roundValue * 2.204
    const poundToKg = roundValue / 2.204
    massEl.innerHTML = `${valueEl} kilograms = ${kgToPound.toFixed(3)} pounds | ${valueEl} pounds = ${poundToKg.toFixed(3)} kilograms`
})


