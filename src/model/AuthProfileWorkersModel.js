const Pool = require("../config/db");

const getUserByEmail = async (email) => {
  console.log("model getUserByEmail");
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM workers_authprofile WHERE email='${email}'`,
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

const createUser = async (data) => {
  let { username, email, phone, password, uuid } = data;
  console.log("model createUser");
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO workers_authprofile (username, email, phone, password, checker) VALUES('${username}','${email}','${phone}','${password}','${uuid}')`,
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

const activatedUser = async (uuid) => {
  console.log("model activate");
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE workers_authprofile SET is_active=true WHERE checker='${uuid}'`,
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

const changePassword = async (email, data) => {
  const { username, password } = data;
  console.log(data);
  console.log("model changePassword");
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE workers_authprofile SET username='${username}',password='${password}' WHERE workers_authprofile.email= '${email}'`,
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

//TODO: PROFILE DIV

const putAuthProfileWorkers = async (id, data) => {
  const { username, position, domicile, company_work, job_desc, photo_worker } = data;
  console.log(data);
  console.log("model putAuthProfileWorkers");
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE workers_authprofile SET username='${username}', position='${position}', domicile='${domicile}', company_work='${company_work}', job_desc='${job_desc}', photo_worker='${photo_worker}' WHERE workers_authprofile.id=${id}`,
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
const getAuthProfileWorkersById = (id) => {
  return new Promise((resolve, reject) => {
    Pool.query(
      `SELECT workers_authprofile.id, workers_authprofile.username, workers_authprofile.position, workers_authprofile.domicile, workers_authprofile.company_work, workers_authprofile.job_desc, workers_authprofile.photo_worker FROM workers_authprofile WHERE workers_authprofile.id=${id}`,
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
  putAuthProfileWorkers,
  getAuthProfileWorkersById,
  getUserByEmail,
  createUser,
  changePassword,
  activatedUser,
};
