const button = document.querySelector("button")

window.addEventListener("load", function(){

  button.addEventListener("click", (event)=>{
    
     function realizarConsulta(){
      
      fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
        .then((response) => {
          if(response.status !== 200){
            console.log("Something wents wrong, try again." + response.status)
          }
          return response.json() 
        })
        .then((data) =>// console.log(data) 
          displayRandomCoktail(data))
        .catch((error) =>{console.log(error+"  Fetch error :(")})

      }
      realizarConsulta();

    })
    
    function displayRandomCoktail(coktail){
      console.log(coktail.drinks[0])
      let drinkSection = document.getElementById('drink-section')
      let drinkName = document.createElement('h2')
      drinkSection.innerHTML= ""
      drinkName.innerHTML= coktail.drinks[0].strDrink
      drinkSection.appendChild(drinkName)
      let img = document.createElement('img')
      img.style.borderRadius = '10px'
      img.src = coktail.drinks[0].strDrinkThumb
      drinkSection.appendChild(img)

      for (let i = 1; i < 16; i++) {
        if(coktail.drinks[0][`strIngredient${i}`] == null){
          break;
          }  
          let measure = '';
          let ingredient = document.createElement('li')
          if (coktail.drinks[0][`strMeasure${i}`] != null){ 
            measure = coktail.drinks[0][`strMeasure${i}`] + ': ';

             // ingredient.innerHTML = ' ' + coktail.drinks[0][`strIngredient${i}`]
          }
          ingredient.innerText = measure + coktail.drinks[0][`strIngredient${i}`];
          drinkSection.appendChild(ingredient) 
         
      }

      let card = document.createElement('div')
      card.classList.add('card')
      card.innerHTML ='Instructions  <br><br>'+  coktail.drinks[0].strInstructions
      drinkSection.appendChild(card)
    }

});

