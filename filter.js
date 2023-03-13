
let btn1 = document.querySelector('.bt1');
btn1.addEventListener("click",()=>{
  filterCocktails(btn1.value)
  
})
let btn2 = document.querySelector('.bt2');
btn2.addEventListener("click",()=>{
  filterCocktails(btn2.value)
  
})
let btn3 = document.querySelector('.bt3');
btn3.addEventListener("click",()=>{
  filterCocktails(btn3.value)
  
})
let btn4 = document.querySelector('.bt4');
btn4.addEventListener("click",()=>{
  filterCocktails(btn4.value)
})
let btn5 = document.querySelector('.bt5');
btn5.addEventListener("click",()=>{
  filterCocktails(btn5.value)
})
let btn6 = document.querySelector('.bt6');
btn6.addEventListener("click",()=>{
  filterCocktails(btn6.value)
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
          img.style.borderRadius='10px';
          img.src = drink.strDrinkThumb;
          img.setAttribute('data-id', drink.idDrink);
          let figcaption = document.createElement('figcaption');
          figcaption.style.fontSize= '1rem';
          figcaption.style.margin= 'inherit';
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
              console.log('Looks like there was a problem. Status Code:  ' +
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
        let list = document.createElement('ul')
        for(let i=1; i<16; i++){
          if(cocktail.drinks[0][`strIngredient${i}`] == null){
            break;
          }
      
          let measure = '';
          if(cocktail.drinks[0][`strMeasure${i}`] != null){
            measure = cocktail.drinks[0][`strMeasure${i}`] + ': ';
          }
      
          
          let ingredient = document.createElement('li');
          list.appendChild(ingredient)
          ingredient.innerText = measure + cocktail.drinks[0][`strIngredient${i}`];
 
          filterSection.appendChild(list);
        }
      
        let instructions = document.createElement('div');
        instructions.classList.add('card')
        instructions.innerHTML = 'Let´s do it!  <br><br>'+  cocktail.drinks[0].strInstructions
        filterSection.appendChild(instructions);
      
      }