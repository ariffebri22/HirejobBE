const Pool = require("../config/db");

const getUserByEmail = async (email) => {
  console.log("model getUserByEmail");
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT * FROM workers WHERE email='${email}'`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    })
  );
};

const createUser = async (data) => {
  let { username, email, phone, password, uuid } = data;
  console.log("model createUser");
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO workers (username, email, phone, password, checker) VALUES('${username}','${email}','${phone}','${password}','${uuid}')`,
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
        `UPDATE workers SET is_active=true WHERE checker='${uuid}'`,
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
  const { username,password } = data;
  console.log(data);
  console.log("model changePassword");
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE workers SET username='${username}',password='${password}' WHERE workers.email= '${email}'`,
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

module.exports = { getUserByEmail, createUser, changePassword, activatedUser };