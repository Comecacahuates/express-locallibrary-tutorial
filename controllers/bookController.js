const Book = require("../models/book");
const Author = require("../models/author");
const Genre = require("../models/genre");
const BookInstance = require("../models/bookinstance");
const { body, validationResult } = require("express-validator");

const async = require("async");

/**
 * Display home page.
 */
exports.index = (request, response) => {
  async.parallel(
    {
      book_count: (callback) => Book.countDocuments({}, callback),

      bookinstance_count: (callback) =>
        BookInstance.countDocuments({}, callback),

      bookinstance_available_count: (callback) =>
        BookInstance.countDocuments({ status: "Available" }, callback),

      author_count: (callback) => Author.countDocuments({}, callback),

      genre_count: (callback) => Genre.countDocuments({}, callback),
    },

    (error, results) => {
      response.render("index", {
        title: "Local Libreary Home",
        error: error,
        data: results,
      });
    }
  );
};

/**
 * Display list of all books.
 */
exports.book_list = (request, response, next) => {
  Book.find({}, "title author")
    .populate("author")
    .exec((error, book_list) => {
      if (error) {
        return next(error);
      }
      response.render("book_list", {
        title: "Book List",
        book_list,
      });
    });
};

/**
 * Display detail page for a specific book.
 */
exports.book_detail = (request, response, next) => {
  async.parallel(
    {
      book: (callback) =>
        Book.findById(request.params.id)
          .populate("author")
          .populate("genres")
          .exec(callback),

      bookinstances: (callback) =>
        BookInstance.find({ book: request.params.id }).exec(callback),
    },

    (error, results) => {
      if (error) {
        return next(error);
      }
      console.log(results.book);
      if (results.book === null) {
        const error = new Error("Book not found");
        error.status = 404;
        return next(error);
      }
      response.render("book_detail", {
        title: results.book.title,
        ...results,
      });
    }
  );
};

/**
 * Display book create form on GET.
 */
exports.book_create_get = (request, response, next) => {
  // Get all authors and genres, which can be used for adding a book.
  async.parallel(
    {
      authors: (callback) => Author.find(callback),

      genres: (callback) => Genre.find(callback),
    },

    (error, results) => {
      if (error) {
        return next(error);
      }
      response.render("book_form", {
        title: "Create Book",
        ...results,
      });
    }
  );
};

/**
 * Handle book create on Post.
 */
exports.book_create_post = [
  // Convert the genre to an array.
  (request, response, next) => {
    if (!(request.body.genres instanceof Array)) {
      if (typeof request.body.genres === "undefined") {
        request.body.genres = [];
      } else {
        request.body.genres = new Array(request.body.genres);
      }
    }
    next();
  },

  // Validate and sanitise fields.
  body("title", "Title must not be empty").trim().isLength({ min: 1 }).escape(),
  body("author", "Author must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("summary", "Summary must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("isbn", "ISBN must not be empty").trim().isLength({ min: 1 }).escape(),
  body("genres.*").escape(),

  // Process request after validation and sanitisation.
  (request, response, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(request);

    // If there are errors, render form again with sanitized values and error messages.
    if (!errors.isEmpty()) {
      // Get all authors and genres for form.
      async.parallel(
        {
          authors: (callback) => Author.find(callback),

          genres: (callback) => Genre.find(callback),
        },

        (error, results) => {
          if (error) {
            return next(error);
          }

          // Mark selected genres as checked.
          results.genres.forEach((genre, i) => {
            if (request.body.genres.indexOf(results.genres[i]._id)) {
              results.genres[i].checked = true;
            }
          });

          response.render("book_form", {
            title: "Create Book",
            ...results,
            book: request.body,
            errors: errors.array(),
          });
        }
      );
      return;
    }

    // Create a book object with escaped and trimed data.
    const book = new Book({ ...request.body });

    book.save((error) => {
      if (error) {
        return next(error);
      }
      response.redirect(book.url);
    });
  },
];

/**
 * Display book delete form on GET.
 */
exports.book_delete_get = (request, response) => {
  response.send("NOT IMPLEMENTED: Book delete GET");
};

/**
 * Handle book delete on POST.
 */
exports.book_delete_post = (request, response) => {
  response.send("NOT IMPLEMENTED: Book delete POST");
};

/**
 * Display book update form on GET.
 */

exports.book_update_get = (request, response) => {
  response.send("NOT IMPLEMENTED: Book update GET");
};

/**
 * Handle book updateon POST.
 */
exports.book_update_post = (request, response) => {
  response.send("NOT IMPLEMENTED: Book update POST");
};
