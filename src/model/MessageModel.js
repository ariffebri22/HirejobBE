const Pool = require("../config/db");

const postMessageModel = async (data) => {
  const { id_rekruter,id_pekerja,position_job,message_hiring } = data;
  console.log(data);
  console.log("Model postMessageModel");
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO message_app (id_rekruter,id_pekerja,position_job,message_hiring) VALUES(${id_rekruter},${id_pekerja},'${position_job}','${message_hiring}')`,
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

module.exports = {postMessageModel};