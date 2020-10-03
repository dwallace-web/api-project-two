//works on 9-22-2020
let baseURL = 'https://www.thecocktaildb.com/api/json/v2/';
let key = '9973533'

let randomFrag = '/randomselection.php';
let searchFrag = '/search.php';
let searchQuery = '?s='

const cocktailholder = document.querySelector('.cocktailholder');

function getRandomDrinks() {
  let url = baseURL + key + randomFrag;
  console.log(url);

  fetch(url)
    .then(response => response.json())
    //.then(data => console.log(data))
    .then(cocktaildata => buildCocktailCards(cocktaildata))
    .catch(error => console.log(error));

};


getRandomDrinks();

function buildCocktailCards(cocktaildata) {

  //unwrap the response
  let cockTailObj = cocktaildata.drinks;
  // console.log(cocktaildata);
  // console.log(cockTailObj);

  for (cocktail of cockTailObj) {

    //console.log(cocktail);

    let cardIngredients = document.createElement('ul');
    cardIngredients.className = 'list-group list-group-flush';


    for (i = 1; i < 16; i++) {
      //console.log(cocktail[`strIngredient${i}`]);
      //console.log(cocktail[`strMeasure${i}`]);

      if (cocktail[`strIngredient${i}`] === "") {
        delete cocktail[`strIngredient${i}`];
      }

      if (cocktail[`strMeasure${i}`] === "") {
        delete cocktail[`strMeasure${i}`];
      }

      if (cocktail[`strIngredient${i}`] == null) {
        break;
      }

      if (cocktail[`strMeasure${i}`] == null) {
        cocktail[`strMeasure${i}`] = 'Add To Taste'
      }

      // if(cocktail[`strMeasure${i}`] = "") {
      //   cocktail[`strMeasure${i}`] = null;
      // }

      cocktail[`strMeasure${i}`] = cocktail[`strMeasure${i}`].replace("part", "Ounce");
      cocktail[`strMeasure${i}`] = cocktail[`strMeasure${i}`].replace("parts", "Ounces");

      //console.log(cocktail[`strIngredient${i}`], cocktail[`strMeasure${i}`]);

      let specificIngredient = document.createElement('li');
      specificIngredient.className = 'list-group-item';
      specificIngredient.innerHTML = cocktail[`strIngredient${i}`] + ' - ' + cocktail[`strMeasure${i}`];

      cardIngredients.appendChild(specificIngredient);

      //console.log(specificIngredient);
    }

    //console.log(cardIngredients);

    let card = document.createElement('div');
    card.className = 'card mb-4 border border-info';
    card.style = 'margin: 1em;  padding: .3em;';

    //building details within the card
    let img = document.createElement('img');
    img.className = "card-img-top rounded-circle";
    img.src = cocktail.strDrinkThumb;

    let cardBody = document.createElement('div');
    cardBody.className = 'card-body border border-light';

    let cardTitle = document.createElement('h5');
    cardTitle.className = 'card-title text-center';
    cardTitle.innerText = cocktail.strDrink;

    let cardInstructions = document.createElement('p');
    cardInstructions.className = 'card-text instructions border border-light' + ` cocktail-${cocktail.idDrink}`;
    cardInstructions.innerText = cocktail.strInstructions;

    //putting the card together
    cardBody.appendChild(cardTitle);
    card.appendChild(img);
    cardBody.appendChild(cardIngredients);
    cardBody.appendChild(cardInstructions);
    card.appendChild(cardBody);

    //console.log(card);
    cocktailholder.appendChild(card);
  }

};



const form = document.querySelector('.cocktailsearch');
const formSubmit = document.querySelector('.formSubmit');
const searchTerm = document.querySelector(`#searchTerm`);
const resultcontainer = document.querySelector('.resultcontainer');
const moody = document.querySelector('.moody');

//Find a Custom Cocktail
form.addEventListener('submit', findDrink);

function findDrink(e) {
  console.log(e);
  e.preventDefault();

  let searchURL = baseURL + key + searchFrag + searchQuery + `${searchTerm.value}`;

  console.log(searchURL);

  fetch(searchURL)
    .then(searchResponse => searchResponse.json())
    .then(searchResponse => pickDrink(searchResponse))
    .catch(err => console.log(err)); //tryAgain()

};

pickDrink = (searchResponse) => {
  console.log(searchResponse.drinks);

  if (searchResponse.drinks == null) {
    moody.innerText = "No drinks found, try again."
    moody.style = "color: red;"
  } else {

    moody.innerText = "Thanks for visiting. Feel free to keep searching!"
    moody.style = "color: #6c757d";

    let max = searchResponse.drinks.length;
    let min = 0;

    let searchSelect = (min, max) => {
      return Math.floor(Math.random() * (max - min) + min);
    }

    let randomDrinkValue = searchSelect(min, max);

    console.log(searchResponse.drinks[randomDrinkValue]);

    displayDrink(searchResponse.drinks[randomDrinkValue])
  }
};

displayDrink = (drink) => {
  //console.log(drink);

  //remove last drink

  while (resultcontainer.firstChild) {
    resultcontainer.removeChild(resultcontainer.firstChild);
  }

  //Display Drink Results - in Horizonal Card 

  let searchCardRow = document.createElement('div');
  searchCardRow.className = 'row no-gutters';

  let searchCard = document.createElement('div');
  searchCard.className = 'card mb-3 border border-info';

  let leftSide = document.createElement('div');
  leftSide.className = 'col-md-4';

  let img = document.createElement('img');
  //img.style = "display: inline-block";
  img.src = drink.strDrinkThumb;
  img.className = 'card-img ';

  let rightSide = document.createElement('div');
  rightSide.className = 'col-md-8';

  let cardBody = document.createElement('div');
  cardBody.className = "card-body";

  let cardTitle = document.createElement('h4');
  cardTitle.className = "card-title text-center";
  cardTitle.innerHTML = `${drink.strDrink}`;

  let cardIngredients = document.createElement('ul');
  cardIngredients.className = "list-group list-group-flush";

  let cardInstructions = document.createElement('p');
  cardInstructions.innerHTML = `${drink.strInstructions}`;
  cardInstructions.className = "card-text";
  cardInstructions.style = "padding-left: 1.25em;"
  let specificIngredient;

  for (i = 1; i < 16; i++) {

    //Remove bad ingredients from API
    if (drink[`strIngredient${i}`] === "") {
      delete drink[`strIngredient${i}`];
    }

    if (drink[`strMeasure${i}`] === "") {
      delete drink[`strMeasure${i}`];
    }
    //Stop once all incredients are added
    if (drink[`strIngredient${i}`] == null) {
      break;
    }
    //update copy if no details given
    if (drink[`strMeasure${i}`] == null) {
      drink[`strMeasure${i}`] = 'Add To Taste'
    }
    //update parts to ounces when needed
    drink[`strMeasure${i}`] = drink[`strMeasure${i}`].replace("part", "Ounce");
    drink[`strMeasure${i}`] = drink[`strMeasure${i}`].replace("parts", "Ounces");

    // console.log(drink[`strIngredient${i}`]);
    // console.log(drink[`strMeasure${i}`]);

    let specificIngredient = document.createElement('li');
    specificIngredient.className = 'list-group-item';
    specificIngredient.innerHTML = drink[`strIngredient${i}`] + ' - ' + drink[`strMeasure${i}`];

    cardIngredients.appendChild(specificIngredient);

    //console.log(specificIngredient);
  }

  searchCardRow.appendChild(leftSide);
  searchCardRow.appendChild(rightSide);
  leftSide.appendChild(img);
  rightSide.appendChild(cardTitle);
  rightSide.appendChild(cardInstructions);
  rightSide.appendChild(cardIngredients);
  searchCard.appendChild(searchCardRow);

  console.log(drink);
  console.log(searchCardRow);

  //resultcontainer.appendChild(media);
  resultcontainer.appendChild(searchCardRow);
  resultcontainer.style = "padding: 1.25em 1.25em 1.25em 1.25em "

}