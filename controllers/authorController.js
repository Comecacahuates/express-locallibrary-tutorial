const async = require("async");
const Author = require("../models/author");
const Book = require("../models/book");

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
  response.send("NOT IMPLEMENTED: Author create GET");
};

/**
 * Handle author create on POST.
 */
exports.author_create_post = (request, response) => {
  response.send("NOT IMPLEMENTED: Author create POST");
};

/**
 * Display author delete form on GET.
 */
exports.author_delete_get = (request, response) => {
  response.send("NOT IMPLEMENTED: Author delete GET");
};

/**
 * Handle author delete on POST.
 */
exports.author_delete_post = (request, response) => {
  response.send("NOT IMPLEMENTED: Author delete POST");
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
