const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const xBtn = document.getElementById("xsocials");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");


let apiQuotes = [];

function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function notLoading() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

//Show New Quote
function newQuote() {
    loading();
const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

if (!quote.author) {
    authorText.textContent = "Unknown"
} else {
    authorText.textContent = quote.author;
}

if (quote.text.length > 150) {
    quoteText.classList.add("long-quote");
} else {
    quoteText.classList.remove("long-quote");
}

quoteText.textContent = quote.text;
notLoading();
}

//Get Quotes from API
async function getQuotes() {
    loading();
const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
} catch (error) {
    
}
}

//Tweet Quote
function tweetQuote() {
    const xUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(xUrl, "_blank");
}

newQuoteBtn.addEventListener("click", newQuote);
xBtn.addEventListener("click", tweetQuote);

//On Load
getQuotes();