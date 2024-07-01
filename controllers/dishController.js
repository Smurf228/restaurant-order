const oderRepository = require('../repository/mysql2/OderRepository');
const dishRepository = require('../repository/mysql2/DishRepository');
const clientRepository = require('../repository/mysql2/ClientRepository');


exports.showDishList = (req, res, next) => {
    dishRepository.getDishs()
   .then(dishs => {
        res.render('pages/dish/list', {
            navLocation: 'dish',
            dishs:dishs

        });
    });
}

exports.showAddDishForm = (req, res, next) => {
    let allClients, allOders;
    clientRepository.getClients()
        .then(clients => {
            allClients = clients;
            return oderRepository.getOders();
        })
        .then(oders => {
            allOders = oders;
            res.render('pages/dish/form', {
                dish:{},
                formMode: 'createNew',
                allClients: allClients,
                allOders: allOders,
                pageTitle: 'Nowe dania',
                btnLabel: 'Dodaj dania',
                formAction: '/dishs/add',
                navLocation:'dish'
            });
        });

}

exports.showDishFormEdit = (req, res, next) => {
    const dishId = req.params.dishId;
    let allClients, allOders, dishs;
    dishRepository.getDishById(dishId)
        .then(dish => {
            dishs = dish;
            return oderRepository.getOders();
        })
        .then(oders => {
            allOders = oders;
            return clientRepository.getClients();
        })
        .then(clients => {
            allClients = clients;
            res.render('pages/dish/form', {
                dish: dishs,
                allClients: allClients,
                allOders: allOders,
                navLocation: 'dish',
                pageTitle: 'Edycja dania',
                btnLabel: 'Edytuj dania',
                formAction: '/dishs/edit',
                formMode: 'edit'
            });
        })
}

exports.showDishDetails = (req, res, next) => {
    const dishId = req.params.dishId;
    dishRepository.getDishById(dishId)
        .then(dish => {
            res.render('pages/dish/form-details', {
                dish: dish,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły dania',
                formAction: '',
                navLocation: 'dish'
            });
        });
}

exports.addDish = (req, res, next) => {
    const dishData = {...req.body};
    dishRepository.createDish(dishData)
        .then(result => {
            res.redirect('/dishs');
        })
}

exports.updateDish = (req, res, next) => {
    const dishId = req.body._id;
    const data = {...req.body};
    console.log(req.body)
    dishRepository.updateDish(dishId, data)
        .then(result => {

            res.redirect('/dishs');
        })
};

exports.deleteDish = (req, res, next) => {
    const dishId = req.params.dishId;
    dishRepository.deleteDish(dishId)
        .then( () => {
            res.redirect('/dishs');
        })
}

