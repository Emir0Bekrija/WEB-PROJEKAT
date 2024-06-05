/*function collectIngredientValues() {
  var ingredientValues = [];

  // Iterate over each textarea within #ingredientContainer
  $("#ingredientContainer textarea").each(function () {
    // Get the value of the current textarea and push it to the array
    var value = $(this).val();
    ingredientValues.push(value);
  });

  return ingredientValues;
}

function collectInstructionValues() {
  var instructionValues = [];

  // Iterate over each textarea within #ingredientContainer
  $("#instructionsContainer textarea").each(function () {
    // Get the value of the current textarea and push it to the array
    var value = $(this).val();
    instructionValues.push(value);
  });

  return instructionValues;
}

$(document).ready(function () {
  $(".postBlog").click(function (event) {
    event.preventDefault();
    var name = $("textarea[name='titleName']").val();
    var summary = $("textarea[name='summary']").val();
    var ingredientValues = collectIngredientValues();
    var instructionValues = collectInstructionValues();
    var macros = $("textarea[name='macros']").val();
    var userId = Utils.get_from_localstorage("user").idUsers;

    var blogData = {
      UserId: userId,
      Name: name,
      Summary: summary,
      Macros: macros,
    };

    $.ajax({
      //url: "blog_data.json",
      url: "http://localhost/WEB-PROJEKAT/rest/postBlog/",
      type: "POST",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(blogData),
      success: function (response) {
        // Handle success response
        for (var i = 0; i < ingredientValues.length; i++) {
          var ingredientData = {
            blogId: response[1],
            Ingredient: ingredientValues[i],
          };

          $.ajax({
            url: "http://localhost/WEB-PROJEKAT/rest/postIngredient/",
            type: "POST",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(ingredientData),
            success: function (response) {
              console.log("Ingredient posted successfully:", response);
            },
            error: function (xhr, status, error) {
              // Handle error response
              console.error("Error posting Ingredient:", error);
            },
          });
        }

        for (var i = 0; i < instructionValues.length; i++) {
          var instructionData = {
            blogId: response[1],
            Instruction: instructionValues[i],
          };

          $.ajax({
            url: "http://localhost/WEB-PROJEKAT/rest/postInstruction/",
            type: "POST",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(instructionData),
            success: function (response) {
              console.log("Instruction posted successfully:", response);
            },
            error: function (xhr, status, error) {
              // Handle error response
              console.error("Error posting Instruction:", error);
            },
          });
        }
        console.log("Blog posted successfully:", response[1]);
        toastr.success("Blog posted successfully");
        $("textarea[name='titleName']").val("");
        $("textarea[name='summary']").val("");
        $("textarea[name='macros']").val("");
      },
      error: function (xhr, status, error) {
        // Handle error response
        console.error("Error posting Blog:", error);
      },
    });
  });
});*/
var base_url = Constants.get_api_base_url();
function collectIngredientValues() {
  var ingredientValues = [];

  // Iterate over each textarea within #ingredientContainer
  $("#ingredientContainer textarea").each(function () {
    // Get the value of the current textarea and push it to the array
    var value = $(this).val();
    ingredientValues.push(value);
  });

  return ingredientValues;
}

function collectInstructionValues() {
  var instructionValues = [];

  // Iterate over each textarea within #ingredientContainer
  $("#instructionsContainer textarea").each(function () {
    // Get the value of the current textarea and push it to the array
    var value = $(this).val();
    instructionValues.push(value);
  });

  return instructionValues;
}

$(document).ready(function () {
  $(".postBlog").click(function (event) {
    event.preventDefault();
    var name = $("textarea[name='titleName']").val();
    var summary = $("textarea[name='summary']").val();
    var ingredientValues = collectIngredientValues();
    var instructionValues = collectInstructionValues();
    var macros = $("textarea[name='macros']").val();
    var userId = Utils.get_from_localstorage("user").idUsers;

    var blogData = {
      UserId: userId,
      Name: name,
      Summary: summary,
      Macros: macros,
    };

    var file = $("#file")[0].files[0];

    // Ensure a file is selected
    if (!file) {
      alert("Please select an image file.");
      return;
    }

    // Ensure FileReader is supported
    if (!window.FileReader) {
      alert("FileReader API is not supported by your browser.");
      return;
    }

    var reader = new FileReader();

    reader.onloadend = function () {
      var base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
      var blogData = {
        UserId: userId,
        Name: name,
        Summary: summary,
        Macros: macros,
        Image: base64String,
      };
      $.ajax({
        //url: "blog_data.json",
        url: base_url + "rest/postBlog/",
        type: "POST",
        headers: {
          Authentication: Utils.get_from_localstorage("user").token,
        },
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(blogData),
        success: function (response) {
          // Handle success response
          for (var i = 0; i < ingredientValues.length; i++) {
            var ingredientData = {
              blogId: response[1],
              Ingredient: ingredientValues[i],
            };

            $.ajax({
              url: base_url + "rest/postIngredient/",
              type: "POST",
              headers: {
                Authentication: Utils.get_from_localstorage("user").token,
              },
              dataType: "json",
              contentType: "application/json",
              data: JSON.stringify(ingredientData),
              success: function (response) {
                console.log("Ingredient posted successfully:", response);
              },
              error: function (xhr, status, error) {
                // Handle error response
                console.error("Error posting Ingredient:", error);
              },
            });
          }

          for (var i = 0; i < instructionValues.length; i++) {
            var instructionData = {
              blogId: response[1],
              Instruction: instructionValues[i],
            };

            $.ajax({
              url: base_url + "rest/postInstruction/",
              type: "POST",
              headers: {
                Authentication: Utils.get_from_localstorage("user").token,
              },
              dataType: "json",
              contentType: "application/json",
              data: JSON.stringify(instructionData),
              success: function (response) {
                console.log("Instruction posted successfully:", response);
              },
              error: function (xhr, status, error) {
                // Handle error response
                console.error("Error posting Instruction:", error);
              },
            });
          }
          console.log("Blog posted successfully:", response[1]);
          toastr.success("Blog posted successfully");
          $("textarea[name='titleName']").val("");
          $("textarea[name='summary']").val("");
          $("textarea[name='macros']").val("");
        },
        error: function (xhr, status, error) {
          // Handle error response
          console.error("Error posting Blog:", error);
        },
      });
    };

    reader.readAsDataURL(file);
  });
});
