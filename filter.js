/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
let form = document.forms[0]
form.addEventListener('submit', function (event) {
  event.preventDefault();
   let tequila = document.querySelector('#inputTequila')
   alert(tequila.value)
  filterCocktails('tequila');
})

    //FILTER BY ALCOHOL
    
    function filterCocktails(alcohol){
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${alcohol}`)
        .then((response) => {
            if (response.status !== 200) {
              console.log('Looks like there was a problem. Status Code: ' +
                response.status);
            }
            // Examine the text in the response
           return response.json();
        })
            .then((data)=> {
              console.log(data);
              displaySelection(data);
              
            })
        .catch(function(err){
          console.log('Fetch Error :-S', err);
        });
      
      }
      
      function displaySelection(selection){
        console.log(selection.drinks.length);
        let filterSection = document.querySelector('.filter-section');
        filterSection.innerHTML = '';
        let filterGallery = document.createElement('article');
        filterGallery.id = 'filter-gallery';
        selection.drinks.forEach(function(drink){
          //console.log(drink);
          let figure = document.createElement('figure');
          
          let img = document.createElement('img');
          img.src = drink.strDrinkThumb;
          img.setAttribute('data-id', drink.idDrink);
          let figcaption = document.createElement('figcaption');
          figcaption.innerText = drink.strDrink;
      
          figure.appendChild(img);
          figure.appendChild(figcaption);
          filterGallery.appendChild(figure);
          filterSection.appendChild(filterGallery);
      
          figure.addEventListener('click', function(event){
            console.log(event.target.dataset.id);
            getSelectedCocktail(event.target.dataset.id);
          })
      
        });
      
      }


      function getSelectedCocktail(id){
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(
          function(response) {
            if (response.status !== 200) {
              console.log('Looks like there was a problem. Status Code: ' +
                response.status);
              return;
            }
      
            // Examine the text in the response
            response.json().then(function(data) {
              //console.log(data);
              displaySelectedCocktail(data);
            });
          }
        )
        .catch(function(err) {
          console.log('Fetch Error :-S', err);
        });
      
      }
      
      
      
      function displaySelectedCocktail(cocktail){
        let filterSection = document.querySelector('.filter-section');
        filterSection.innerHTML = '';
        
        //console.info(cocktail.drinks[0]);
      
        let drinkName = document.createElement('h2');
        drinkName.innerHTML = cocktail.drinks[0].strDrink;
        filterSection.appendChild(drinkName);
      
        let drinkImg = document.createElement('img');
        drinkImg.src = cocktail.drinks[0].strDrinkThumb;
        filterSection.appendChild(drinkImg);
      
        //display ingredients
        let ingredientHeading = document.createElement('h3');
        ingredientHeading.innerText = 'Ingredients';
        for(let i=1; i<16; i++){
          if(cocktail.drinks[0][`strIngredient${i}`] == null){
            break;
          }
      
          let measure = '';
          if(cocktail.drinks[0][`strMeasure${i}`] != null){
            measure = cocktail.drinks[0][`strMeasure${i}`] + ': ';
          }
      
          let ingredient = document.createElement('ons-list-item');
          ingredient.innerText = measure + cocktail.drinks[0][`strIngredient${i}`];
          filterSection.appendChild(ingredient);
        }
      
        let instructions = document.createElement('ons-card');
        instructions.innerText = cocktail.drinks[0].strInstructions;
        filterSection.appendChild(instructions);
      
      }