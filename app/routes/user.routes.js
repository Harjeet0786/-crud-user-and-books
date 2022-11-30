module.exports = (app) => {
  const user = require("../controllers/user.controller");

  var router = require("express").Router();

  // Create a new User
  router.post("/", user.create);

  // Retrieve all User
  router.get("/", user.findAll);

  // Retrieve all published User
  //router.get("/published", user.findAllUser);

  // Retrieve a single User with id
  router.get("/:id", user.findOne);

  // Update a User  with id
  router.put("/:id", user.update);

  // Delete a User with id
  router.delete("/:id", user.delete);

  // Delete all user
  router.delete("/", user.deleteAll);

  app.use("/api/user", router);
};
