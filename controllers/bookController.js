const Book = require("../models/book");
const Author = require("../models/author");
const Genre = require("../models/genre");
const BookInstance = require("../models/bookinstance");

const async = require("async");

/**
 * Display home page.
 */
exports.index = (request, response) => {
  async.parallel(
    {
      book_count: (callback) => {
        Book.countDocuments({}, callback);
      },
      bookinstance_count: (callback) => {
        BookInstance.countDocuments({}, callback);
      },
      bookinstance_available_count: (callback) => {
        BookInstance.countDocuments({ status: "Available" }, callback);
      },
      author_count: (callback) => {
        Author.countDocuments({}, callback);
      },
      genre_count: (callback) => {
        Genre.countDocuments({}, callback);
      },
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
      book: (callback) => {
        Book.findById(request.params.id)
          .populate("author")
          .populate("genre")
          .exec(callback);
      },

      bookinstances: (callback) => {
        BookInstance.find({ book: request.params.id }).exec(callback);
      },
    },

    (error, results) => {
      if (error) {
        return next(error);
      }
      if (results.book === null) {
        const error = new Error("Book not found");
        error.status = 404;
        return next(error);
      }
      console.log(results);
      response.render("book_detail", {
        title: results.book.title,
        book: results.book,
        bookinstances: results.bookinstances,
      });
    }
  );
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
