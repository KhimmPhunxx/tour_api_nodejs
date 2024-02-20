const db = require('../util/db');
const { isEmptyOrNull } = require('../util/service');

const getAll = async (req,res) =>{
    const sql = 'SELECT * FROM accomodation';
    const data = await db.query(sql);
   res.json({
        data_accomodation: data,
        message: "Get all data accomodation success"
    })
}

const getOne = async (req, res) =>{
    const sql = 'SELECT * FROM accomodation WHERE id = ?';
    const data = await db.query(sql, [req.params.id]);
    res.json({
        data_accomodation: data,
        message: "Get data accomodation success"
    })
}

const create = async (req, res) =>{
    const {
        name,
        price,
        description,
        image
    } = req.body;

    message = {}
    if(isEmptyOrNull(name)){message.name = "Name is required"}
    if(isEmptyOrNull(price)){message.price = "Price is required"}
    if(isEmptyOrNull(description)){message.description = "Description is required"}

    if(Object.keys(message).length > 0){
        res.json({
            message: message,
            error: true
        })
        return;
    }

    let sql = "INSERT INTO accomodation (name,price,description,image) VALUES (?,?,?,?)";
    let param_create = [
        name,
        price,
        description,
        image
    ];
    db.query(sql,param_create,(err,result)=>{
        if(err){
            res.json({
                message:err,
                error:true
            })
        }else{
            res.json({
                data_accomodation: result,
                message: "Create data accomodation success"
            })
        }
    })
}

const update = async (req, res) =>{
    const {
        id,
        name,
        price,
        description,
        image
    } = req.body;

    message = {}
    if(isEmptyOrNull(name)){message.name = "Name is required"}
    if(isEmptyOrNull(price)){message.price = "Price is required"}
    if(isEmptyOrNull(description)){message.description = "Description is required"}

    if(Object.keys(message).length > 0){
        res.json({
            message: message,
            error: true
        })
        return;
    }

    let sql = "UPDATE accomodation SET name = ?, price = ?, description = ?, image = ? WHERE id = ?";
    let param_update = [
        name,
        price,
        description,
        image,
        id
    ];
    db.query(sql,param_update,(err,result)=>{
        if(err){
            res.json({
                message:err,
                error:true
            })
        }else{
            res.json({
                data_accomodation: result,
                message: "Update data accomodation success"
            })
        }
    })
}

const remove = async (req, res) =>{
    const sql = "DELETE FROM accomodation WHERE id = ?";
    db.query(sql,[req.params.id],(err,result)=>{
        if(err){
            res.json({
                message:err,
                error:true
            })
        }else{
            res.json({
                data_accomodation: result,
                message: "Delete data accomodation success"
            })
        }
    })
}

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove
}