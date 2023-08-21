const Pool = require("../config/db");

const createUser = async (data) => {
  let { username, email, password, phone, jabatan, perusahaan, uuid } = data;
  console.log("model createUser");
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO company_authprofil(username,email,password,phone,jabatan,perusahaan,checker) VALUES('${username}','${email}','${password}','${phone}','${jabatan}','${perusahaan}','${uuid}')`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};
const getUsersByEmail = async (email) => {
  console.log("model getUserByEmail");
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM company_authprofil WHERE email='${email}'`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

const activatedUser = async (uuid) => {
  console.log("model activate");
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE company_authprofil SET is_active=true WHERE checker='${uuid}'`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

const changeData = async (email, data) => {
  const {  password } = data;
  console.log(data);
  console.log("model changeData");
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE company_authprofil SET password='${password}' WHERE company_authprofil.email='${email}'`,
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    )
  );
};

const putAuthProfileRecruiter = async (id, data) => {
    const { username, bidang,provinsi,kota,deskripsi,email_perusahaan,phone_company,linkedin,photo} = data;
    console.log(data);
    console.log("model putAuthProfileRecruiter");
    return new Promise((resolve, reject) =>
      Pool.query(
        `UPDATE company_authprofil SET username='${username}', bidang='${bidang}', provinsi='${provinsi}', kota='${kota}', deskripsi='${deskripsi}', email_perusahaan='${email_perusahaan}', phone_company='${phone_company}', linkedin='${linkedin}', photo='${photo}' WHERE company_authprofil.id=${id}`,
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      )
    );
  };
  const getAuthProfileRecruiterById = (id) => {
    return new Promise((resolve, reject) => {
      Pool.query(
        `SELECT company_authprofil.id,company_authprofil.bidang, company_authprofil.provinsi, company_authprofil.photo, company_authprofil.kota, company_authprofil.deskripsi, company_authprofil.email_perusahaan, company_authprofil.phone_company, company_authprofil.linkedin, company_authprofil.perusahaan AS perusahaan FROM company_authprofil WHERE company_authprofil.id=${id}`,
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }

        }
      );
    });
  };


const getRecruiterAll = async () => {
    console.log("model getRecipe")
    return new Promise((resolve,reject)=>
        Pool.query(`SELECT company_authprofil.id,company_authprofil.username,company_authprofil.email,company_authprofil.phone,company_authprofil.jabatan,company_authprofil.is_active,company_authprofil.checker, company_authprofil.bidang, company_authprofil.provinsi, company_authprofil.photo, company_authprofil.kota, company_authprofil.deskripsi, company_authprofil.email_perusahaan, company_authprofil.phone_company, company_authprofil.linkedin, company_authprofil.perusahaan AS perusahaan FROM company_authprofil`,(err,result)=>{
            if(!err){
                resolve(result)
            } else{
                reject(err)
            }
        })
    )
}





module.exports = { createUser, getUsersByEmail, activatedUser, changeData,getRecruiterAll,putAuthProfileRecruiter,getAuthProfileRecruiterById };