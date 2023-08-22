const Pool = require("../config/db");

const postMessage = async (data) => {
  const { id_company,id_worker,company_message, workers_message } = data;
  console.log(data);
  console.log("model postMessage");
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO pesan (id_company, id_worker, company_message, workers_message) VALUES(${id_company}, ${id_worker}, '${company_message}','${workers_message}')`,
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

const getMessageCompany = (payload,id) => {
  return new Promise((resolve, reject) => {
    Pool.query(
      `SELECT
      workers_authprofile.perusahaan, workers_authprofile.bidang, pesan.id_company, pesan.id_worker, pesan.company_message, pesan.workers_message
      FROM pesan
      JOIN workers_authprofile ON pesan.id_worker = workers_authprofile.id
      WHERE pesan.id_worker=${payload} AND pesan.id_company=${id}`,
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

const getMessageWorkers = (payload,id) => {
  return new Promise((resolve, reject) => {
    Pool.query(
      `SELECT
      company_authprofil.perusahaan, company_authprofil.bidang, pesan.id_company, pesan.id_worker, pesan.company_message, pesan.workers_message
      FROM pesan
      JOIN company_authprofil ON pesan.id_company = company_authprofil.id
      WHERE pesan.id_worker=${payload} AND pesan.id_company=${id}`,
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

module.exports = {
  postMessage,
  getMessageWorkers,
  getMessageCompany
};
