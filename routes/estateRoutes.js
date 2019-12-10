const express = require("express");
const estateController = require("../controllers/estateController");
const authController = require("../controllers/authController");
const router = express.Router();

router
  .route("/")
  .get(estateController.getAllEstates)
  .post(authController.protect, estateController.createEstate); //only for logged in users

router
  .route("/:id")
  .get(estateController.getEstate)
  .patch(estateController.updateEstate)
  .delete(estateController.deleteEstate);

module.exports = router;
