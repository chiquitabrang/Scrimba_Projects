import { quotesData } from "./data.js";

const emotionRadios = document.getElementById("emotion-radios");
const getImageBtn = document.getElementById("get-image-btn");
const inpirationalOnlyOption = document.getElementById(
  "inpirational-only-option"
);
const quoteModal = document.getElementById("quote-modal");
const quoteModalInner = document.getElementById("quote-modal-inner");
const quoteModalCloseBtn = document.getElementById("quote-modal-close-btn");

emotionRadios.addEventListener("change", highlightCheckedOption);
quoteModalCloseBtn.addEventListener("click", closeModal);
getImageBtn.addEventListener("click", renderQuote);

function highlightCheckedOption(e) {
  const radios = document.getElementsByClassName("radio");
  for (let radio of radios) {
    radio.classList.remove("highlight");
  }

  document.getElementById(e.target.id).parentElement.classList.add("highlight");

  // const radioArrays = [...document.querySelectorAll("input[type='radio']")];
  // for (let radioArray of radioArrays) {
  //   if (radioArray !== e.target) {
  //     radioArray.parentElement.classList.remove("highlight");
  //   }
  // }
}

function closeModal() {
  quoteModal.style.display = "none";
}

function renderQuote() {
  const quote = getSingleQuoteObject();
  quoteModalInner.innerHTML = `<img class="quote-img" src="./images/${quote.image}" alt="${quote.alt}">`;
  quoteModal.style.display = "flex";
}

function getSingleQuoteObject() {
  const quoteArray = getMatchingQuotesArray();

  if (quoteArray.length === 1) {
    return quoteArray[0]; //we want to get an object so we need to access what is at the 0 position of this array
  } else {
    const randomIndex = Math.floor(Math.random() * quoteArray.length);
    return quoteArray[randomIndex];
  }
}

function getMatchingQuotesArray() {
  const isIspirational = inpirationalOnlyOption.checked;

  const selectedEmotion = document.querySelector('input[type="radio"]:checked');
  if (selectedEmotion) {
    const emotion = selectedEmotion.value;

    const matchingQuotes = quotesData.filter(function (quote) {
      if (isIspirational) {
        return quote.emotionTags.includes(emotion) && quote.isIspirational;
      } else {
        return quote.emotionTags.includes(emotion);
      }
    });
    return matchingQuotes;
  }
}

function getEmotionsArray(quotes) {
  const emotionsArray = [];
  for (let quote of quotes) {
    for (let emotion of quote.emotionTags) {
      if (!emotionsArray.includes(emotion)) {
        emotionsArray.push(emotion);
      }
    }
  }
  return emotionsArray;
}

function renderEmotionRadios(quotes) {
  let radioItems = ``;
  const emotions = getEmotionsArray(quotes);
  for (let emotion of emotions) {
    radioItems += `
    <div class="radio">
        <label for="${emotion}">${emotion}</label>
        <input 
            type="radio" 
            id="${emotion}"
            value="${emotion}"
            name="emotions">
    </div>`;
  }
  emotionRadios.innerHTML = radioItems;
}

renderEmotionRadios(quotesData);
