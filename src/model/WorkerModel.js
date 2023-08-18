const Pool = require('../config/db')

const getUser = (data) => {
    const {search,searchBy, offset, limit} = data

    console.log("model getUser",search,searchBy, offset, limit)
    return new Promise((resolve,reject)=>
        Pool.query(`SELECT users.id, users.name, users.email FROM users WHERE ${searchBy} ILIKE '%${search}%' ORDER BY users.id ASC OFFSET ${offset} LIMIT ${limit}`,(err,result)=>{
            if(!err){
                resolve(result)
            } else{
                reject(err)
            }
        })
    )
}

const getUsersById = async (id) => {
    console.log("model Users by id ->",id)
    return new Promise((resolve,reject)=>
        Pool.query(`SELECT * FROM users WHERE id=${id}`,(err,result)=>{
            if(!err){
                resolve(result)
            } else{
                reject(err)
            }
        })
    )
}
const getUsersByEmail = async (email) => {
    console.log("model getUserByEmail")
    return new Promise((resolve,reject)=>
        Pool.query(`SELECT * FROM users WHERE email='${email}'`,(err,result)=>{
            if(!err){
                resolve(result)
            } else{
                reject(err)
            }
        })
    )
}

const deleteUserById = async (id) => {
    console.log("delete users by id ->",id)
    return new Promise((resolve,reject)=>
        Pool.query(`DELETE FROM users WHERE id=${id}`,(err,result)=>{
            if(!err){
                resolve(result)
            } else{
                reject(err)
            }
        })
    )
}

const postUser = async (data) => {
    const{name,email} = data
    console.log(data)
    console.log("model postUsers")
    return new Promise((resolve,reject)=>
        Pool.query(`INSERT INTO users(name,email) VALUES('${name}','${email}')`,(err,result)=>{
            if(!err){
                resolve(result)
            } else{
                reject(err)
            }
        })
    )
}

const putUser = async (data,id) => {
    const{name,email} = data
    console.log("model putusers")
    return new Promise((resolve,reject)=>
        Pool.query(`UPDATE users SET name='${name}', email='${email}' WHERE id=${id}`,(err,result)=>{
            if(!err){
                resolve(result)
            } else{
                reject(err)
            }
        })
    )
}

const getUserAll = async () => {
    console.log("model getRecipe")
    return new Promise((resolve,reject)=>
        Pool.query(`SELECT * FROM users`,(err,result)=>{
            if(!err){
                resolve(result)
            } else{
                reject(err)
            }
        })
    )
}

const getUserCount = async (data) => {
    const {search, searchBy, offset, limit} = data
    console.log("model getUsers",search,searchBy,offset,limit)
    return new Promise((resolve,reject)=>
        Pool.query(`SELECT COUNT(*) FROM users WHERE ${searchBy} ILIKE '%${search}%'`,(err,result)=>{
            if(!err){
                resolve(result)
            } else{
                reject(err)
            }
        })
    )
}

const createUser = async (data) => {
    let {username,email,password,photo,uuid} = data
    console.log("model createUser")
    return new Promise((resolve,reject)=>
        Pool.query(`INSERT INTO users(username,email,password,photo,checker) VALUES('${username}','${email}','${password}','${photo}','${uuid}')`,(err,result)=>{
            if(!err){
                resolve(result)
            } else{
                reject(err)
            }
        })
    )
}

const activatedUser = async (uuid) => {
    console.log("model activate")
    return new Promise((resolve,reject)=>
        Pool.query(`UPDATE users SET is_active=true WHERE checker='${uuid}'`,(err,result)=>{
            if(!err){
                resolve(result)
            } else{
                reject(err)
            }
        })
    )
}


module.exports =  {getUser,getUsersById,deleteUserById,postUser,putUser,getUserAll,getUserCount,getUsersByEmail,createUser,activatedUser}