const FavouritesService = {
  getFavourites: function ($id) {
    $.ajax({
      url: "/favourites",
      type: "GET",
      dataType: "json",
      success: function (data) {},
    });
  },
};
