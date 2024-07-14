const searchRecipe = () => {
    let RecipeName = document.getElementById("recipeName").value;
    
    const url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?query=${RecipeName}&instructionsRequired=true&fillIngredients=true&addRecipeInformation=true&addRecipeInstructions=true&addRecipeNutrition=false&ignorePantry=true&sort=max-used-ingredients&offset=0&number=10`;
    
    fetch(url, {
        "method": "GET",
        "headers": {
            'X-RapidAPI-Key': '2dbc831825msh84a073d47a621bap17f4cfjsn8a5f2a3cea0d',
            'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
        }
    })
    .then(response => response.json())
    .then(function(current) {
        console.log(current);
        document.querySelector("#ddd").innerHTML = ''; // Clear previous results
        for(let i = 0; i < current.results.length; i++) {
            const recipe = current.results[i];
            const recipeHtml = `
                <div class='col-lg-3 col-md-6' data-recipe-id="${recipe.id}">
                    <div class='blog-item'>
                        <div class='blog-img'>
                            <div class='blog-img-inner'>
                                <a href='recipeDetails.html' data-gallery='portfolio-gallery-app' class='glightbox'>
                                    <img src='${recipe.image}' class='img-fluid' alt=''/>
                                </a>
                            </div>
                        </div>
                        <div class='blog-content border border-top-0 rounded-bottom p-4'>
                            <h4>${recipe.title}</h4>
                            <p>Servings: ${recipe.servings}</p>
                            <a href='#'>Source: ${recipe.spoonacularSourceUrl}</a>
                            <br>
                            <br>
                            <button class='btn btn-secondary' onclick='addToFavorites("${recipe.id}", "${recipe.title}", "${recipe.image}")'>Add To Favourites</button>
                        </div>
                    </div>
                </div>`;
            document.querySelector("#ddd").insertAdjacentHTML('beforeend', recipeHtml);
        }
    });
};

const addToFavorites = (recipeId, recipeTitle, recipeImage) => {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    // Check if the recipe is already in favorites
    if (favorites.some(recipe => recipe.id === recipeId)) {
        alert(`${recipeTitle} is already in your favourites!`);
    } else {
        favorites.push({ id: recipeId, title: recipeTitle, image: recipeImage });
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert(`${recipeTitle} added to favourites!`);
    }
};

const displayFavorites = () => {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoritesContainer = document.getElementById("favorites-container");
    favoritesContainer.innerHTML = ''; // Clear previous results
    favorites.forEach(recipe => {
        const recipeHtml = `
            <div class='col-xl-4 col-md-6 portfolio-item'>
                <div class='portfolio-wrap'>
                    <a href='recipeDetails.html' data-gallery='portfolio-gallery-app' class='glightbox'>
                        <img src='${recipe.image}' class='img-fluid' alt=''/>
                    </a>
                    <div class='portfolio-info'>
                        <h4>${recipe.title}</h4>
                        <button class='btn btn-secondary'>View Details</button>
                        <button class='btn btn-danger' onclick='removeFromFavorites("${recipe.id}")'>Remove from Favourites</button>
                    </div>
                </div>
            </div>`;
        favoritesContainer.insertAdjacentHTML('beforeend', recipeHtml);
    });
};

const removeFromFavorites = (recipeId) => {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(recipe => recipe.id !== recipeId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    displayFavorites();
    alert('Recipe removed from favourites!');
};

// Call displayFavorites() when the favourites.html page is loaded
window.onload = displayFavorites;


