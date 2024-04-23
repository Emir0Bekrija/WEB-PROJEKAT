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

    /*console.log("Name:", name);
    console.log("Summary:", summary);
    console.log("Macros:", macros);
    console.log("Ingredient values:", ingredientValues);
    console.log("Instruction values:", instructionValues);*/

    var blogData = {
      userId: 1,
      Name: name,
      Summary: summary,
      Ingredients: ingredientValues,
      Instructions: instructionValues,
      Macros: macros,
    };

    $.ajax({
      //url: "blog_data.json",
      url: "rest/add_blog.php",
      type: "POST",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(blogData),
      success: function (response) {
        // Handle success response
        console.log("Blog posted successfully:", response);
      },
      error: function (xhr, status, error) {
        // Handle error response
        console.error("Error posting Blog:", error);
      },
    });
  });
});
