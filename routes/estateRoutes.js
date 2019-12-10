const express = require('express');
const estateController = require('../controllers/estateController');
const authCotroller = require('../controllers/authController');
const router = express.Router();

//router.param('id', estateController.checkID);

router
  .route('/')
  .get(authCotroller.protect, estateController.getAllEstates)
  .post(estateController.createEstate);

router
  .route('/:id')
  .get(estateController.getEstate)
  .patch(estateController.updateEstate)
  .delete(estateController.deleteEstate);

module.exports = router;
