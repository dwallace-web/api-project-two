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
    //cardIngredients.innerText = `You will need: `
    
    for(i = 1; i < 16; i++) {
      //console.log(cocktail[`strIngredient${i}`]);
      //console.log(cocktail[`strMeasure${i}`]);
      
      if(cocktail[`strIngredient${i}`] == null || '') {
        break;
      }

      if(cocktail[`strMeasure${i}`] == null) {
        cocktail[`strMeasure${i}`] = 'Add To Taste '
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
    card.style = 'width: 18rem;  margin: 1em;  padding: .3em; overflow: auto';

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
 
// //View Instructions
// let instructionsButton = document.createElement('button');
// instructionsButton.className = 'viewInstructions btn btn-info btn-block' + ` cocktail-${cocktail.idDrink}`;
// instructionsButton.setAttribute("type", "button");
// instructionsButton.setAttribute("name", `${cocktail.idDrink}`);
// instructionsButton.setAttribute("value", `${cocktail.idDrink}`);
// instructionsButton.innerText = 'View Instructions';



    //putting the card together
    cardBody.appendChild(cardTitle);
    card.appendChild(img);
    cardBody.appendChild(cardIngredients);
// cardBody.appendChild(instructionsButton);
    cardBody.appendChild(cardInstructions);
    card.appendChild(cardBody);

    //console.log(card);
    cocktailholder.appendChild(card);
  }

};

// const viewInstructions = document.querySelectorAll('.viewInstructions');
// console.log(viewInstructions);
// viewInstructions.addEventListener("click", instructions);

// function instructions(){
  
// }

const form = document.querySelector('.cocktailsearch');
const formSubmit = document.querySelector('.formSubmit');
const searchTerm = document.querySelector(`#searchTerm`);
const resultcontainer = document.querySelector('.resultcontainer');

//Find a Custom Cocktail
form.addEventListener('submit', findDrink);

function findDrink(e){
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

  let max = searchResponse.drinks.length;
  let min = 0;

  let searchSelect = (min, max) =>  {
    return Math.floor(Math.random() * (max - min) + min);
  }

  let randomDrinkValue = searchSelect(min, max);

  console.log(searchResponse.drinks[randomDrinkValue]);
  
  displayDrink(searchResponse.drinks[randomDrinkValue])
};

displayDrink = (drink) => {
  
  
  
  //console.log(drink);

  //Display Drink Results
  let media = document.createElement('div');
  media.className = 'media';

  let mediaBody = document.createElement('div');
  mediaBody.className = 'media-body';
  mediaBody.style = "padding: 20px";

  let img = document.createElement('img');
  img.src = drink.strDrinkThumb;
  img.style = "width: 300px;"
  img.className = "align-self-start mr-3";
  
  let drinkTitle = document.createElement('h4');
  drinkTitle.className="mt-0"
  drinkTitle.innerHTML = `${drink.strDrink}`;

  let ingredients = document.createElement('ul');
  
  let instructions = document.createElement('p');
  instructions.innerHTML = `${drink.strInstructions}`;

  for(i = 1; i < 16; i++) {
    if(drink[`strIngredient${i}`] == null) {
      break;
    }

    if(drink[`strMeasure${i}`] == null) {
      drink[`strMeasure${i}`] = 'Add To Taste '
    }

    drink[`strMeasure${i}`] = drink[`strMeasure${i}`].replace("part", "Ounce");
    drink[`strMeasure${i}`] = drink[`strMeasure${i}`].replace("parts", "Ounces");

    // console.log(drink[`strIngredient${i}`]);
    // console.log(drink[`strMeasure${i}`]);

    let specificIngredient = document.createElement('li');
    specificIngredient.className = 'list-group-item';
    specificIngredient.innerHTML = drink[`strIngredient${i}`] + ' - ' + drink[`strMeasure${i}`]; 
    
    ingredients.appendChild(specificIngredient);

    //console.log(specificIngredient);
  }

  media.appendChild(img);
  mediaBody.appendChild(drinkTitle);
  mediaBody.appendChild(instructions);
  mediaBody.appendChild(ingredients);  
  media.appendChild(mediaBody);
  

  // console.log(drink);
  // console.log(media);

  resultcontainer.appendChild(media);
  resultcontainer.style = "padding: 20px 20px 20px 20px"
  
}