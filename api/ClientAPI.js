const ClientRepository = require('../repository/mysql2/ClientRepository');


 exports.getClients = (req, res, next) => {
    ClientRepository.getClients()
        .then(cs => {
            res.status(200).json(cs);
        })
        .catch(err => {
            console.log(err);
        });
};

 exports.getClientById = (req, res, next) => {
    const cId = req.params.cId;
    ClientRepository.getClientById(cId)
        .then(c =>{
            if (!c){
                res.status(404).json({
                    massage: 'Client with id:' + cId + 'not found'
                })
            }else{
                res.status(200).json(c);
            }
        });
};

 exports.createClient = (req, res, next) => {
     ClientRepository.createClient(req.body)
         .then(newObj => {
             res.status(201).json(newObj);
         })
         .catch(err => {
             if (!err.statusCode) {
                 err.statusCode = 500;
             }
             next(err);
         });
 };

 exports.updateClient = (res, req, next) => {
    const cId = req.params.cId;
    ClientRepository.updateClient(cId, req.body)
        .then(result => {
            res.status(200).json({
                message: 'Client updated', c: result
            });
        })
        .catch(err => {
            if (!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
 };

 exports.deleteClient = (req, res, next) => {
     const cId = req.params.cId;
     ClientRepository.deleteClient(cId)
         .then(result => {
             res.status(200).json({
                 message: 'Removed client', c: result
             });
         })
         .catch(err => {
             if (!err.statusCode){
                 err.statusCode = 500;
             }
             next(err);
         });
 }

