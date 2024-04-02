// to get current year
function getYear() {
  var currentDate = new Date();
  var currentYear = currentDate.getFullYear();
  document.querySelector("#displayYear").innerHTML = currentYear;
}

getYear();

// isotope js
$(window).on("load", function () {
  $(".filters_menu li").click(function () {
    $(".filters_menu li").removeClass("active");
    $(this).addClass("active");

    var data = $(this).attr("data-filter");
    $grid.isotope({
      filter: data,
    });
  });

  var $grid = $(".grid").isotope({
    itemSelector: ".all",
    percentPosition: false,
    masonry: {
      columnWidth: ".all",
    },
  });
});

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
$(".client_owl-carousel").owlCarousel({
  loop: true,
  margin: 0,
  dots: false,
  nav: true,
  navText: [],
  autoplay: true,
  autoplayHoverPause: true,
  navText: [
    '<i class="fa fa-angle-left" aria-hidden="true"></i>',
    '<i class="fa fa-angle-right" aria-hidden="true"></i>',
  ],
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

/*let blogsHtml = "";

    blogHtml += `
      <section id="blogSection" class="about_section layout_padding">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <div class="img-box">
                        <img src="assets/images/f1.png" alt="" />
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="detail-box">
                        <div class="heading_container">
                            <h2 class="postTitle"></h2>
                        </div>
                        <p class="postDescription">
                          
                        <h2>Creator: <a href="#profile"></a></h2>
                        <button class="obrisi">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
    `;*/

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
async function loadRecipeDetails() {
  const recipeId = 3; // ID of the recipe you want to get details for

  try {
    // Call fetchRecipeById and await its result
    const recipeDetails = await fetchRecipeById(recipeId);

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
}

// Call the async function to load recipe details
loadRecipeDetails();*/
document.addEventListener("DOMContentLoaded", async function () {
  // Wait for the DOM to be fully loaded

  // Get all the <a> elements with the href "#current-blog"
  const recipeLinks = document.querySelectorAll('a[href="#current-blog"]');

  // Add a click event listener to each <a> element
  recipeLinks.forEach(function (link) {
    link.addEventListener("click", async function (event) {
      // Prevent the default action of the link
      event.preventDefault();

      // Get the value of the href attribute of the clicked <a> element
      const linkHref = link.getAttribute("href");

      // Get the value of the id attribute of the clicked <a> element
      const recipeId = link.getAttribute("id");

      // Log or use the recipeId as needed
      console.log("Clicked recipe ID:", recipeId);

      // Navigate to the link provided in the href attribute
      window.location.href = linkHref;
    });
  });
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
}
