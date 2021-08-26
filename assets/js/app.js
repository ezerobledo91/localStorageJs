// Variables
const listaTweets = document.getElementById("lista-tweets");

//Event Listeners
eventListener();

function eventListener() {
  // Cuando se envía el formulario
  document
    .querySelector("#formulario")
    .addEventListener("submit", agregarTweet);

  // Borrar tweets delegation
  listaTweets.addEventListener("click", borrarTweet);
  document.addEventListener("DOMContentLoaded", localStorageListo);
}

function agregarTweet(e) {
  e.preventDefault();
  const tweet = document.getElementById("tweet").value;
  const botonBorrar = document.createElement("a");
  botonBorrar.classList = "borrar-tweet";
  botonBorrar.innerText = "X";

  const li = document.createElement("li");
  li.innerText = tweet;
  li.appendChild(botonBorrar);
  listaTweets.appendChild(li);
  // Añadir a local Storage
  agregarTweetLocalStorage(tweet);
}

function borrarTweet(e) {
  e.preventDefault();
  if (e.target.className === "borrar-tweet") {
    e.target.parentElement.remove();
    borrarTweetLocalStorage(e.target.parentElement.innerText);
  }
}

function agregarTweetLocalStorage(tweet) {
  let tweets;
  tweets = obtenerTweetsLocalStorage();
  //Añadir el nuevo tweet
  tweets.push(tweet);
  // Convertir de string a Arreglo
  localStorage.setItem("tweets", JSON.stringify(tweets));
}

// Comprobar Elementos del Local Storage
function obtenerTweetsLocalStorage() {
  let tweets;
  if (localStorage.getItem("tweets") == null) {
    tweets = [];
  } else {
    tweets = JSON.parse(localStorage.getItem("tweets"));
  }
  return tweets;
}

//Mostrar datos del Local storage en la lista
function localStorageListo() {
  let tweets;
  tweets = obtenerTweetsLocalStorage();
  tweets.forEach(function (tweet) {
    const botonBorrar = document.createElement("a");
    botonBorrar.classList = "borrar-tweet";
    botonBorrar.innerText = "X";

    const li = document.createElement("li");
    li.innerText = tweet;
    li.appendChild(botonBorrar);
    listaTweets.appendChild(li);
  });
}
function borrarTweetLocalStorage(tweet) {
  let tweets, tweetBorrar;
  // Elmina la X del tweet
  tweetBorrar = tweet.substring(0, tweet.length - 1);
  tweets = obtenerTweetsLocalStorage();
  tweets.forEach(function (tweet, index) {
    if (tweetBorrar == tweet) {
      tweets.splice(index, 1);
    }
    localStorage.setItem("tweets", JSON.stringify(tweets));
  });
}
