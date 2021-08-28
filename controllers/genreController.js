const Genre = require("../models/genre");
const Book = require("../models/book");
const async = require("async");

/**
 * Display list of all genres.
 */
exports.genre_list = (request, response, next) => {
  Genre.find()
    .sort([["name", "ascending"]])
    .exec((error, genre_list) => {
      if (error) {
        return next(error);
      }
      response.render("genre_list", {
        title: "Genre List",
        genre_list,
      });
    });
};

/**
 * Display detail page for a specific genre.
 */
exports.genre_detail = (request, response, next) => {
  async.parallel(
    {
      genre: (callback) => {
        Genre.findById(request.params.id).exec(callback);
      },

      genre_books: (callback) => {
        Book.find({ genre: request.params.id }).exec(callback);
      },
    },

    (error, results) => {
      if (error) {
        return next(error);
      }
      if (results.genre === null) {
        const error = new Error("Genre not found");
        error.status = 404;
        return next(error);
      }
      response.render("genre_detail", {
        title: "Genre Detail",
        genre: results.genre,
        genre_books: results.genre_books,
      });
    }
  );
};

/**
 * Display genre create form on GET.
 */
exports.genre_create_get = (request, response) => {
  response.send("NOT IMPLEMENTED: Genre create GET");
};

/**
 * Handle genre create on POST.
 */
exports.genre_create_post = (request, response) => {
  response.send("NOT IMPLEMENTED: Genre create POST");
};

/**
 * Display genre delete form on GET.
 */
exports.genre_delete_get = (request, response) => {
  response.send("NOT IMPLEMENTED: Genre delete GET");
};

/**
 * Handle genre delete on POST.
 */
exports.genre_delete_post = (request, response) => {
  response.send("NOT IMPLEMENTED: Genre delete POST");
};

/**
 * Display genre update form on GET.
 */
exports.genre_update_get = (request, response) => {
  response.send("NOT IMPLEMENTED: Genre update GET");
};

/**
 * Handle genre update on POST.
 */
exports.genre_update_post = (request, response) => {
  response.send("NOT IMPLEMENTED: Genre update POST");
};
