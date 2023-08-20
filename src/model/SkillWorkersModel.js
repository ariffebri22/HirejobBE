const Pool = require("../config/db");
const postSkillWorkers = async (data) => {
  const { id_worker, skills_name } = data;
  console.log(data);
  console.log("model postProfileWorker");
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO workers_skills (id_worker, skills_name) VALUES('${id_worker}','${skills_name}')`,
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

const putSkillWorkers = async (id, data) => {
  const { skills_name } = data;
  console.log(data);
  console.log("model putSkillWorkers");
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE workers_skills SET skills_name='${skills_name}' WHERE workers_skills.id_worker=${id}`,
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
const getSkillWorkersById = (id) => {
  return new Promise((resolve, reject) => {
    Pool.query(
      `SELECT workers_skills.* FROM workers_skills JOIN workers ON workers_skills.id_worker = workers.id WHERE workers.id=${id}`,
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
  postSkillWorkers,
  putSkillWorkers,
  getSkillWorkersById,
};
