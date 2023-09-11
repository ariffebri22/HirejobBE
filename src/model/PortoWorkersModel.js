const Pool = require("../config/db");
const postPortoWorkers = async (data) => {
    const { id_worker, porto_name, porto_link, porto_type, porto_photo } = data;
    console.log(data);
    console.log("model postPortoWorker");
    return new Promise((resolve, reject) =>
        Pool.query(`INSERT INTO workers_portofolio (id_worker, porto_name, porto_link, porto_type, porto_photo) VALUES('${id_worker}','${porto_name}','${porto_link}','${porto_type}','${porto_photo}')`, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    );
};

const putPortoWorkers = async (id, data) => {
    const { porto_name, porto_link, porto_type, porto_photo } = data;
    console.log(data);
    console.log("model putPortoWorkers");
    return new Promise((resolve, reject) =>
        Pool.query(`UPDATE workers_portofolio SET porto_name='${porto_name}', porto_link='${porto_link}', porto_type='${porto_type}', porto_photo='${porto_photo}' WHERE workers_portofolio.id=${id}`, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    );
};

const deletePortoWorkersById = (id) => {
    console.log("deletePortoWorkersById");
    return new Promise((resolve, reject) => {
        Pool.query(`DELETE FROM workers_portofolio WHERE workers_portofolio.id = ${id}`, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

const getPortoWorkersById = (id) => {
    return new Promise((resolve, reject) => {
        Pool.query(
            `SELECT workers_portofolio.id_worker, workers_portofolio.porto_name, workers_portofolio.porto_link, workers_portofolio.porto_type, workers_portofolio.porto_photo FROM workers_portofolio JOIN workers_authprofile ON workers_portofolio.id_worker = workers_authprofile.id WHERE workers_portofolio.id=${id}`,
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

const getPortoUsersById = (id) => {
    return new Promise((resolve, reject) => {
        Pool.query(
            `SELECT workers_portofolio.id, workers_portofolio.id_worker, workers_portofolio.porto_name, workers_portofolio.porto_link, workers_portofolio.porto_type, workers_portofolio.porto_photo FROM workers_portofolio JOIN workers_authprofile ON workers_portofolio.id_worker = workers_authprofile.id WHERE workers_portofolio.id_worker=${id}`,
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
    postPortoWorkers,
    putPortoWorkers,
    deletePortoWorkersById,
    getPortoWorkersById,
    getPortoUsersById,
};
