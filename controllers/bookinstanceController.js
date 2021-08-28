const BookInstance = require("../models/bookinstance");

/**
 * Display list of all book instances.
 */
exports.bookinstance_list = (request, response) => {
  response.send("NOT IMPLEMENTED: BookInstance list");
};

/**
 * Display detail page for a specific book instance.
 */
exports.bookinstance_detail = (request, response) => {
  response.send(`NOT IMPLEMENTED: BookInstance detail: ${request.params.id}`);
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
