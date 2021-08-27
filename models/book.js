const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "Author", required: true },
  summary: { type: String, require: true },
  isbn: { type: String, required: true },
  genre: [{ type: Schema.Types.ObjectId }],
});

// Virtual for book's URL
BookSchema.virtual("url").get(() => `/catalog/book/${this._id}`);

// Export model
module.exports = mongoose.model("Book", BookSchema);
