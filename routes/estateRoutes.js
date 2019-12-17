const express = require("express");
const estateController = require("../controllers/estateController");
const authController = require("../controllers/authController");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    // cb = callback
    cb(null, "./uploads");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // not working atm
  if (file.mimetype === "image/png" || file.mimetype === "image/jpg") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 4 //max 4MB
  }
});

router
  .route("/")
  .get(estateController.getAllEstates)
  .post(
    authController.protect,
    upload.single("photo"),
    estateController.createEstate
  );

router
  .route("/:id")
  .get(estateController.getEstate)
  .patch(
    authController.protect,
    upload.single("photo"),
    estateController.updateEstate
  )
  .delete(authController.protect, estateController.deleteEstate);

module.exports = router;
