// GETTING THE ELEMENTS

const quote = document.querySelector(".quote-text");
const author = document.querySelector(".author-text");
const buttonsNewQuote = document.querySelector(".new-quote");
const buttonsCopyQuote = document.querySelector(".copy-quote");

// FUNCTIONS

let printQuote = function (randomQuote) {
  quote.textContent = randomQuote.text;
  if (!randomQuote.author) {
    author.textContent = `-Unknown-`;
  } else {
    author.textContent = `-${randomQuote.author}-`;
  }
};

let getRandomQuote = function (data) {
  let randomNumber = Math.floor(Math.random() * (data.length + 1));
  printQuote(data[randomNumber]);
};

let getQuote = async function () {
  notYetCopied();
  try {
    let response = await fetch("https://type.fit/api/quotes");
    let data = await response.json();
    getRandomQuote(data);
  } catch (err) {
    console.log(err);
  }
};
let alertCopied = function () {
  buttonsCopyQuote.textContent = "Copied!";
};
let notYetCopied = function () {
  buttonsCopyQuote.textContent = "CopyQuote";
};
let CopyToClipboard = function () {
  var r = document.createRange();
  r.selectNode(document.getElementById("quote-text"));
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(r);
  document.execCommand("copy");
  window.getSelection().removeAllRanges();
  alertCopied();
};
// ADDING EVENT LISTNERS

buttonsNewQuote.addEventListener("click", getQuote);
buttonsCopyQuote.addEventListener("click", CopyToClipboard);
