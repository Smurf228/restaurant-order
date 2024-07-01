const ClientRepository = require('../repository/mysql2/DishRepository');


exports.getDishs = (req, res, next) => {
    ClientRepository.getDishs()
        .then(ds => {
            res.status(200).json(ds);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getDishById = (req, res, next) => {
    const dId = req.params.dId;
    ClientRepository.getClientById(dId)
        .then(d =>{
            if (!d){
                res.status(404).json({
                    massage: 'Dish with id:' + dId + 'not found'
                })
            }else{
                res.status(200).json(d);
            }
        });
};

exports.createDish = (req, res, next) => {
    ClientRepository.createDish(req.body)
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

exports.updateDish = (res, req, next) => {
    const dId = req.params.dId;
    ClientRepository.updateDish(dId, req.body)
        .then(result => {
            res.status(200).json({
                message: 'Dish updated', d: result
            });
        })
        .catch(err => {
            if (!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteDish = (req, res, next) => {
    const dId = req.params.dId;
    ClientRepository.deleteDish(dId)
        .then(result => {
            res.status(200).json({
                message: 'Removed dish', d: result
            });
        })
        .catch(err => {
            if (!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
}