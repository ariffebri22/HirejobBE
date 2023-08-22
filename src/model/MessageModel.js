const Pool = require("../config/db");

const postMessageModel = async (data) => {
  const { position_job,message_recruiter,message_workers} = data;
  console.log(data);
  console.log("Model postMessageModel");
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO message_app (position_job,message_recruiter,message_workers) VALUES('${position_job}','${message_recruiter}','${message_workers}')`,
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

const getMessageCompanyById = (id) => {
  return new Promise((resolve, reject) => {
    Pool.query(
      `SELECT company_authprofil.perusahaan,company_authprofil.jabatan FROM company_authprofil WHERE company_authprofil.id=${id}`,
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

const getMessageById = (id) => {
  return new Promise((resolve, reject) => {
    Pool.query(
      `SELECT message_app.message_recruiter, message_app.message_workers FROM message_app WHERE message_app.id=${id}`,
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

module.exports = {postMessageModel,getMessageCompanyById,getMessageById};