const BlogService = {
  getBlogDelayed: function () {
    setTimeout(function () {
      BlogService.getBlogs();
    }, 50);
  },

  getBlogs: function () {
    $.ajax({
      url: "blog_data.json",
      type: "GET",
      dataType: "json",
      success: function (data) {
        let blogsHtml = "";
        data.recipes.forEach((recipe, index) => {
          blogsHtml += `
                <a href="#current-blog" id=${recipe.id} onclick="BlogService.getBlogDetailsDelayed(${recipe.id})">
                    <div class="col-sm-6 col-lg-4-blog all pizza">
                    <div class="box">
                        <div>
                        <div class="img-box">
                            <img src="assets/images/f1.p" alt="${recipe.name}" />
                        </div>
                        <div class="detail-box">
                            <h5 class="item-name">${recipe.name}</h5>
                            <p class="creator">${recipe.creator}</p>
                            <h6>${recipe.summary}</h6>,
                            <h6>${recipe.macros}</h6>
                            <!-- You can add more details here if needed -->
                        </div>
                        </div>
                    </div>
                    </div>
                </a>  `;
        });
        $(".filters-content").html(blogsHtml);
      },
      error: function (xhr, status, error) {
        console.error("Error fetching data from file:", error);
      },
    });
  },

  getBlogDetailsDelayed: function (recipeId) {
    // Introduce a delay before calling getBlogDetails
    setTimeout(function () {
      BlogService.getBlogDetails(recipeId);
    }, 50);
  },

  getBlogDetails: function (recipeId) {
    $.ajax({
      url: "blog_data.json",
      type: "GET",
      dataType: "json",
      success: function (data) {
        const recipeDetails = data.recipes.find(
          (recipe) => recipe.id == recipeId
        );
        if (recipeDetails) {
          let creatorHtml = `<a href="#profile" id=${recipeDetails.userID} onclick="BlogService.getProfilegDetailsDelayed(${recipeDetails.userID})">${recipeDetails.creator}</a>`;
          $(".postCreator").html(creatorHtml);
          let Title = `<h2 class="postTitle" id="${recipeDetails.id}">${recipeDetails.name}</h2>`;
          $(".heading_container_titlePost").html(Title);
          $(".postSummary").html(recipeDetails.summary);
          let ingredientsHtml = "";
          recipeDetails.ingredients.forEach((ingredient) => {
            ingredientsHtml += `<li>${ingredient}</li>`;
          });
          $(".ingredientsList").html(ingredientsHtml);
          let instructionsHtml = "";
          recipeDetails.instructions.forEach((instruction) => {
            instructionsHtml += `<li>${instruction}</li>`;
          });
          $(".instructionsList").html(instructionsHtml);
          $(".Macros").html(recipeDetails.macros);
          BlogService.getComments(recipeId);
        } else {
          console.log("Recipe details not found.");
        }
      },
      error: function (xhr, status, error) {
        console.error("Error fetching data from file:", error);
      },
    });
  },

  getComments: function (recipeId) {
    $.ajax({
      url: "comments.json",
      type: "GET",
      dataType: "json",
      success: function (data) {
        let commentsHtml = "";
        data.comments.forEach((comment, index) => {
          if (comment.blogID == recipeId) {
            commentsHtml += `
                <div class="item">
                  <div class="box">
                    <div class="detail-box">
                      <h5>${comment.comment}</p>
                      <p>${comment.username}</p>

                    </div>
                    <div class="img-box">
                      <img src="" alt="" class="box-img" />
                    </div>
                  </div>
                </div>`;
          }
        });
        $(".client_owl-carousel").html(commentsHtml);
      },
      error: function (xhr, status, error) {
        console.error("Error fetching data from file:", error);
      },
    });
  },

  getProfilegDetailsDelayed: function (userID) {
    // Introduce a delay before calling getBlogDetails
    setTimeout(function () {
      BlogService.getProfile(userID);
    }, 50);
  },
  getProfile: function (userID) {
    $.ajax({
      url: "profile_data.json",
      type: "GET",
      dataType: "json",
      success: function (data) {
        const profileDetails = data.profiles.find(
          (profile) => profile.userID == userID
        );
        if (profileDetails) {
          $(".creatorName").html(profileDetails.username);
          $(".creatorSummary").html(profileDetails.bio);
          BlogService.getBlogsByID(userID);
        }
      },
    });
  },

  getBlogsByID: function (userID) {
    $.ajax({
      url: "blog_data.json",
      type: "GET",
      dataType: "json",
      success: function (data) {
        let blogsHtml = "";
        data.recipes.forEach((recipe, index) => {
          if (recipe.userID == userID) {
            blogsHtml += `
                <a href="#current-blog" id=${recipe.id} onclick="BlogService.getBlogDetailsDelayed(${recipe.id})">
                    <div class="col-sm-6 col-lg-4-blog all pizza">
                    <div class="box">
                        <div>
                        <div class="img-box">
                            <img src="assets/images/f1.p" alt="${recipe.name}" />
                        </div>
                        <div class="detail-box">
                            <h5 class="item-name">${recipe.name}</h5>
                            <p class="creator">${recipe.creator}</p>
                            <h6>${recipe.summary}</h6>,
                            <h6>${recipe.macros}</h6>
                            <!-- You can add more details here if needed -->
                        </div>
                        </div>
                    </div>
                    </div>
                </a>  `;
          }
        });
        $(".filters-content").html(blogsHtml);
      },
      error: function (xhr, status, error) {
        console.error("Error fetching data from file:", error);
      },
    });
  },
};
