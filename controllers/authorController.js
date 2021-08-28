const { nextTick } = require("async");
const Author = require("../models/author");

/**
 * Display list of all authors.
 */
exports.author_list = (request, response) => {
  Author.find()
    .sort([["familiy_name", "ascending"]])
    .exec((error, author_list) => {
      if (error) {
        return nextTick(error);
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
exports.author_detail = (request, response) => {
  response.send(`NOT IMPLEMENTED: Author detail: ${request.params.id}`);
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
