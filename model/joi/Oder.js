const Joi = require('joi');

const errMessage = (errors) => {
    errors.forEach(err => {
        switch(err.code) {
            case "string.empty":
                err.message = "Pole jest wymagane";
                break;
            case "string.min":
                err.message = `Pole musi mieć co najmniej ${err.local.limit} znaki`;
                break;
            case "string.max":
                err.message = `Pole musi mieć co najwyżej ${err.local.limit} znaki`;
                break;
            default:
                break;
        }
    });
    return errors;
}

const oderSchema = Joi.object({
    _id: Joi.number()
        .optional()
        .allow(""),
    oder_number: Joi.string()
        .min(2)
        .max(60)
        .required()
        .error(errMessage),
    oder_time: Joi.string()
        .min(2)
        .max(60)
        .required()
        .error(errMessage),
    adres: Joi.string()
        .min(2)
        .max(60)
        .required()
        .error(errMessage),


})

module.exports = oderSchema;