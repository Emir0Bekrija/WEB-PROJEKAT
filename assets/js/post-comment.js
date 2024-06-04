$(document).ready(function () {
  $(".SubmitComment").click(function (event) {
    event.preventDefault();
    // Get the text from the textarea
    var commentText = $("textarea[name='comment']").val();
    var blogID = $(".postTitle").attr("id");
    $("textarea[name='comment']").val("");
    //userID=currentUserId();
    userID = 1;

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
});
