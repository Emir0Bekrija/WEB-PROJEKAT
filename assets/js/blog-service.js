const BlogService = {
  getBlogDelayed: function () {
    BlogService.getBlogs();
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
    }, 30);
  },

  getBlogDetails: function (recipeId) {
    localStorage.removeItem("recipeId"); //PRIJE BILO CLEAR
    localStorage.setItem("recipeId", recipeId);
    // Fetch blog details
    $.ajax({
      url: "http://localhost/WEB-PROJEKAT/rest/blogs/" + recipeId,
      type: "GET",
      dataType: "json",
      success: function (blogData) {
        const userPromise = $.ajax({
          url: "http://localhost/WEB-PROJEKAT/rest/users/" + blogData.UserId,
          type: "GET",
          dataType: "json",
        });

        const ingredientsPromise = $.ajax({
          url: "http://localhost/WEB-PROJEKAT/rest/ingredients/" + recipeId,
          type: "GET",
          dataType: "json",
        });

        const instructionsPromise = $.ajax({
          url: "http://localhost/WEB-PROJEKAT/rest/instructions/" + recipeId,
          type: "GET",
          dataType: "json",
        });

        Promise.all([userPromise, ingredientsPromise, instructionsPromise])
          .then(function (responses) {
            const [userData, ingredientsData, instructionsData] = responses;

            // Update user information
            const username = userData.Name + " " + userData.Surname;
            const creatorHtml = `<a href="#profile" id="${blogData.UserId}" onclick="BlogService.getProfileDetailsDelayed(${blogData.UserId})">${username}</a>`;
            $(".postCreator").html(creatorHtml);

            // Update blog title and summary
            const titleHtml = `<h2 class="postTitle" id="${blogData.idblogs}">${blogData.Name}</h2>`;
            $(".heading_container_titlePost").html(titleHtml);
            $(".postSummary").html(blogData.Summary);

            // Update ingredients list
            const ingredientsHtml = ingredientsData
              .map((ingredient) => `<li>${ingredient.ingredient}</li>`)
              .join("");
            $(".ingredientsList").html(ingredientsHtml);

            // Update instructions list
            const instructionsHtml = instructionsData
              .map((instruction) => `<li>${instruction.instruction}</li>`)
              .join("");
            $(".instructionsList").html(instructionsHtml);

            // Update macros
            $(".Macros").html(blogData.Macros);

            // Load comments
            BlogService.getComments(recipeId);
          })
          .catch(function (error) {
            console.error("Error fetching data:", error);
          });
      },
      error: function (xhr, status, error) {
        console.error("Error fetching blog details:", error);
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

  getProfileDetailsDelayed: function (userID) {
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
        console.log(data);
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
