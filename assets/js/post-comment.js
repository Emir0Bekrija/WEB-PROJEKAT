/*$(document).ready(function () {
  $(".SubmitComment").click(function (event) {
    event.preventDefault();
    // Get the text from the textarea
    var commentText = $("textarea[name='comment']").val();
    var blogID = $(".postTitle").attr("id");
    $("textarea[name='comment']").val("");
    //userID=currentUserId();
    var userID = Utils.get_from_localstorage("user").idUsers;

    // Do something with the comment text (e.g., submit it via AJAX)
    console.log("Comment text:", commentText);
    var commentData = {
      blogID: blogID,
      userID: userID,
      comment: commentText,
    };

    // Send the AJAX request
    $.ajax({
      url: "http://localhost/WEB-PROJEKAT/rest/comments",
      type: "POST",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(commentData),
      success: function (response) {
        // Handle success response
        console.log("Comment posted successfully:", response);
        BlogService.getBlogDetailsDelayed(blogID);
      },
      error: function (xhr, status, error) {
        // Handle error response
        console.error("Error posting comment:", error);
      },
    });
  });
});*/

$(document).ready(function () {
  $(".SubmitComment").click(function (event) {
    event.preventDefault();
    // Get the text from the textarea
    var commentText = $("textarea[name='comment']").val();
    var blogID = $(".postTitle").attr("id");
    $("textarea[name='comment']").val("");
    var userID = Utils.get_from_localstorage("user").idUsers;

    // Prepare comment data
    var commentData = {
      blogID: blogID,
      userID: userID,
      comment: commentText,
    };

    // Send the AJAX request using RestClient
    RestClient.post(
      "rest/comments",
      JSON.stringify(commentData),
      function (response) {
        // Handle success response
        console.log("Comment posted successfully:", response);
        BlogService.getBlogDetailsDelayed(blogID);
      },
      function (error) {
        // Handle error response
        console.error("Error posting comment:", error);
      }
    );
  });
});
