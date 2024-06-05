const BlogService = {
  getBlogDelayed: function () {
    BlogService.getBlogs();
  },

  getBlogs: function () {
    RestClient.get(
      "rest/blogs",
      function (data) {
        let blogsHtml = "";
        let recipe = data;
        if (recipe.length != 0) {
          for (let i = 0; i < recipe.length; i++) {
            blogsHtml += `
                <a href="#current-blog" id=${
                  recipe[i].idblogs
                } onclick="BlogService.getBlogDetailsDelayed(${
              recipe[i].idblogs
            })">
                    <div class="col-sm-6 col-lg-4-blog all pizza">
                    <div class="box">
                        <div>
                        <div class="img-box">
                            <img src="${
                              recipe[i].Image
                                ? "data:image/jpeg;base64," + recipe[i].Image
                                : "assets/images/about-img.png"
                            }" alt="${recipe[i].Name}" />
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
      function (error) {
        console.error("Error fetching data from file:", error);
      }
    );
  },

  getBlogDetailsDelayed: function (recipeId) {
    setTimeout(function () {
      BlogService.getBlogDetails(recipeId);
    }, 30);
  },

  getBlogDetails: function (recipeId) {
    localStorage.removeItem("recipeId");
    localStorage.setItem("recipeId", recipeId);
    // Change the src attribute of the image with ID 'picture' using jQuery

    RestClient.get(
      "rest/blogs/" + recipeId,
      function (blogData) {
        const userPromise = new Promise(function (resolve, reject) {
          RestClient.get("rest/users/" + blogData.UserId, resolve, reject);
        });

        const ingredientsPromise = new Promise(function (resolve, reject) {
          RestClient.get("rest/ingredients/" + recipeId, resolve, reject);
        });

        const instructionsPromise = new Promise(function (resolve, reject) {
          RestClient.get("rest/instructions/" + recipeId, resolve, reject);
        });

        Promise.all([userPromise, ingredientsPromise, instructionsPromise])
          .then(function (responses) {
            const [userData, ingredientsData, instructionsData] = responses;

            const username = userData.Name + " " + userData.Surname;
            const creatorHtml = `<a href="#profile" id="${blogData.UserId}" class="profile-link" onclick="BlogService.getProfileDetailsDelayed(${blogData.UserId}) ">${username}</a>`;
            $(".postCreator").html(creatorHtml);

            // Change the src attribute of the image with ID 'picture' using jQuery
            $("#picture").attr(
              "src",
              blogData.Image
                ? "data:image/jpeg;base64," + blogData.Image
                : "assets/images/about-img.png"
            );

            const titleHtml = `<h2 class="postTitle" id="${blogData.idblogs}">${blogData.Name}</h2>`;
            $(".heading_container_titlePost").html(titleHtml);
            $(".postSummary").html(blogData.Summary);

            const ingredientsHtml = ingredientsData
              .map((ingredient) => `<li>${ingredient.ingredient}</li>`)
              .join("");
            $(".ingredientsList").html(ingredientsHtml);

            const instructionsHtml = instructionsData
              .map((instruction) => `<li>${instruction.instruction}</li>`)
              .join("");
            $(".instructionsList").html(instructionsHtml);

            $(".Macros").html(blogData.Macros);

            BlogService.getComments(recipeId);
          })
          .catch(function (error) {
            console.error("Error fetching data:", error);
          });
      },
      function (error) {
        console.error("Error fetching blog details:", error);
      }
    );
  },

  getComments: function (recipeId) {
    RestClient.get(
      "rest/comments/" + recipeId,
      function (data) {
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
      function (error) {
        console.error("Error fetching data from file:", error);
      }
    );
  },

  getProfileDetailsDelayed: function (userID) {
    setTimeout(function () {
      BlogService.getProfile(userID);
    }, 50);
  },

  getProfile: function (userID) {
    RestClient.get(
      "rest/users/" + userID,
      function (data) {
        const profileDetails = data;
        let username = profileDetails.Name + " " + profileDetails.Surname;
        $(".creatorUsername").html(username);
        $(".creatorName").html(profileDetails.username);
        $(".creatorSummary").html(profileDetails.bio);
        $("#picture").attr(
          "src",
          `${
            data.Image
              ? "data:image/jpeg;base64," + data.Image
              : "assets/images/about-img.png"
          }`
        );

        BlogService.getBlogsByID(userID);
      },
      function (error) {
        console.error("Error fetching profile details:", error);
      }
    );
  },

  getBlogsByID: function (userID) {
    RestClient.get(
      "rest/blogs_by_user/" + userID,
      function (data) {
        let blogsHtml = "";
        let recipe = data;
        if (recipe.length != 0) {
          for (let i = 0; i < recipe.length; i++) {
            blogsHtml += `
                <a href="#current-blog" id=${
                  recipe[i].idblogs
                } onclick="BlogService.getBlogDetailsDelayed(${
              recipe[i].idblogs
            })">
                    <div class="col-sm-6 col-lg-4-blog all pizza">
                    <div class="box">
                        <div>
                        <div class="img-box">
                            <img src="${
                              recipe[i].Image
                                ? "data:image/jpeg;base64," + recipe[i].Image
                                : "assets/images/about-img.png"
                            }" alt="${recipe[i].Name}" />
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
      function (error) {
        console.error("Error fetching data from file:", error);
      }
    );
  },
};
