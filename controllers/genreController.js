const Genre = require("../models/genre");
const Book = require("../models/book");
const async = require("async");
const { body, validationResult } = require("express-validator");

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
        ...results,
      });
    }
  );
};

/**
 * Display genre create form on GET.
 */
exports.genre_create_get = (request, response, next) => {
  response.render("genre_form", { title: "Create Genre" });
};

/**
 * Handle genre create on POST.
 */
exports.genre_create_post = [
  // Validate and sanitize the name field.
  body("name", "Genre name required").trim().isLength({ min: 1 }).escape(),

  // Process request after validation and sanitization.
  (request, response, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(request);

    // If there are errors, render form again with sanitized values and error messages.
    if (!errors.isEmpty()) {
      response.render("genre_form", {
        title: "Create Genre",
        genre: request.body,
        errors: errors.array(),
      });
      return;
    }

    // Create a genre object with escaped and trimmed data.
    const genre = new Genre({ ...request.body });

    // If data from form is valid, check if genre with same name already exists.
    Genre.findOne({ name: request.body.name }).exec((error, found_genre) => {
      if (error) {
        return next();
      }
      if (found_genre) {
        response.redirect(found_genre.url);
        return;
      }
      genre.save((error) => {
        if (error) {
          return next(error);
        }
        response.redirect(genre.url);
      });
    });
  },
];

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
