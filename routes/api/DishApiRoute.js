const  express = require('express');
const router = express.Router();



const dApiController = require('../../api/DishAPI');

router.get('/', dApiController.getDishs);
router.get('/:dId', dApiController.getDishById);
router.post('/', dApiController.createDish);
router.put('/:dId', dApiController.updateDish);
router.delete('/:dId', dApiController.deleteDish);

module.exports = router;