const db = require('../util/db');
const { isEmptyOrNull } = require('../util/service');
const bcrypt = require('bcrypt');

const getAll = async (req,res) =>{
    const sql = 'SELECT * FROM staff';
    const users = await db.query(sql);
    res.json({
        data_staff: users,
        message: "Get all data staff success"
    })
}

const getOne = async (req, res) =>{
    const sql = 'SELECT * FROM staff WHERE id = ?';
    const user = await db.query(sql, [req.params.id]);
    res.json({
        data_staff: user,
        message: "Get data staff success"
    })
}

const create = async (req, res) =>{
    const {
        fullname,
        telephone,
        email,
        password,
        salary,
        address,
        image
    } = req.body;

    message = {}
    if(isEmptyOrNull(fullname)){message.fullname = "Name is required"}
    if(isEmptyOrNull(telephone)){message.telephone = "Telephone is required"}
    if(isEmptyOrNull(email)){message.email = "Email is required"}
    if(isEmptyOrNull(password)){message.password = "Password is required"}
    if(isEmptyOrNull(salary)){message.salary = "Salary is required"}
    if(isEmptyOrNull(address)){message.address = "Address is required"}
    if(Object.keys(message).length > 0){
        res.json({
            message: message,
            error: true
        })
        return;
    }

    let passwordBcrypt = await bcrypt.hash(password, 10);
    let sql = "INSERT INTO staff (fullname,telephone,email,password,salary,address,image) VALUES (?,?,?,?,?,?,?)";
    let param_create = [
        fullname,
        telephone,
        email,
        passwordBcrypt,
        salary,
        address,
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
                data_staff: result,
                message: "Create data staff success"
            })
        }
    })
}

const update = async (req, res) =>{
    const {
        id,
        fullname,
        telephone,
        email,
        password,
        salary,
        address,
        image
    } = req.body;

    message = {}
    if(isEmptyOrNull(fullname)){message.fullname = "Name is required"}
    if(isEmptyOrNull(telephone)){message.telephone = "Telephone is required"}
    if(isEmptyOrNull(email)){message.email = "Email is required"}
    if(isEmptyOrNull(password)){message.password = "Password is required"}
    if(isEmptyOrNull(salary)){message.salary = "Salary is required"}
    if(isEmptyOrNull(address)){message.address = "Address is required"}
    if(Object.keys(message).length > 0){
        res.json({
            message: message,
            error: true
        })
        return;
    }

    let passwordBcrypt = await bcrypt.hash(password, 10);
    let sql = "UPDATE staff SET fullname = ?, telephone = ?, email = ?, password = ?, salary = ?, address = ?, image = ? WHERE id = ?";
    let param_update = [
        fullname,
        telephone,
        email,
        passwordBcrypt,
        salary,
        address,
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
                data_staff: result,
                message: "Update data staff success"
            })
        }
    })
}

const remove = async (req, res) =>{
    const data = await db.query('DELETE FROM staff WHERE id = ?', [req.params.id]);
    res.json({
        data_staff: data,
        status: 'success',
        message: "Delete data staff"
    })
}


module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove
}