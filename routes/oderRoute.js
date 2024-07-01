const express = require('express');
const router = express.Router();
const orderController = require('../controllers/oderController');


router.get('/', orderController.showOderList);
router.get('/add', orderController.showAddOderForm);
router.get('/edit/:oderId',orderController.showEditOderForm);
router.get('/details/:oderId', orderController.showOderDetails);
router.post('/add', orderController.addOder);
router.post('/edit', orderController.updateOder);
router.get('/delete/:oderId', orderController.deleteOder);

module.exports = router;