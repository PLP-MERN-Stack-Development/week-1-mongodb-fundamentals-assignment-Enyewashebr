// queries.js - MongoDB Week 1 Assignment Queries

// ---------------------------
// Basic CRUD Operations
// ---------------------------

// 1. Find all books in a specific genre
db.books.find({ genre: "Adventure" });

// 2. Find books published after a certain year
db.books.find({ published_year: { $lt: 2010 } });

// 3. Find books by a specific author
db.books.find({ author: "Harper Lee" });

// 4. Update the price of a specific book
db.books.updateOne({ autor: "Harper Lee" }, { $set: { price: 15 } });

// 5. Delete a book by its title
db.books.deleteOne({ title: "Moby Dick" });

// ---------------------------
// Advanced Queries
// ---------------------------

// Books that are in stock AND published after 2010
db.books.find({ in_stock: true, published_year: { $gt: 2010 } });

// Projection: return only title, author, price fields
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 });

// Sorting by price ascending
db.books.find().sort({ price: 1 });

// Sorting by price descending
db.books.find().sort({ price: -1 });

// Pagination: 5 books per page (example: page 2)
db.books.find().skip(5).limit(5);

// ---------------------------
// Aggregation Pipelines
// ---------------------------

// 1. Average price of books by genre
db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } },
]);

// 2. Author with the most books
db.books.aggregate([
  { $group: { _id: "$author", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 },
]);

// 3. Group books by publication decade and count them
db.books.aggregate([
  {
    $project: {
      decade: {
        $subtract: ["$published_year", { $mod: ["$published_year", 10] }],
      },
    },
  },
  { $group: { _id: "$decade", count: { $sum: 1 } } },
  { $sort: { _id: 1 } },
]);

// ---------------------------
// Indexing
// ---------------------------

// 1. Create index on title for faster searches
db.books.createIndex({ title: 1 });

// 2. Create a compound index on author and published_year
db.books.createIndex({ author: 1, published_year: -1 });

// 3. Demonstrate performance improvement using explain()
db.books.find({ title: "1984" }).explain("executionStats");
