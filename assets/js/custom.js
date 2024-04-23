// nice select
$(document).ready(function () {
  $("select").niceSelect();
});

/** google_map js **/
function myMap() {
  var mapProp = {
    center: new google.maps.LatLng(40.712775, -74.005973),
    zoom: 18,
  };
  var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
}

// client section owl carousel
$(document).ready(function () {
  $(".client_owl-carousel").owlCarousel({
    loop: true,
    margin: 0,
    dots: false,
    nav: true,
    navText: [
      '<i class="fa fa-angle-left" aria-hidden="true"></i>',
      '<i class="fa fa-angle-right" aria-hidden="true"></i>',
    ],
    autoplay: true,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      1000: {
        items: 2,
      },
    },
  });
});

/*async function fetchRecipeById(id) {
  try {
    // Fetch the data from the JSON file
    const response = await fetch("blog_data.json");
    const data = await response.json();

    // Find the recipe with the matching ID
    const recipe = data.recipes.find((recipe) => recipe.id === id);

    if (recipe) {
      // Destructure the recipe object to extract its properties
      const { name, creator, summary, ingredients, instructions, macros } =
        recipe;

      // Return an object containing the recipe details
      return { name, creator, summary, ingredients, instructions, macros };
    } else {
      // If no recipe is found with the given ID, log an error message and return null
      console.log("Recipe with ID", id, "not found.");
      return null;
    }
  } catch (error) {
    // If an error occurs during fetching or parsing the JSON, log the error
    console.error("Error fetching data:", error);
    return null;
  }
}

// Define an async function to call fetchRecipeById
function loadRecipeDetails(recipeId) {
  try {
    // Call fetchRecipeById and await its result
    const recipeDetails = fetchRecipeById(recipeId);

    // Once the details are fetched, you can use them here
    if (recipeDetails) {
      console.log("Recipe Name:", recipeDetails.name);
      console.log("Creator:", recipeDetails.creator);
      console.log("Summary:", recipeDetails.summary);
      console.log("Ingredients:", recipeDetails.ingredients);
      console.log("Instructions:", recipeDetails.instructions);
      console.log("Macros:", recipeDetails.macros);
    } else {
      console.log("Recipe details not found.");
    }
  } catch (error) {
    console.error("Error loading recipe details:", error);
  }
}*/

// Call the async function to load recipe details

/*$(document).on("click", "a[href='#current-blog']", function (event) {
  var recipeId = $(this).attr("id");
  console.log("Clicked on recipe with ID:", recipeId);
  loadRecipeDetails(recipeId);
});

// OVO JE ZA SVE BLOGOVE NE DIRAJ RADI
$(document).ready(function () {
  $("a[href='#blog']").on("click", function (event) {
    fetchBlogPosts();
  });
});

async function fetchBlogPosts() {
  try {
    const response = await fetch("blog_data.json");
    const data = await response.json();

    let blogsHtml = "";

    data.recipes.forEach((recipe, index) => {
      blogsHtml += `
      <a href="#current-blog" id=${recipe.id}>
        <div class="col-sm-6 col-lg-4-blog all pizza">
          <div class="box">
            <div>
              <div class="img-box">
                <img src="assets/images/default_image.jpg" alt="${recipe.name}" />
              </div>
              <div class="detail-box">
                <h5 class="item-name">${recipe.name}</h5>
                <p class="creator">${recipe.creator}</p>
                <h6>${recipe.summary}</h6>
                <h6>${recipe.macros}</h6>
                <!-- You can add more details here if needed -->
              </div>
            </div>
          </div>
        </div>
      </a>  `;
    });

    // Display the generated HTML in the designated container
    $(".filters-content").html(blogsHtml);
  } catch (error) {
    console.error("Error fetching blog data:", error);
  }
}*/
