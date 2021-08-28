const express = require("express");
const router = express.Router();

// Require controller modules.
const book_controller = require("../controllers/bookController");
const author_controller = require("../controllers/authorController");
const genre_controller = require("../controllers/genreController");
const book_instance_controller = require("../controllers/bookinstanceController");
const bookinstance = require("../models/bookinstance");

/*
 * Book routes
 */

/**
 * GET catalog home page.
 */
router.get("/", book_controller.index);

/**
 * GET request for creating book.
 * This must come before routes for book id.
 */
router.get("/book/create", book_controller.book_create_get);

/**
 * POST request for creating book.
 */
router.post("/book/create", book_controller.book_create_post);

/**
 * GET request to delete book.
 */
router.get("/book/:id/delete", book_controller.book_delete_get);

/**
 * POST request to delete book.
 */
router.post("/book/:id/delete", book_controller.book_delete_post);

/**
 * GET request to update book.
 */
router.get("/book/:id/update", book_controller.book_update_get);

/**
 * POST request to update book.
 */
router.post("/book/:id/update", book_controller.book_update_post);

/**
 * GET request for one book.
 */
router.get("/book/:id", book_controller.book_detail);

/**
 * GET request for list of all books.
 */
router.get("/books", book_controller.book_list);

/*
 * Author routes
 */

/**
 * GET request for creating author.
 * This must come before routes for author id.
 */
router.get("/author/create", author_controller.author_create_get);

/**
 * POST request for creating author.
 */
router.post("/author/create", author_controller.author_create_post);

/**
 * GET request to delete author.
 */
router.get("/author/:id/delete", author_controller.author_delete_get);

/**
 * POST request to delete author.
 */
router.post("/author/:id/delete", author_controller.author_delete_post);

/**
 * GET request to update author.
 */
router.get("/author/:id/update", author_controller.author_update_get);

/**
 * POST request to update author.
 */
router.post("/author/:id/update", author_controller.author_update_post);

/**
 * GET request for one author.
 */
router.get("/author/:id", author_controller.author_detail);

/**
 * GET request for list of all authors.
 */
router.get("/authors", author_controller.author_list);

/*
 * Genre routes
 */

/**
 * GET request for creating genre.
 * This must come before routes for genre id.
 */
router.get("/genre/create", genre_controller.genre_create_get);

/**
 * POST request for creating genre.
 */
router.post("/genre/create", genre_controller.genre_create_post);

/**
 * GET request to delete genre.
 */
router.get("/genre/:id/delete", genre_controller.genre_delete_get);

/**
 * POST request to delete genre.
 */
router.post("/genre/:id/delete", genre_controller.genre_delete_post);

/**
 * GET request to update genre.
 */
router.get("/genre/:id/update", genre_controller.genre_update_get);

/**
 * POST request to update genre.
 */
router.post("/genre/:id/update", genre_controller.genre_update_post);

/**
 * GET request for one genre.
 */
router.get("/genre/:id", genre_controller.genre_detail);

/**
 * GET request for list of all genres.
 */
router.get("/genres", genre_controller.genre_list);

/*
 * Book instance routes
 */

/**
 * GET request for creating a book instance.
 * This must come before routes for book instance id.
 */
router.get("/bookinstance/create", book_instance_controller.book_create_post);

/**
 * POST request for creating a book instance.
 */
router.get("/bookinstance/create", book_instance_controller.book_create_post);

/**
 * GET request to delete book instance.
 */
router.get(
  "/bookinstance/:id/delete",
  book_instance_controller.book_delete_get
);

/**
 * POST request to delete book instance.
 */
router.post(
  "/bookinstance/:id/delete",
  book_instance_controller.book_delete_post
);

/**
 * GET request to update book instance.
 */
router.get(
  "/bookinstance/:id/update",
  book_instance_controller.book_update_get
);

/**
 * POST request to update book instance.
 */
router.post(
  "/bookinstance/:id/update",
  book_instance_controller.book_update_post
);

/**
 * GET request for one book instance.
 */
router.get("/bookinstance/:id", book_instance_controller.book_detail);

/**
 * GET request for list of all book instances.
 */
router.get("/bookinstances", book_instance_controller.bookinstance_list);

// Export router.
module.exports = router;
