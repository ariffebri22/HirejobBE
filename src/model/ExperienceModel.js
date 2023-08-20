const Pool = require("../config/db");

const getExpAll = async () => {
    console.log("model getExpAll");
    return new Promise((resolve, reject) =>
        Pool.query(
            `SELECT ex.id, wo.username AS workers, ex.posisi, ex.nama_perusahaan, ex.working_start_at, ex.working_end_at, ex.deskripsi, ex.created_at
        FROM workers_experience ex
        JOIN workers_authprofile wo ON ex.id_workers = wo.id
        ORDER BY ex.id DESC`,
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

const getExp = async (data) => {
    const { search, searchBy, sort, offset, limit } = data;
    console.log("model getExp", search, searchBy, sort, offset, limit);
    return new Promise((resolve, reject) =>
        Pool.query(
            `SELECT ex.id, wo.username AS workers, ex.posisi, ex.nama_perusahaan, ex.working_start_at, ex.working_end_at, ex.deskripsi, ex.created_at
            FROM workers_experience ex
            JOIN workers_authprofile wo ON ex.id_workers = wo.id
            WHERE ${searchBy} ILIKE '%${search}%' ORDER BY id ${sort} OFFSET ${offset} LIMIT ${limit} `,
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

const getExpCount = async (data) => {
    const { search, searchBy, sort, offset, limit } = data;
    console.log("model getExpCount", search, searchBy, sort, offset, limit);
    return new Promise((resolve, reject) =>
        Pool.query(`SELECT COUNT(*) FROM workers_experience WHERE ${searchBy} ILIKE '%${search}%'`, (err, result) => {
            if (!err) {
                resolve(result);
            } else {
                reject(err);
            }
        })
    );
};

const postExp = async (data) => {
    const { id_workers, posisi, nama_perusahaan, working_start_at, working_end_at, deskripsi } = data;
    console.log(data);
    console.log("model postExp");
    return new Promise((resolve, reject) =>
        Pool.query(
            `INSERT INTO workers_experience(id_workers, posisi, nama_perusahaan, working_start_at, working_end_at, deskripsi) VALUES('${id_workers}','${posisi}','${nama_perusahaan}','${working_start_at}','${working_end_at}','${deskripsi}')`,
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

const putExp = async (data) => {
    const { id, posisi, nama_perusahaan, working_start_at, working_end_at, deskripsi } = data;
    console.log("model putExp");
    return new Promise((resolve, reject) =>
        Pool.query(
            `UPDATE workers_experience SET posisi='${posisi}', nama_perusahaan='${nama_perusahaan}', working_start_at='${working_start_at}', working_end_at='${working_end_at}', deskripsi='${deskripsi}' WHERE id=${id}`,
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

const getExpByIdWorkers = async (id) => {
    console.log("model exp by id workers ->", id);
    return new Promise((resolve, reject) =>
        Pool.query(`SELECT * FROM workers_experience WHERE id_workers=${id}`, (err, result) => {
            if (!err) {
                resolve(result);
            } else {
                reject(err);
            }
        })
    );
};

const getExpById = async (id) => {
    console.log("model exp by id workers ->", id);
    return new Promise((resolve, reject) =>
        Pool.query(`SELECT * FROM workers_experience WHERE id=${id}`, (err, result) => {
            if (!err) {
                resolve(result);
            } else {
                reject(err);
            }
        })
    );
};

const deleteExpById = async (id) => {
    console.log("delete exp by id ->", id);
    return new Promise((resolve, reject) =>
        Pool.query(`DELETE FROM workers_experience WHERE id=${id}`, (err, result) => {
            if (!err) {
                resolve(result);
            } else {
                reject(err);
            }
        })
    );
};

module.exports = { getExp, getExpAll, getExpCount, getExpById, deleteExpById, getExpByIdWorkers, postExp, putExp };
