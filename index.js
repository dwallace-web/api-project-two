//works on 9-22-2020
let baseURL = 'https://www.thecocktaildb.com/api/json/v2/';
let key = '9973533'

let dropdownFrag = '/list.php?i=list';
let randomFrag = '/randomselection.php';
let searchFrag = '/search.php';

const cocktailholder = document.querySelector('.cocktailholder');


// const formcontainer = document.querySelector('.formcontainer');
// const form = document.querySelector('.cocktailsearch');
// const formSubmit = document.querySelector('.formSubmit');
// const resultcontainer = document.querySelector('.resultcontainer');

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
    card.className = 'card mb-4';
    card.style = 'width: 18rem;  margin: 1em;  padding: .3em; overflow: auto';

    //building details within the card
    let img = document.createElement('img');
    img.className = "card-img-top";
    img.src = cocktail.strDrinkThumb;

    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    let cardTitle = document.createElement('h5');
    cardTitle.className = 'card-title text-center';
    cardTitle.innerText = cocktail.strDrink;

    let cardInstructions = document.createElement('p');
    cardInstructions.className = 'card-text instructions' + ` cocktail-${cocktail.idDrink}`;
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