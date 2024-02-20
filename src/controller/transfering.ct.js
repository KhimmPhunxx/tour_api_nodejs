const db = require('../util/db');
const { isEmptyOrNull } = require('../util/service');

const getAll = async (req,res) =>{
    const sql = 'SELECT * FROM transfering';
    const data = await db.query(sql);
    res.json({
        data_transfering: data,
        message: "Get all data transfering success"
    })
}

const getOne = async (req, res) =>{
    const sql = 'SELECT * FROM transfering WHERE id = ?';
    const data = await db.query(sql, [req.params.id]);
    res.json({
        data_transfering: data,
        message: "Get data transfering success"
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

    let sql = "INSERT INTO transfering (name,price,description,image) VALUES (?,?,?,?)";
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
                data_transfering: result,
                message: "Create data transfering success"
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

    let sql = "UPDATE transfering SET name = ?, price = ?, description = ?, image = ? WHERE id = ?";
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
                data_transfering: result,
                message: "Update data transfering success"
            })
        }
    })

}

const remove = async (req, res) =>{
    const sql = "DELETE FROM transfering WHERE id = ?";
    db.query(sql,[req.params.id],(err,result)=>{
        if(err){
            res.json({
                message:err,
                error:true
            })
        }else{
            res.json({
                data_transfering: result,
                message: "Delete data transfering success"
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