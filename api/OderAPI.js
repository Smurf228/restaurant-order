const OderRepository = require('../repository/mysql2/OderRepository');


exports.getOders = (req, res, next) => {
    OderRepository.getOders()
        .then(os => {
            res.status(200).json(os);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getOderById = (req, res, next) => {
    const oId = req.params.oId;
    OderRepository.getOderById(oId)
        .then(o =>{
            if (!o){
                res.status(404).json({
                    massage: 'Order with id:' + oId + 'not found'
                })
            }else{
                res.status(200).json(c);
            }
        });
};

exports.createOder = (req, res, next) => {
    OderRepository.createOder(req.body)
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

exports.updateOder = (res, req, next) => {
    const oId = req.params.oId;
    OderRepository.updateOder(oId, req.body)
        .then(result => {
            res.status(200).json({
                message: 'Order updated', o: result
            });
        })
        .catch(err => {
            if (!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteOder = (req, res, next) => {
    const oId = req.params.oId;
    OderRepository.deleteOder(oId)
        .then(result => {
            res.status(200).json({
                message: 'Removed client', o: result
            });
        })
        .catch(err => {
            if (!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
}