$(document).ready(function () {
  $("#editProfileButton").click(function (event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Get values from textareas
    var name = $("textarea[name='name']").val();
    var username = $("textarea[name='username']").val();
    var bio = $("textarea[name='bio']").val();

    var nameArray = name.split(" ");

    // Pop the last element to get the surname
    var surname = nameArray.pop();

    // Join the remaining elements to get the first name
    var firstName = nameArray.join(" ");

    // Log the values to console
    console.log("Name:", firstName);
    console.log("Surname:", surname);
    console.log("Bio:", bio);
    console.log("Username:", username);

    var profileData = {
      Name: firstName,
      Surname: surname,
      bio: bio,
      username: username,
    };

    // trebam stavit da update tacnog uzera
    $.ajax({
      url: "http://localhost/WEB-PROJEKAT/rest/users/1",
      type: "PUT",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(profileData),
      success: function (response) {
        // Handle success response
        console.log("Profile updated successfully:", response);
      },
      error: function (xhr, status, error) {
        // Handle error response
        console.error("Error updating profile:", error);
      },
    });
  });
});
