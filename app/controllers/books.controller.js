const db = require("../models");
const Book = db.book;
const Op = db.Sequelize.Op;

// Create and Save a new book

exports.create = (req, res) => {
  // Validate request
  if (!req.body.bookName) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a book
  const book = {
    bookName: req.body.bookName,
    bookprice: req.body.bookprice,
    authorname: req.body.authorname,
  };

  // Save book in the database
  Book.create(book)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Book.",
      });
    });
};

// Retrieve all Book from the database.
exports.findAll = (req, res) => {
  const bookName = req.query.bookName;
  var condition = bookName
    ? { bookName: { [Op.like]: `%${bookName}%` } }
    : null;

  Book.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving book.",
      });
    });
};

// Find a single book with an id
exports.findOne = (req, res) => {
  const id = req.query.id;

  Book.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Book with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving book with id=" + id,
      });
    });
};

// Update a book by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Book.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Book was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Book with id=${id}. Maybe Book was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Book with id=" + id,
      });
    });
};

// Delete a Book with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Book.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Book was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Userf with id=${id}. Maybe Book was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Book with id=" + id,
      });
    });
};

// Delete all Books from the database.
exports.deleteAll = (req, res) => {
  Book.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} books were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all books.",
      });
    });
};

// find all created books
exports.findAllBooks = (req, res) => {
  Book.findAll({ where: { name: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving book.",
      });
    });
};
