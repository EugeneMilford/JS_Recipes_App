const rr = () =>{
    
    let RecipeName = document.getElementById("recipeName").value;
    
    const url = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?query=' +RecipeName+ '&type=main%20course&instructionsRequired=true&fillIngredients=true&addRecipeInformation=true&maxReadyTime=20&minCarbs=10&maxCarbs=100&minProtein=10&maxProtein=100&minFat=10&minAlcohol=0&minCaffeine=0&minCopper=0&minCalcium=0&maxCalcium=100&minCholine=0&maxCholine=100&minCholesterol=0&maxCholesterol=100&minFluoride=0&maxFluoride=100&minSaturatedFat=0&maxSaturatedFat=100&minVitaminA=0&maxVitaminA=100&minVitaminC=0&maxVitaminC=100&minVitaminD=0&maxVitaminD=100&minVitaminE=0&maxVitaminE=100&minVitaminK=0&maxVitaminK=100&minVitaminB1=0&maxVitaminB1=100&minVitaminB2=0&maxVitaminB2=100&minVitaminB5=0&minVitaminB3=0&minVitaminB6=0&maxVitaminB6=100&minVitaminB12=0&minFiber=0&minFolate=0&minFolicAcid=0&minIodine=0&minIron=0&minMagnesium=0&minManganese=0&minPhosphorus=0&minPotassium=0&minSelenium=0&minSodium=0&minSugar=0&minZinc=0&offset=0';
    
    
    fetch(url, {
        "method": "GET",
	"headers": {
		'X-RapidAPI-Key': '2dbc831825msh84a073d47a621bap17f4cfjsn8a5f2a3cea0d',
		'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
	}
    }
    )
    
    .then(response => response.json())
    .then(function(current) {
        
        console.log(current);

        for(i=0;i<9;i++){
            const xxx = (current.results[i].image);
            zzz = xxx.innerHTML = `<img src='${current.results[i].image}'class='img-fluid' alt=''/>`
                  
           document.querySelector("#ddd").insertAdjacentHTML(
            'afterbegin',
                "<div class='col-xl-4 col-md-6 portfolio-item'>\n\
                    <div class='portfolio-wrap'>\n\
                        <a href='recipeDetails.html' data-gallery='portfolio-gallery-app' class='glightbox'>"+ zzz +"</a>\n\
                        <div class='portfolio-info'>\n\
                            <h4><a href='recipeDetails.html' title='More Details'>"+ current.results[i].creditsText +"</a></h4>\n\
                            <p id='p1'>Servings: "+ current.results[i].servings +"</p>\n\
                            <a href='#' onclick='AddRec()'>Add To Favourites</a>\n\
                        </div>\n\
                    </div>\n\
                </div>"); 
        };               
    }); 
};


