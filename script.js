const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

//show loading
function showLoading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

//Hide Loading

function removeLoading() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// Get Quote from API

async function getQuote() {
  showLoading();
  const proxyUrl = "https://fierce-anchorage-07027.herokuapp.com/";

  const apiUrl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";

  try {
    const response = await fetch(proxyUrl + apiUrl);

    const data = await response.json();

    if (data.quoteText.length > 90) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
    quoteText.innerText = data.quoteText;

    if (data.quoteAuthor === "") {
      authorText.innerText === "Unknown";
    } else {
      authorText.innerText = data.quoteAuthor;
    }

    //stop loading and show quote
    removeLoading();
  } catch (error) {
    getQuote();
  }
}

//tweetquote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
}

//event listener

newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

//on Load
getQuote();
