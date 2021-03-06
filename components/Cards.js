// STEP 3: Create article cards.
// -----------------------
// Send an HTTP GET request to the following address: https://lambda-times-api.herokuapp.com/articles
// Study the response data you get back, closely.
// You will be creating a card for each article in the response.
// This won't be as easy as just iterating over an array though.
//
// Write a function that takes a single article object and returns the following markup:
//
// <div class="card">
//   <div class="headline">{Headline of article}</div>
//   <div class="author">
//     <div class="img-container">
//       <img src={url of authors image} />
//     </div>
//     <span>By {author's name}</span>
//   </div>
// </div>
//
// Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
//
// Use your function to create a card for each of the articles, and append each card to the DOM.

const cardEntry = document.querySelector(".cards-container");

axios
  .get("https://lambda-times-backend.herokuapp.com/articles")
  .then((response) => {
    console.log(response.data.articles);
    for (let article in response.data.articles) {
      response.data.articles[article].forEach((article) => {
        cardEntry.appendChild(Card(article));
      });
    }
  })
  .catch((error) => {
    console.log("Card Data Not Returned", error);
  });

function Card(data) {
  const card = document.createElement("div");
  const headline = document.createElement("div");
  const author = document.createElement("div");
  const imgDiv = document.createElement("div");
  const img = document.createElement("img");
  const authorName = document.createElement("span");

  card.classList.add("card");
  headline.classList.add("headline");
  author.classList.add("author");
  imgDiv.classList.add("img-container");

  img.src = data.authorPhoto;
  headline.textContent = data.headline;
  authorName.textContent = data.authorName;

  card.appendChild(headline);
  card.appendChild(author);
  author.appendChild(imgDiv);
  imgDiv.appendChild(img);
  author.appendChild(authorName);

  card.addEventListener("click", () => {
    console.log(data.headline);
  });

  return card;
}
