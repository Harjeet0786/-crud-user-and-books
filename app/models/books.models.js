module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define("book", {
    bookName: DataTypes.STRING,
    bookprice: DataTypes.BIGINT,
    authorname: DataTypes.STRING,
  });

  return Book;
};
