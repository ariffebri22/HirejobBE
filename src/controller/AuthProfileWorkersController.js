const { getUserByEmail, createUser, changePassword, activatedUser, getAuthProfileWorkersById, putAuthProfileWorkers } = require("../model/AuthProfileWorkersModel");
const argon2 = require("argon2");
const { GenerateToken } = require("../helpers/GenerateToken");

const { v4: uuidv4 } = require("uuid");
const Email = require("./../midleware/Email");

const cloudinary = require("../config/photo");

const AuthProfileController = {
    registerWorker: async (req, res, next) => {
        let { username, email, phone, password } = req.body;

        if (!username || !email || !phone || !password) {
            return res.status(404).json({
                status: 404,
                message: "input correctly, please",
            });
        }

        let user = await getUserByEmail(email);

        if (user.rows[0]) {
            return res.status(404).json({
                status: 404,
                message: "Email is already registered",
            });
        }

        // email
        let uuid = uuidv4();
        console.log("uuid", uuid);
        //

        password = await argon2.hash(password);

        let dataUser = {
            username,
            email,
            phone,
            password,
            uuid,
            type: "workers",
        };

        let data = await createUser(dataUser);
        console.log("create");
        console.log(data);

        if (!data.rowCount == 1) {
            return res.status(404).json({ status: 404, message: "register failed" });
        }

        //email
        let url = `${process.env.BASE_URL}/auth/verifyworker/${uuid}`;
        let sendEmail = Email(email, url, username);

        console.log("sendEmail", sendEmail);
        console.log(sendEmail);
        //

        return res.status(200).json({ status: 200, message: "User registration successful" });
    },

    loginWorker: async (req, res, next) => {
        let { email, password } = req.body;
        console.log(email, password);

        if (!email || !password) {
            return res.status(404).json({
                status: 404,
                message: "input correctly, please",
            });
        }

        let data = await getUserByEmail(email);
        console.log(data.rows[0]);

        if (!data.rows[0]) {
            return res.status(404).json({ status: 404, message: "Email is not yet registered" });
        }

        let users = data.rows[0];
        console.log("users.password");
        console.log(users.password);
        let verify = await argon2.verify(users.password, password);
        if (!verify) {
            return res.status(404).json({ status: 404, message: "Invalid password" });
        }
        delete users.password;
        let token = GenerateToken(users);
        users.token = token;

        if (!users.is_active) {
            return res.status(404).json({ status: 494, message: "email belum diaktivasi" });
        }

        res.status(200).json({ status: 200, message: "get data profile success", users });
    },

    changeDataWorker: async (req, res, next) => {
        let { username, password } = req.body;
        console.log("req.body");
        console.log(req.body);

        let email = req.payload.email;

        password = await argon2.hash(password);

        let data = {
            username: username || req.payload.username,

            password: password || req.payload.password,
        };

        let result = await changePassword(email, data);
        console.log(result);
        return res.status(200).json({
            status: 200,
            message: "update data worker success",
            data,
            result,
        });
    },
    verifyWorker: async (req, res, next) => {
        const { id } = req.params;
        let result = await activatedUser(id);
        console.log("result");
        console.log(result);
        if (result) {
            return res.status(200).json({ status: 200, message: "verify success silakan login" });
        }
        return res.status(404).json({ status: 404, message: "verify gagal harap coba lagi" });
    },

    putWorkers: async (req, res, next) => {
        const { id } = req.params;
        const { username, position, domicile, company_work, job_desc } = req.body;
        const { photo_worker } = req.file;
        console.log("req.body");
        console.log(req.body);
        console.log(username, position, domicile, company_work, job_desc, photo_worker);

        if (!id || id <= 0 || isNaN(id)) {
            return res.status(404).json({ message: "wrong input id" });
        }

        let dataWorkersId = await getAuthProfileWorkersById(parseInt(id));

        let id_payload = req.payload.id;

        console.log("id data");
        console.log(id);
        console.log(dataWorkersId);
        console.log(dataWorkersId.rows[0]);
        if (id_payload != dataWorkersId.rows[0].id) {
            return res.status(404).json({ message: "not your recipe" });
        }

        console.log("dataWorkersId");
        console.log(dataWorkersId);
        if (!dataWorkersId.rows[0]) {
            return res.status(200).json({
                status: 200,
                message: "get data recipe data not found",
                data: [],
            });
        }
        console.log("req.isFileValid");

        console.log(req.isFileValid);

        if (!req.isFileValid) {
            return res.status(404).json({ message: req.isFileValidMessage });
        }

        const ImageCloud = await cloudinary.uploader.upload(req.file.path, {
            folder: "HireJob Project",
        });

        if (!ImageCloud) {
            return res.status(404).json({ message: "upload photo fail" });
        }
        console.log(ImageCloud);
        console.log("put data");
        console.log(dataWorkersId.rows[0]);
        let data = {
            username: username || dataWorkersId.rows[0].username,
            position: position || dataWorkersId.rows[0].position,
            domicile: domicile || dataWorkersId.rows[0].domicile,
            company_work: company_work || dataWorkersId.rows[0].company_work,
            job_desc: job_desc || dataWorkersId.rows[0].job_desc,
            photo_worker: ImageCloud.secure_url || dataWorkersId.rows[0].photo_worker,
        };

        console.log(data);

        let result = await putAuthProfileWorkers(parseInt(id), data);
        let after = await getAuthProfileWorkersById(parseInt(id));
        console.log(result);
        return res.status(200).json({
            status: 200,
            message: "update data recipe success",
            data,
            after: after.rows[0],
        });
    },

    getWorkersById: async (req, res, next) => {
        const { id } = req.params;
        // let numberId = parseInt(req.params.id)
        // console.log(numberId)
        if (isNaN(id) || id < 0 || !id) {
            return res.status(404).json({ message: "wrong input id" });
        }

        let dataWorkersId = await getAuthProfileWorkersById(parseInt(id));

        console.log("dataWorkersId");
        console.log(dataWorkersId);
        if (!dataWorkersId.rows[0]) {
            return res.status(200).json({
                status: 200,
                message: "get data profile data not found",
                data: [],
            });
        }
        if (dataWorkersId) {
            res.status(200).json({
                status: 200,
                message: "get data profile success",
                data: dataWorkersId.rows,
            });
        }
    },
};

module.exports = AuthProfileController;
