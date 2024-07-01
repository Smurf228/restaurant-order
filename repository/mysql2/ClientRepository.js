const db = require('../../config/mysql2/db');
 const clientSchema = require('../../model/joi/Client');

exports.getClients = () => {
    return db.promise().query(`SELECT * FROM Client`)
        .then( (results,fields) => {
            return results[0];
    })
    .catch(err => {
        throw err;
    });
};

exports.getClientById = (clientId) => {
    const query = `SELECT c._id as _id, c.first_name, c.last_name, c.emeil,c.phone_number,
       d._id as d_id, d.price, d.title, d.weight, o._id as o_id, o.oder_number, o.oder_time, o.adres
FROM Client c 
    left join Dish d on c._id = d.Client__id  
    left join Oder o on o._id = d.Oder__id 
    where c._id = ?`

    return db.promise().query(query, [clientId])
        .then((results, fields) =>{
            const firstRow = results[0][0];
            if (!firstRow){
                return{};
            }
            const client ={
                _id: parseInt(clientId),
                first_name: firstRow.first_name,
                last_name: firstRow.last_name,
                emeil: firstRow.emeil,
                phone_number: firstRow.phone_number,
                dishs:[]
            }
            for (let i=0; i<results[0].length; i++){
                const row = results[0][i];
                if (row.d_id){
                    const dish = {
                        _id: row.d_id,
                        price: row.price,
                        title: row.title,
                        weight: row.weight,
                        oder:{
                            _id: row.o_id,
                            oder_number: row.oder_number,
                            oder_time: row.oder_time,
                            adres: row.adres
                        }
                    };
                    client.dishs.push(dish);
                }
            }
            return client;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });

};

exports.createClient = (newClientData) => {
    const vRes = clientSchema.validate(newClientData, {abortEarly: false});
    if (vRes.error){
        return Promise.reject(vRes.error);
    }
    const first_name = newClientData.firstName;
    const last_name = newClientData.lastName;
    const emeil = newClientData.email;
    const phone_number = newClientData.phoneNumber;
    const sql =`INSERT into Client (first_name, last_name, emeil, phone_number) values (?,  ?,  ?,  ?)`;

    return db.promise().execute(sql, [first_name, last_name, emeil, phone_number])
};

exports.updateClient = (clientId, clientData) => {
    console.log(clientData)
    const first_name = clientData.firstName;
    const last_name = clientData.lastName;
    const emeil = clientData.email;
    const phone_number = clientData.phoneNumber;

    const sql =`UPDATE Client set first_name = ?, last_name = ?, emeil = ?, phone_number = ? where _id = ?`;
    return db.promise().execute(sql, [first_name, last_name, emeil, phone_number, clientId]);
};

exports.deleteClient = (clientId) => {
    const sql1 = `DELETE FROM dish where client__id = ?`;
    const sql2 = `DELETE FROM client where _id = ?`;

    return db.promise().execute(sql1,[clientId])
        .then(() =>{
            return db.promise().execute(sql2,[clientId])
        })
};

