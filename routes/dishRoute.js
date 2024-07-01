const express = require('express');
const router = express.Router();
const dishController = require('../controllers/dishController');

router.get('/', dishController.showDishList);
router.get('/add', dishController.showAddDishForm);
router.get('/edit/:dishId',dishController.showDishFormEdit);
router.get('/details/:dishId', dishController.showDishDetails);
router.post('/add', dishController.addDish);
router.post('/edit', dishController.updateDish);
router.get('/delete/:dishId', dishController.deleteDish);

module.exports = router;