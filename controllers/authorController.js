const async = require("async");
const Author = require("../models/author");
const Book = require("../models/book");
const { body, validationResult } = require("express-validator");

/**
 * Display list of all authors.
 */
exports.author_list = (request, response, next) => {
  Author.find()
    .sort([["familiy_name", "ascending"]])
    .exec((error, author_list) => {
      if (error) {
        return next(error);
      }
      response.render("author_list", {
        title: "Author List",
        author_list,
      });
    });
};

/**
 * Display detail page for a specific author.
 */
exports.author_detail = (request, response, next) => {
  async.parallel(
    {
      author: (callback) => Author.findById(request.params.id).exec(callback),

      author_books: (callback) =>
        Book.find({ author: request.params.id }, "title summary").exec(
          callback
        ),
    },

    (error, results) => {
      if (error) {
        return next(error);
      }
      if (results.author === null) {
        const error = new Error("Author not found");
        error.status = 404;
        return next(error);
      }
      response.render("author_detail", {
        title: "Author Detail",
        ...results,
      });
    }
  );
};

/**
 * Display author create form on GET.
 */
exports.author_create_get = (request, response) => {
  response.render("author_form", { title: "Create Author" });
};

/**
 * Handle author create on POST.
 */
exports.author_create_post = [
  // Validate and sanitize fields.
  body("first_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("First name must be specified")
    .isAlphanumeric()
    .withMessage("First name has non-alphanumeric characters"),
  body("family_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("First name must be specified")
    .isAlphanumeric()
    .withMessage("First name has non-alphanumeric characters"),
  body("date_of_birth", "Invalid date of birth")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),
  body("date_of_death", "Invalid date of death")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),

  // Process request after validation and sanitization.
  (request, response, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(request);

    // If there are errors, render form again with sanitized values and error messages.
    if (!errors.isEmpty()) {
      response.render("author_form", {
        title: "Create Author",
        author: request.body,
        errors: errors.array(),
      });
      return;
    }

    // Create an author object with escaped and trimmed data.
    const author = new Author({ ...request.body });

    author.save((error) => {
      if (error) {
        return next(error);
      }

      response.redirect(author.url);
    });
  },
];

/**
 * Display author delete form on GET.
 */
exports.author_delete_get = (request, response, next) => {
  async.parallel(
    {
      author: (callback) => Author.findById(request.params.id).exec(callback),

      author_books: (callback) =>
        Book.find({ author: request.params.id }).exec(callback),
    },

    (error, results) => {
      if (error) {
        return next(error);
      }
      if (results.author === null) {
        response.redirect("/catalog/authors");
        return;
      }
      response.render("author_delete", {
        title: "Delete Author",
        ...results,
      });
    }
  );
};

/**
 * Handle author delete on POST.
 */
exports.author_delete_post = (request, response, next) => {
  async.parallel(
    {
      author: (callback) =>
        Author.findById(request.body.authorid).exec(callback),

      author_books: (callback) =>
        Book.find({ author: request.body.authorid }).exec(callback),
    },

    (error, results) => {
      if (error) {
        return next(error);
      }
      // If author has books, render same as GET route.
      if (results.author_books.length > 0) {
        response.render("author_delete", {
          title: "Delete Author",
          ...results,
        });
        return;
      }

      // Delete author if has no books
      Author.findByIdAndRemove(request.body.authorid, (error) => {
        if (error) {
          return next(error);
        }
        response.redirect("/catalog/authors");
      });
    }
  );
};

/**
 * Display author update on GET.
 */
exports.author_update_get = (request, response) => {
  response.send("NOT IMPLEMENTED: Author update GET");
};

/**
 *  Handle author update on POST.
 */
exports.author_update_post = (request, response) => {
  response.send("NOT IMPLEMENTED: Author update POST");
};
