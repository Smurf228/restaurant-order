const  express = require('express');
const router = express.Router();



const cApiController = require('../../api/ClientAPI');

router.get('/', cApiController.getClients);
router.get('/:cId', cApiController.getClientById);
router.post('/', cApiController.createClient);
router.put('/:cId', cApiController.updateClient);
router.delete('/:cId', cApiController.deleteClient);

module.exports = router;