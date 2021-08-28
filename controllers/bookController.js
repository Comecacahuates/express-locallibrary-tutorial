const { response } = require("express");
const Book = require("../models/book");

/**
 * Display list of all books.
 */
exports.book_list = (request, response) => {
  response.send("NOT IMPLEMENTED: Book list");
};

/**
 * Display detail page for a specific book.
 */
exports.book_detail = (request, response) => {
  response.send(`NOT IMPLEMENTED: Book detaul: ${request.params.id}`);
};

/**
 * Display book create form on GET.
 */
exports.book_create_get = (request, response) => {
  response.send("NOT IMPLEMENTED: Book create GET");
};

/**
 * Handle book create on Post.
 */
exports.book_create_post = (request, response) => {
  response.send("NOT IMPLEMENTED: Book create POST");
};

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
