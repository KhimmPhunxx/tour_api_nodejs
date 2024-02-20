const db = require('../util/db');
const { isEmptyOrNull } = require('../util/service');

const getAll = async (req,res) =>{
    const data = await db.query('SELECT * FROM transportation');
    res.json({
        data_transportation: data,
        status: 'success',
        message: "Get all data transportation"
    })
}

const getOne = async (req, res) =>{
    const data = await db.query('SELECT * FROM transportation WHERE id = ?', [req.params.id]);
    res.json({
        data_transportation: data,
        status: 'success',
        message: "Get data transportation"
    })
}

const create = async (req, res) =>{
    const {
        name,
        price,
        description,
        maxperson,
        image
    } = req.body;

    message = {}
    if(isEmptyOrNull(name)){message.name = "Name is required"}
    if(isEmptyOrNull(price)){message.price = "Price is required"}
    if(isEmptyOrNull(description)){message.description = "Description is required"}
    if(isEmptyOrNull(maxperson)){message.maxperson = "Maxperson is required"}

    if(Object.keys(message).length > 0){
        res.json({
            message: message,
            error: true
        })
        return;
    }

    let sql = "INSERT INTO transportation (name,price,description,maxperson,image) VALUES (?,?,?,?,?)";
    let param_create = [
        name,
        price,
        description,
        maxperson,
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
                data:result
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
        maxperson,
        image
    } = req.body;

    let sql = "UPDATE transportation SET name = ?, price = ?, description = ?, maxperson = ?, image = ? WHERE id = ?";
    let param_update = [
        name,
        price,
        description,
        maxperson,
        image,
        id
    ];
    db.query(sql,param_update,(err, result)=>{
        if(err){
            res.json({
                message:err,
                error:true
            })
        }else{
            res.json({
                data:result
            })
        }
    })
}

const remove = async (req, res) =>{
    const data = await db.query('DELETE FROM transportation WHERE id = ?', [req.params.id]);
    res.json({
        data_transportation: data,
        status: 'success',
        message: "Delete data transportation"
    })
}

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove
}