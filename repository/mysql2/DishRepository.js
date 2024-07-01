const db = require('../../config/mysql2/db');
const dishSchema = require('../../model/joi/Dish');
const {log} = require("debug");

exports.getDishs = () => {
    const query = `SELECT  d._id as d_id, d.price, d.title, d.weight,
                           o._id as o_id, o.oder_number, o.oder_time,o.adres,
                           c._id as c_id, c.first_name, c.last_name, c.emeil,c.phone_number
                   FROM Dish d
                            left join Client c on d.Client__id = c._id
                            left join Oder o on d.Oder__id = o._id`
    return db.promise().query(query)
        .then((results, fields) => {
            return results[0];
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};



exports.getDishById = (dishId) =>{
    const query = `SELECT  d._id as d_id, d.price, d.title, d.weight,
                           o._id as o_id, o.oder_number,o.oder_time, o.adres,
                           c._id as c_id, c.first_name, c.last_name, c.emeil,c.phone_number
                   FROM Dish d
                            left join client c on d.Client__id = c._id
                            left join oder o on d.Oder__id = o._id
                   where d._id = ?`
    return db.promise().query(query, [dishId])
        .then((result, fields) => {
            const row = result[0][0];
            console.log(row)
            if (!row){
                return{}
            }
            const dish = {
                _id: row.d_id,
                title: row.title,
                weight: row.weight,
                price: row.price,
                oder: {
                    _id: row.o_id,
                    oder_number: row.oder_number,
                    oder_time: row.oder_time,
                    adres: row.adres
                },
                client: {
                    _id: row.c_id,
                    first_name: row.first_name,
                    last_name: row.last_name,
                    emeil: row.emeil,
                    phone_number: row.phone_number
                }
            };
            return dish;
        })
        .catch(err =>{
            throw err;
        })
}

exports.createDish = (data) =>{
    const clientName = data.clientName;
    const orderNumber = data.orderNumber;
    const title = data.firstName;
    const weight = data.weight;
    const price = data.price;
    const sql = `INSERT into Dish (client__id, oder__id, title, weight, price) VALUES (?,?,?,?,?)`;
    return db.promise().execute(sql, [clientName,orderNumber, title, weight, price ])
};

exports.updateDish = (dishId, data) =>{
    const clientName = data.clientName;
    const orderNumber = data.orderNumber;
    const title = data.firstName;
    const weight = data.weight;
    const price = data.price;
    const sql = `UPDATE Dish set client__id = ?, oder__id = ?, title = ?, weight = ?, price = ? where _id = ?`;
    return db.promise().execute(sql, [clientName, orderNumber, title, weight, price, dishId]);
}

exports.deleteDish = (dishId) =>{
    const sql = 'DELETE FROM Dish where _id = ?'
    return db.promise().execute(sql,[dishId]);
}
