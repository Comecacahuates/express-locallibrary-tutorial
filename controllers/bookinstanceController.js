const BookInstance = require("../models/bookinstance");
const Book = require("../models/book");
const { body, validationResult } = require("express-validator");

/**
 * Display list of all book instances.
 */
exports.bookinstance_list = (request, response, next) => {
  BookInstance.find()
    .populate("book")
    .exec((error, bookinstance_list) => {
      if (error) {
        return next(error);
      }
      response.render("bookinstance_list", {
        title: "Book Instance List",
        bookinstance_list,
      });
    });
};

/**
 * Display detail page for a specific book instance.
 */
exports.bookinstance_detail = (request, response, next) => {
  BookInstance.findById(request.params.id)
    .populate("book")
    .exec((error, bookinstance) => {
      if (error) {
        return next(error);
      }
      if (bookinstance === null) {
        const error = new Error("Book copy not found");
        error.status = 404;
        return next(error);
      }
      response.render("bookinstance_detail", {
        title: `Copy: ${bookinstance.book.title}`,
        bookinstance,
      });
    });
};

/**
 * Display book instance create form on GET.
 */
exports.bookinstance_create_get = (request, response, next) => {
  Book.find({}, "title").exec((error, books) => {
    if (error) {
      return next(error);
    }
    response.render("bookinstance_form", {
      title: "Create BokkOnstance",
      books,
    });
  });
};

/**
 * Handle book instance create on POST.
 */
exports.bookinstance_create_post = [
  // Validate and sanitise fields.
  body("book", "Book must be specified").trim().isLength({ min: 1 }).escape(),
  body("imprint", "Imprint must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("status").escape(),
  body("due_back", "Invalid date").optional({ checkFalsy: true }),

  // Process request after validation and sanitization.
  (request, response, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(request);

    // If there are errors, render form again with sanitized values and error messages.
    if (!errors.isEmpty()) {
      Book.find({}, "title").exec((error, books) => {
        if (error) {
          return next(error);
        }
        response.render("bookinstance_form", {
          title: "Create BookInstance",
          ...request.body,
          selected_book: request.body.book._id,
          books,
          errors: errors.array(),
        });
      });
      return;
    }

    // Create a book instance object with escaped and trimed data.
    const bookinstance = new BookInstance({ ...request.body });

    bookinstance.save((error) => {
      if (error) {
        return next(error);
      }
      response.redirect(bookinstance.url);
    });
  },
];

/**
 * Display book instance delete form on GET.
 */
exports.bookinstance_delete_get = (request, response) => {
  response.send("NOT IMPLEMENTED: BookInstance delete GET");
};

/**
 * Handle book instance delete on POST.
 */
exports.bookinstance_delete_post = (request, response) => {
  response.send("NOT IMPLEMENTED: BookInstance delete POST");
};

/**
 * Display book instance update form on GET.
 */
exports.bookinstance_update_get = (request, response) => {
  response.send("NOT IMPLEMENTED: BookInstance update GET");
};

/**
 * Handle book instance update on POST.
 */
exports.bookinstance_update_post = (request, response) => {
  response.send("NOT IMPLEMENTED: BookInstance update POST");
};
