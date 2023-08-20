const xss = require("xss");
const { getExp, getExpAll, getExpCount, getExpById, deleteExpById, getExpByIdWorkers, postExp, putExp } = require("../model/ExperienceModel");
const { GenerateToken } = require("../helpers/GenerateToken");

const ExperienceController = {
    getDataDetail: async (req, res, next) => {
        try {
            const { search, searchBy, sort, limit } = req.query;

            const cleanedSearch = xss(search);
            const cleanedSearchBy = xss(searchBy);
            const cleanedSort = xss(sort);
            const cleanedLimit = xss(limit);

            let page = req.query.page || 1;
            let limiter = cleanedLimit || 5;

            const data = {
                search: cleanedSearch || "",
                searchBy: cleanedSearchBy || "title",
                sort: cleanedSort || "asc",
                offset: (page - 1) * limiter,
                limit: limiter,
            };

            const dataExp = await getExp(data);
            const dataExpCount = await getExpCount(data);

            const pagination = {
                totalPage: Math.ceil(dataExpCount.rows[0].count / limiter),
                totalData: parseInt(dataExpCount.rows[0].count),
                pageNow: parseInt(page),
            };

            console.log("dataExp");
            console.log(dataExp);
            console.log("total data");
            console.log(dataExpCount.rows[0].count);

            if (dataExp) {
                res.status(200).json({ status: 200, message: "get data experience success", data: dataExp.rows, pagination });
            } else {
                res.status(404).json({ status: 404, message: "Experience data not found", data: [] });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ status: 500, message: "Internal server error" });
        }
    },
    getData: async (req, res, next) => {
        try {
            const dataExp = await getExpAll();
            console.log("dataExp");
            console.log(dataExp);
            res.status(200).json({ status: 200, message: "get data experience success", data: dataExp.rows });
        } catch (err) {
            console.error(err);
            res.status(500).json({ status: 500, message: "Internal server error" });
        }
    },
    getDataById: async (req, res, next) => {
        try {
            const { id } = req.params;

            if (!id || id <= 0 || isNaN(id)) {
                return res.status(400).json({ status: 400, message: "Invalid id" });
            }

            const dataExpId = await getExpById(parseInt(id));

            console.log("dataExp");
            console.log(dataExpId);

            if (!dataExpId.rows[0]) {
                return res.status(404).json({ status: 404, message: "Experience data not found", data: [] });
            }

            res.status(200).json({ status: 200, message: "get data recipe success", data: dataExpId.rows[0] });
        } catch (err) {
            console.error(err);
            res.status(500).json({ status: 500, message: "Internal server error" });
        }
    },

    getDataByWorkers: async (req, res, next) => {
        try {
            const { id } = req.params;

            if (!id || id <= 0 || isNaN(id)) {
                return res.status(400).json({ status: 400, message: "Invalid users_id" });
            }

            const dataExpWorkers = await getExpByIdWorkers(parseInt(id));

            console.log("dataExp");
            console.log(dataExpWorkers);

            if (!dataExpWorkers.rows[0]) {
                return res.status(404).json({ status: 404, message: "Experience data not found", data: [] });
            }

            res.status(200).json({ status: 200, message: "get data recipe success", data: dataExpWorkers.rows });
        } catch (err) {
            console.error(err);
            res.status(500).json({ status: 500, message: "Internal server error" });
        }
    },

    deleteDataById: async (req, res, next) => {
        try {
            const { id } = req.params;

            if (!id || id <= 0 || isNaN(id)) {
                return res.status(400).json({ status: 400, message: "Invalid id" });
            }

            const dataExpId = await getExpById(parseInt(id));

            const users_id = req.payload.id;

            console.log("id data");
            console.log(users_id);
            console.log(dataExpId.rows[0].id);
            if (users_id !== dataExpId.rows[0].id_workers) {
                return res.status(403).json({ status: 403, message: "You are not authorized to access this." });
            }

            const result = await deleteExpById(parseInt(id));
            console.log(result);
            if (result.rowCount === 0) {
                throw new Error("Delete data failed");
            }

            res.status(200).json({ status: 200, message: "delete data recipe success", data: result.rows[0] });
        } catch (err) {
            console.error(err);
            res.status(500).json({ status: 500, message: err.message });
        }
    },
    postData: async (req, res, next) => {
        try {
            const { posisi, nama_perusahaan, working_start_at, working_end_at, deskripsi } = req.body;

            console.log("post data");
            console.log(posisi, nama_perusahaan, working_start_at, working_end_at, deskripsi);

            if (!posisi || !nama_perusahaan || !working_start_at || !working_end_at || !deskripsi) {
                return res.status(400).json({ status: 400, message: "Please input fill are required" });
            }

            let data = {
                id_workers: req.payload.id,
                posisi: xss(posisi),
                nama_perusahaan: xss(nama_perusahaan),
                working_start_at: xss(working_start_at),
                working_end_at: xss(working_end_at),
                deskripsi: xss(deskripsi),
            };

            const result = await postExp(data);
            console.log(result);

            delete data.id;

            res.status(200).json({ status: 200, message: "Data experience berhasil ditambahkan", data });
        } catch (err) {
            console.error(err);
            res.status(500).json({ status: 500, message: "Terjadi kesalahan pada server" });
        }
    },

    putData: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { posisi, nama_perusahaan, working_start_at, working_end_at, deskripsi } = req.body;

            if (!id || id <= 0 || isNaN(id)) {
                return res.status(400).json({ status: 400, message: "Invalid id" });
            }

            const dataExpId = await getExpById(parseInt(id));

            const users_id = req.payload.id;

            console.log("id data");
            console.log(users_id);
            console.log(dataExpId.rows[0].id);
            if (users_id !== dataExpId.rows[0].id_workers) {
                return res.status(403).json({ status: 403, message: "You are not authorized to access this." });
            }

            console.log("put data");
            console.log(dataExpId.rows[0]);

            const data = {
                id: dataExpId.rows[0].id,
                posisi: xss(posisi) || dataExpId.rows[0].posisi,
                nama_perusahaan: xss(nama_perusahaan) || dataExpId.rows[0].nama_perusahaan,
                working_start_at: xss(working_start_at) || dataExpId.rows[0].working_start_at,
                working_end_at: xss(working_end_at) || dataExpId.rows[0].working_end_at,
                deskripsi: xss(deskripsi) || dataExpId.rows[0].deskripsi,
            };

            const result = await putExp(data, id);
            console.log(result);

            delete data.id;

            res.status(200).json({ status: 200, message: "update data experience success", data });
        } catch (err) {
            console.error(err);
            res.status(500).json({ status: 500, message: "Internal server error" });
        }
    },
};

module.exports = ExperienceController;
