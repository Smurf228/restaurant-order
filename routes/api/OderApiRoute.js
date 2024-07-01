const  express = require('express');
const router = express.Router();



const oApiController = require('../../api/OderAPI');

router.get('/', oApiController.getOders);
router.get('/:oId', oApiController.getOderById);
router.post('/', oApiController.createOder);
router.put('/:oId', oApiController.updateOder);
router.delete('/:oId', oApiController.deleteOder);

module.exports = router;