const BlogService = {
  getBlogDelayed: function () {
    setTimeout(function () {
      BlogService.getBlogs();
    }, 50);
  },

  getBlogs: function () {
    $.ajax({
      url: "http://localhost/WEB-PROJEKAT/rest/blogs",
      type: "GET",
      dataType: "json",
      success: function (data) {
        let blogsHtml = "";
        let recipe = data;
        if (recipe.length != 0) {
          for (let i = 0; i < recipe.length; i++) {
            blogsHtml += `
                <a href="#current-blog" id=${recipe[i].idblogs} onclick="BlogService.getBlogDetailsDelayed(${recipe[i].idblogs})">
                    <div class="col-sm-6 col-lg-4-blog all pizza">
                    <div class="box">
                        <div>
                        <div class="img-box">
                            <img src="assets/images/f1.p" alt="${recipe[i].Name}" />
                        </div>
                        <div class="detail-box">
                            <h5 class="item-name">${recipe[i].Name}</h5>
                            <p class="creator">${recipe[i].UserId}</p>
                            <h6>${recipe[i].Summary}</h6>,
                            <h6>${recipe[i].Macros}</h6>
                            <!-- You can add more details here if needed -->
                        </div>
                        </div>
                    </div>
                    </div>
                </a>  `;
          }
        }
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
      url: "http://localhost/WEB-PROJEKAT/rest/blogs/" + recipeId,
      type: "GET",
      dataType: "json",
      success: function (data) {
        const recipeDetails = data;
        $.ajax({
          url:
            "http://localhost/WEB-PROJEKAT/rest/users/" + recipeDetails.UserId,
          type: "GET",
          dataType: "json",
          success: function (data) {
            const profileDetails = data;
            let username = profileDetails.Name + " " + profileDetails.Surname;
            let creatorHtml = `<a href="#profile" id=${recipeDetails.UserId} onclick="BlogService.getProfilegDetailsDelayed(${recipeDetails.UserId})">${username}</a>`;
            $(".postCreator").html(creatorHtml);
          },
        });
        let Title = `<h2 class="postTitle" id="${recipeDetails.idblogs}">${recipeDetails.Name}</h2>`;
        $(".heading_container_titlePost").html(Title);
        $(".postSummary").html(recipeDetails.Summary);

        $.ajax({
          url: "http://localhost/WEB-PROJEKAT/rest/ingredients/" + recipeId,
          type: "GET",
          dataType: "json",
          success: function (data) {
            let ingredientsHtml = "";
            for (let i = 0; i < data.length; i++) {
              ingredientsHtml += `<li>${data[i].ingredient}</li>`;
            }
            $(".ingredientsList").html(ingredientsHtml);
          },
        });

        $.ajax({
          url: "http://localhost/WEB-PROJEKAT/rest/instructions/" + recipeId,
          type: "GET",
          dataType: "json",
          success: function (data) {
            let instructionsHtml = "";
            for (let i = 0; i < data.length; i++) {
              instructionsHtml += `<li>${data[i].instruction}</li>`;
            }
            $(".instructionsList").html(instructionsHtml);
          },
        });

        $(".Macros").html(recipeDetails.Macros);
        BlogService.getComments(recipeId);
      },
      error: function (xhr, status, error) {
        console.error("Error fetching data from file:", error);
      },
    });
  },

  getComments: function (recipeId) {
    $.ajax({
      url: "http://localhost/WEB-PROJEKAT/rest/comments/" + recipeId,
      type: "GET",
      dataType: "json",
      success: function (data) {
        let commentsHtml = "";
        for (let i = 0; i < data.length; i++) {
          commentsHtml += `
                <div class="item">
                  <div class="box">
                    <div class="detail-box">
                      <h5>${data[i].comment}</p>
                      <p></p>

                    </div>
                    <div class="img-box">
                      <img src="" alt="" class="box-img" />
                    </div>
                  </div>
                </div>`;
        }
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
      url: "http://localhost/WEB-PROJEKAT/rest/users/" + userID,
      type: "GET",
      dataType: "json",
      success: function (data) {
        const profileDetails = data;
        let username = profileDetails.Name + " " + profileDetails.Surname;
        $(".creatorUsername").html(username);
        $(".creatorName").html(profileDetails.username);
        $(".creatorSummary").html(profileDetails.bio);
        BlogService.getBlogsByID(userID);
      },
    });
  },

  getBlogsByID: function (userID) {
    $.ajax({
      url: "http://localhost/WEB-PROJEKAT/rest/blogs_by_user/" + userID,
      type: "GET",
      dataType: "json",
      success: function (data) {
        let blogsHtml = "";
        let recipe = data;
        if (recipe.length != 0) {
          for (let i = 0; i < recipe.length; i++) {
            blogsHtml += `
                <a href="#current-blog" id=${recipe[i].idblogs} onclick="BlogService.getBlogDetailsDelayed(${recipe[i].idblogs})">
                    <div class="col-sm-6 col-lg-4-blog all pizza">
                    <div class="box">
                        <div>
                        <div class="img-box">
                            <img src="assets/images/f1.p" alt="${recipe[i].Name}" />
                        </div>
                        <div class="detail-box">
                            <h5 class="item-name">${recipe[i].Name}</h5>
                            <p class="creator">${recipe[i].UserId}</p>
                            <h6>${recipe[i].Summary}</h6>,
                            <h6>${recipe[i].Macros}</h6>
                            <!-- You can add more details here if needed -->
                        </div>
                        </div>
                    </div>
                    </div>
                </a>  `;
          }
        }
        $(".filters-content").html(blogsHtml);
      },
      error: function (xhr, status, error) {
        console.error("Error fetching data from file:", error);
      },
    });
  },
};
