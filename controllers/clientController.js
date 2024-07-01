const clientRepository = require('../repository/mysql2/ClientRepository');


exports.showClientList = (req, res, next) => {
    clientRepository.getClients()
        .then(clients => {
            res.render('pages/client/list-client', {
                navLocation: 'client',
                clients:clients

              });
        });
}

exports.showAddClientForm = (req, res, next) => {
            res.render('pages/client/form-client', {
                client:{},
                pageTitle: 'Dodaj clienta',
                formMode: 'createNew',
                btnLabel: 'Dodaj clienta',
                formAction: '/clients/add',
                navLocation:'client',
                validationErrors: []
            });
}

exports.showClientFormEdit = (req, res, next) => {
    const clientId = req.params.clientId;
    clientRepository.getClientById(clientId)
        .then(client => {
            res.render('pages/client/form-client', {
                client: client,
                formMode:'edit',
                pageTitle: 'Edycja clienta',
                btnLabel: 'Edytuj clienta',
                formAction: '/clients/edit',
                navLocation: 'client',
                validationErrors: []
            });
        });
}

exports.showClientDetails = (req, res, next) => {
    const clientId = req.params.clientId;
    clientRepository.getClientById(clientId)
        .then(client => {
            res.render('pages/client/form-details-client', {
                client: client,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły clienta',
                formAction: '',
                navLocation: 'client',
                validationErrors: []
            });
        });
}

exports.addClient = (req, res, next) => {
    const clientData = {...req.body};
    clientRepository.createClient(clientData)
        .then( result => {
            res.redirect('/clients')
        })
.catch(err => {
    console.log(err.details)
        res.render('pages/client/form-client', {
            navLocation: 'client',
            client: clientData,
            pageTitle: 'Dodaj clienta',
            formMode: 'createNew',
            btnLabel: 'Dodaj clienta',
            formAction: '/clients/add',
            validationErrors: err.details
        });
    })
}

exports.updateClient = (req, res, next) => {
    const clientId = req.body._id;
    const clientData = { ...req.body};
    clientRepository.updateClient(clientId, clientData)
        .then( result => {
            res.redirect('/clients')
        })
        .catch(err => {
            res.render('pages/client/form', {
                client: clientData,
                pageTitle: 'Edycja clienta',
                formMode: 'edit',
                btnLabel: 'Edytuj clienta',
                formAction: '/clients/edit',
                navLocation: 'client',
                validationErrors: err.details
            });
        })
}

exports.deleteClient = (req, res, next) => {
    const clientId = req.params.clientId;
    clientRepository.deleteClient(clientId)
        .then( () => {
            res.redirect('/clients')
        });
}

