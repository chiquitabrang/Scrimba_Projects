//Inorder to use firebase, we need to use some code that lives on firebase servers
//Import a firebase function and get it from the link location
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js" 
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

//database URL from firebase
const appSettings = {
    databaseURL: "https://playground-f6798-default-rtdb.asia-southeast1.firebasedatabase.app/",
    authDomain: "playground-f6798.firebaseapp.com",
    projectId: "playground-f6798",
    storageBucket: "playground-f6798.appspot.com",
    appId: "116741930649",
}

const app = initializeApp(appSettings) //connect project app to the firebase database
const dataBase = getDatabase(app)
//We need to create a reference => any location inside the database
const shoppingListInDB = ref(dataBase, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value

    push(shoppingListInDB, inputValue)

    console.log(inputValue)
})
