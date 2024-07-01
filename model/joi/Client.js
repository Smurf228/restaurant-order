const Joi = require('joi');

const errMessage = (errors) => {
    errors.forEach(err => {
        switch(err.code) {
            case "string.empty":
                err.message = "Pole jest wymagane";
                break;
            case "string.min":
                err.message = `Pole musi mieć co najmniej1 ${err.local.limit} znaki`;
                break;
            case "number.min":
                err.message = `Pole musi mieć co najmniej2 ${err.local.limit} znaki`;
                break;
            case "number.max":
                err.message = `Pole musi mieć co najmniej3 ${err.local.limit} znaki`;
                break;
            case "string.max":
                err.message = `Pole musi mieć co najwyżej4 ${err.local.limit} znaki`;
                break;
            case "string.email":
                err.message = 'Nieprawidłowy format email';
                break;
            default:
                break;
        }
    });
    return errors;

}


const clientSchema = Joi.object({
    _id: Joi.number()
        .optional()
        .allow(""),
    firstName: Joi.string()
        .min(2)
        .max(60)
        .required()
        .error(errMessage),
    lastName: Joi.string()
        .min(2)
        .max(60)
        .required()
        .error(errMessage),
    email:Joi.string()
        .optional()
        .error(errMessage),
    phoneNumber: Joi.string()
        .min(2)
        .max(9)
        .required()
        .error(errMessage),
})

module.exports = clientSchema;