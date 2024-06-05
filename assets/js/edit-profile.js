/* OLD EDIT PROFILE*/
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

    var userId = Utils.get_from_localstorage("user").idUsers;

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
      var profileData = {
        Name: firstName,
        Surname: surname,
        bio: bio,
        username: username,
        Image: base64String,
      };

      $.ajax({
        url: "http://localhost/WEB-PROJEKAT/rest/users/" + userId,
        type: "PUT",
        headers: {
          Authentication: Utils.get_from_localstorage("user").token,
        },
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
    };

    reader.readAsDataURL(file);

    // trebam stavit da update tacnog uzera
  });
});
