const db = require('../../config/mysql2/db');
const oderSchema = require('../../model/joi/Oder');

exports.getOders = () => {
    return db.promise().query(`SELECT * FROM Oder`)
        .then((results, fields) => {
            return results[0];
        })
        .catch(err => {
            throw err;
        })
};

exports.getOderById = (oderId) => {
    const query = `SELECT o._id as _id, o.oder_number, o.oder_time, o.adres,
c._id as c_id, c.first_name, c.last_name, c.emeil,c.phone_number,
d._id as d_id, d.price, d.title, d.weight 
FROM Oder o 
    left join Dish d on o._id = d.Oder__id 
    left join Client c on c._id = d.Client__id
where o._id = ?`


    return db.promise().query(query, [oderId])
        .then((results, fields) =>{
            const firstRow = results[0][0];
            if (!firstRow){
                return{};
            }
            const oder ={
                _id: parseInt(oderId),
                oder_number: firstRow.oder_number,
                oder_time: firstRow.oder_time,
                adres: firstRow.adres,
                dishs: []
            }
            for (let i=0; i<results[0].length; i++){
                const row = results[0][i];
                if (row.d_id){
                    const dish = {
                        _id: row.d_id,
                        price: row.price,
                        title: row.title,
                        weight: row.weight,
                        client:{
                            _id: row.c_id,
                            first_name: row.first_name,
                            last_name: row.last_name,
                            emeil: row.emeil,
                            phone_number: row.phone_number
                        }
                    }
                    oder.dishs.push(dish);
                }
            }
            return oder;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.createOder = (newOderData) => {
    const vRes = oderSchema.validate(newOderData, { abortEarly: false });
    if (vRes.error) {
        return Promise.reject(vRes.error);
    }
    const { oder_number, oder_time, adres } = newOderData;

    if (oder_number === undefined || oder_time === undefined || adres === undefined) {
        return Promise.reject(new Error('Bind parameters must not contain undefined'));
    }

    const sql = 'INSERT INTO Oder (oder_number, oder_time, adres) VALUES (?, ?, ?)';

    return db.promise().execute(sql, [oder_number, oder_time, adres]);
};


exports.updateOder = (oderId, oderData) => {
    console.log('Data to validate:', oderData);
    const vRes = oderSchema.validate(oderData, { abortEarly: false });
    if (vRes.error) {
        console.log('Validation error:', vRes.error);
        return Promise.reject(vRes.error);
    }
    const { oder_number, oder_time, adres } = oderData;

    if (oder_number === undefined || oder_time === undefined || adres === undefined) {
        return Promise.reject(new Error('Bind parameters must not contain undefined'));
    }

    console.log('Data to update in DB:', oder_number, oder_time, adres);
    const sql = 'UPDATE Oder SET oder_number = ?, oder_time = ?, adres = ? WHERE _id = ?';

    return db.promise().execute(sql, [oder_number, oder_time, adres, oderId]);
};


exports.deleteOder = (oderId) => {
    const sql1 = 'DELETE FROM dish where oder__id = ?'
    const sql2 = 'DELETE FROM oder where _id = ?'

    return db.promise().execute(sql1,[oderId])
        .then(() =>{
            return db.promise().execute(sql2,[oderId])
        })
};



