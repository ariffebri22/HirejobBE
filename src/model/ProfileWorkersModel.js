const Pool = require("../config/db");
const postProfileWorkers = async (data) => {
  const {
    id_worker,
    position,
    domicile,
    company_work,
    job_desc,
    photo_worker,
  } = data;
  console.log(data);
  console.log("model postProfileWorker");
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO workers_profile (id_worker, position, domicile, company_work, job_desc,photo_worker) VALUES('${id_worker}','${position}','${domicile}','${company_work}','${job_desc}','${photo_worker}')`,
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

const putProfileWorkers = async (id, data) => {
  const { position, domicile, company_work, job_desc, photo_worker } = data;
  console.log(data);
  console.log("model putProfileWorkers");
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE workers_profile SET position='${position}', domicile='${domicile}', company_work='${company_work}', job_desc='${job_desc}', photo_worker='${photo_worker}' WHERE workers_profile.id_worker=${id}`,
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
const getProfileWorkersById = (id) => {
  return new Promise((resolve, reject) => {
    Pool.query(
      `SELECT workers.username, workers_profile.id_worker, workers_profile.position, workers_profile.domicile, workers_profile.company_work, workers_profile.job_desc, workers_profile.photo_worker FROM workers_profile JOIN workers ON workers_profile.id_worker = workers.id WHERE workers.id=${id}`,
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
  postProfileWorkers,
  putProfileWorkers,
  getProfileWorkersById,
};
