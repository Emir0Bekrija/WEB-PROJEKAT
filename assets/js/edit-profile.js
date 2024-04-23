$(document).ready(function () {
  $("#editProfileButton").click(function (event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Get values from textareas
    var name = $("textarea[name='name']").val();
    var bio = $("textarea[name='bio']").val();

    // Log the values to console
    console.log("Name:", name);
    console.log("Bio:", bio);

    var profileData = {
      name: name,
      bio: bio,
    };

    // Perform the PUT request
    $.ajax({
      url: "profile_data.json",
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
