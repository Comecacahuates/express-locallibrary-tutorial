const BookInstance = require("../models/bookinstance");

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
exports.bookinstance_create_get = (request, response) => {
  response.send("NOT IMPLEMENTED: BookInstance create GET");
};

/**
 * Handle book instance create on POST.
 */
exports.bookinstance_create_post = (request, response) => {
  response.send("NOT IMPLEMENTED: BookInstance create POST");
};

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
