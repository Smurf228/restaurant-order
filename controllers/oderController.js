const oderRepository = require('../repository/mysql2/OderRepository');


exports.showOderList = (req, res, next) => {
    oderRepository.getOders()
        .then(oders => {
            res.render('pages/oder/list-order', {
                navLocation: 'oder',
                oders:oders
            });
        });
}

exports.showAddOderForm = (req, res, next) => {
    res.render('pages/oder/form-order', {
        oder:{},
        pageTitle: 'Dodaj zamowienia',
        formMode: 'createNew',
        btnLabel: 'Dodaj zamowienia',
        formAction: '/oders/add',
        navLocation:'oder',
        validationErrors: []
    });
}

exports.showEditOderForm = (req, res, next) => {
    const oderId = req.params.oderId;
    oderRepository.getOderById(oderId)
        .then(oder => {
            res.render('pages/oder/form-order', {
                oder: oder,
                formMode:'edit',
                pageTitle: 'Edycja zamowienia',
                btnLabel: 'Edytuj zamowienia',
                formAction: '/oders/edit',
                navLocation: 'oder',
                validationErrors: []
            });
        });
}

exports.showOderDetails = (req, res, next) => {
    const oderId = req.params.oderId;
    oderRepository.getOderById(oderId)
        .then(oder => {
            res.render('pages/oder/form-details-order', {
                oder: oder,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły zamowienia',
                formAction: '',
                navLocation: 'oder',
                validationErrors: []
            });
        });
}

exports.addOder = (req, res, next) => {
    const { oder_number, oder_time, adres } = req.body;
    
   
    if (!oder_number || !oder_time || !adres) {
        const validationErrors = [];
        if (!oder_number) validationErrors.push({ path: 'oder_number', message: 'Numer zamówienia jest wymagany' });
        if (!oder_time) validationErrors.push({ path: 'oder_time', message: 'Czas zamówienia jest wymagany' });
        if (!adres) validationErrors.push({ path: 'adres', message: 'Adres jest wymagany' });

        return res.render('pages/oder/form-order', {
            navLocation: 'oder',
            oder: req.body, 
            pageTitle: 'Dodaj zamowienia',
            formMode: 'createNew',
            btnLabel: 'Dodaj zamowienia',
            formAction: '/oders/add',
            validationErrors: validationErrors
        });
    }

    const oderData = {
        oder_number: oder_number,
        oder_time: oder_time,
        adres: adres
    };
    console.log('Received data:', oderData);
    oderRepository.createOder(oderData)
        .then(result => {
            console.log('Order created successfully:', result);
            res.redirect('/oders');
        })
        .catch(err => {
            console.error('Error creating order:', err);
            res.render('pages/oder/form-order', {
                navLocation: 'oder',
                oder: req.body, 
                pageTitle: 'Dodaj zamowienia',
                formMode: 'createNew',
                btnLabel: 'Dodaj zamowienia',
                formAction: '/oders/add',
                validationErrors: err.details || []
            });
        });
}



exports.updateOder = (req, res, next) => {
    const oderId = req.body._id;
    const oderData = { ...req.body };

    console.log('Received data for update:', oderData);

    if (!oderId || !oderData.oder_number || !oderData.oder_time || !oderData.adres) {
        const validationErrors = [];
        if (!oderId) validationErrors.push({ path: '_id', message: 'ID zamówienia jest wymagane' });
        if (!oderData.oder_number) validationErrors.push({ path: 'oder_number', message: 'Numer zamówienia jest wymagany' });
        if (!oderData.oder_time) validationErrors.push({ path: 'oder_time', message: 'Czas zamówienia jest wymagany' });
        if (!oderData.adres) validationErrors.push({ path: 'adres', message: 'Adres jest wymagany' });

        return res.render('pages/oder/form-order', {
            navLocation: 'oder',
            oder: req.body,
            pageTitle: 'Edycja zamowienia',
            formMode: 'edit',
            btnLabel: 'Edytuj zamowienia',
            formAction: '/oders/edit',
            validationErrors: validationErrors
        });
    }

    oderRepository.updateOder(oderId, oderData)
        .then(result => {
            res.redirect('/oders');
        })
        .catch(err => {
            console.error('Error updating order:', err);
            res.render('pages/oder/form-order', {
                navLocation: 'oder',
                oder: req.body,
                pageTitle: 'Edycja zamowienia',
                formMode: 'edit',
                btnLabel: 'Edytuj zamowienia',
                formAction: '/oders/edit',
                validationErrors: err.details || []
            });
        });
}


exports.deleteOder = (req, res, next) => {
    const oderId = req.params.oderId;
    oderRepository.deleteOder(oderId)
        .then( () => {
            res.redirect('/oders')
        });
}

