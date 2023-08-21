const Pool = require('../config/db')

const getRecruiterAll = async () => {
    console.log("model getRecipe")
    return new Promise((resolve,reject)=>
        Pool.query(`SELECT profil_company.id, profil_company.bidang, profil_company.provinsi, profil_company.photo, profil_company.kota, profil_company.deskripsi, profil_company.email_perusahaan, profil_company.phone_company, profil_company.linkedin, recruiters.perusahaan AS perusahaan FROM profil_company JOIN recruiters ON profil_company.id_company = id_company`,(err,result)=>{
            if(!err){
                resolve(result)
            } else{
                reject(err)
            }
        })
    )
}

const postCompany = async (data) => {
    const{bidang,provinsi,kota,photo,deskripsi,email_perusahaan,phone_company,linkedin,id_company} = data
    console.log(data)
    console.log("model postRecipe")
    return new Promise((resolve,reject)=>
        Pool.query(`INSERT INTO profil_company(id_company,bidang,provinsi,photo,kota,deskripsi,email_perusahaan,phone_company,linkedin) VALUES('${id_company}','${bidang}','${provinsi}','${photo}','${kota}','${deskripsi}','${email_perusahaan}','${phone_company}','${linkedin}')`,(err,result)=>{
            if(!err){
                resolve(result)
            } else{
                reject(err)
            }
        })
    )
}



module.exports ={postCompany,getRecruiterAll}