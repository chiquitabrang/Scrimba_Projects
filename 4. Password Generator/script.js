
const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];

let password = []
let password1 = document.getElementById("password-one") 
let password2 = document.getElementById("password-two") 

function generatePassword(length) {
    password = []
    for (let i = 0; i < length; i++) {
        let randomCharacter = Math.floor(Math.random() * characters.length)
        password.push(characters[randomCharacter])
    }

    return password.join('')
}

function clickEl() {
    let passwordLenght = 15
    let passwordOne = generatePassword(passwordLenght)
    let passwordTwo = generatePassword(passwordLenght)

    password1.textContent = passwordOne
    password2.textContent = passwordTwo
}