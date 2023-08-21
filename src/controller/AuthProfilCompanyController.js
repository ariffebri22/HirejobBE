const { createUser, getUsersByEmail, activatedUser, changeData, getRecruiterAll, putAuthProfileRecruiter, getAuthProfileRecruiterById } = require('../model/AuthProfilCompanyModel')
const argon2 = require('argon2');
const { GenerateToken } = require('./../helpers/GenerateToken');
const cloudinary = require('../config/photo')

const { v4: uuidv4 } = require("uuid");
const Email = require("./../midleware/Email");


const ProfilRecruiterController = {
    register: async (req, res, next) => {
        let { email, password, username, phone, jabatan, perusahaan } = req.body;

        if (!email || !password || !username) {
            return res
                .status(404)
                .json({
                    status: 404,
                    message: "email, password dan username harus diisi dengan benar",
                });
        }

        let user = await getUsersByEmail(email);

        if (user.rows[0]) {
            return res
                .status(404)
                .json({
                    status: 404,
                    message: "email sudah terdaftar, silahkan login",
                });
        }

        // email
        let uuid = uuidv4();
        console.log("uuid", uuid);
        //

        password = await argon2.hash(password);

        let dataUser = {
            email,
            username,
            password,
            phone,
            jabatan,
            perusahaan,
            uuid,
        };

        let data = await createUser(dataUser);

        console.log(data);

        if (!data.rowCount == 1) {
            return res.status(404).json({ status: 404, message: "register gagal" });
        }

        //email
        let url = `${process.env.BASE_URL}/auth/verify/${uuid}`;
        let sendEmail = Email(email, url, username);

        console.log("sendEmail", sendEmail);
        console.log(sendEmail);
        //

        return res
            .status(200)
            .json({ status: 200, message: "register user berhasil" });
    },
    login: async (req, res, next) => {
        let { email, password } = req.body;
        console.log(email, password);

        if (!email || !password) {
            return res
                .status(404)
                .json({
                    status: 404,
                    message: "email atau password harus diisi dengan benar",
                });
        }

        let data = await getUsersByEmail(email);
        console.log(data.rows[0]);

        if (!data.rows[0]) {
            return res
                .status(404)
                .json({ status: 404, message: "email belum terdaftar" });
        }

        let users = data.rows[0];
        console.log("users.password");
        console.log(users.password);
        let verify = await argon2.verify(users.password, password);
        if (!verify) {
            return res.status(404).json({ status: 404, message: "password salah" });
        }
        delete users.password;
        let token = GenerateToken(users);
        users.token = token;

        if (!users.is_active) {
            return res
                .status(404)
                .json({ status: 494, message: "email belum diaktivasi" });
        }

        res
            .status(200)
            .json({ status: 200, message: "get data profile success", users });
    },

    putData: async (req, res, next) => {
        let { username, password } = req.body;
        console.log("req.body");
        console.log(req.body);

        let email = req.payload.email;

        console.log("put data");
        console.log(password);

        password = await argon2.hash(password);

        let data = {
            username: username || req.payload.username,
            password: password || req.payload.password,
        };

        console.log(data);

        let result = await changeData(email, data);
        console.log(result);
        return res.status(200).json({
            status: 200,
            message: "update data worker success",
            data,
            result,
        });
    },

    //email
    verify: async (req, res, next) => {
        const { id } = req.params;
        let result = await activatedUser(id);
        console.log("result");
        console.log(result);
        if (result) {
            return res
                .status(200)
                .json({ status: 200, message: "verify success silakan login" });
        }
        return res
            .status(404)
            .json({ status: 404, message: "verify gagal harap coba lagi" });
    },
    putRecruiter: async (req, res, next) => {
        const { id } = req.params;
        const { username, bidang, provinsi, kota, deskripsi, email_perusahaan, phone_company, linkedin, photo } = req.body;
        const { photo_worker } = req.file;
        console.log("req.body");
        console.log(req.body);
        console.log(
            username,
            bidang,
            provinsi, 
            kota, 
            deskripsi, 
            email_perusahaan, 
            phone_company, 
            linkedin, 
            photo
        );

        if (!id || id <= 0 || isNaN(id)) {
            return res.status(404).json({ message: "wrong input id" });
        }

        let dataRecruiterId = await getAuthProfileRecruiterById(parseInt(id));

        let id_payload = req.payload.id;

        console.log("id data");
        console.log(id);
        console.log(dataRecruiterId.rows[0].id);
        console.log(dataRecruiterId.rows[0]);
        if (id_payload != dataRecruiterId.rows[0].id) {
            return res.status(404).json({ message: "not your recipe" });
        }

        console.log("dataRecruiterId");
        console.log(dataRecruiterId);
        if (!dataRecruiterId.rows[0]) {
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
        console.log(dataRecruiterId.rows[0]);

        let data = {
            username: username || dataRecruiterId.rows[0].username,
            bidang: bidang || dataRecruiterId.rows[0].bidang,
            provinsi: provinsi || dataRecruiterId.rows[0].provinsi,
            kota: kota || dataRecruiterId.rows[0].kota,
            deskripsi: deskripsi || dataRecruiterId.rows[0].deskripsi,
            email_perusahaan: email_perusahaan || dataRecruiterId.rows[0].email_perusahaan,
            phone_company: phone_company || dataRecruiterId.rows[0].phone_company,
            linkedin: linkedin || dataRecruiterId.rows[0].linkedin,
            photo: ImageCloud.secure_url || dataRecruiterId.rows[0].photo,
        };

        console.log(data);

        let result = await putAuthProfileRecruiter(parseInt(id), data);
        let after = await getAuthProfileRecruiterById(parseInt(id));
        console.log(result);
        return res.status(200).json({
            status: 200,
            message: "update data recipe success",
            data,
            after: after.rows[0],
        });
    },
    getRecruiterById: async (req, res, next) => {
        const { id } = req.params;
        // let numberId = parseInt(req.params.id)
        // console.log(numberId)
        if (isNaN(id) || id < 0 || !id) {
          return res.status(404).json({ message: "wrong input id" });
        }
    
        let id_payload = req.payload.id;
        let dataRecruiterId = await getAuthProfileRecruiterById(parseInt(id));
    
        console.log("id data");
        console.log(id_payload);
        console.log(dataRecruiterId);
        if (id_payload != dataRecruiterId.rows[0].id) {
          return res.status(404).json({ message: "not your profile" });
        }
    
        console.log("dataRecruiterId");
        console.log(dataRecruiterId);
        if (!dataRecruiterId.rows[0]) {
          return res.status(200).json({
            status: 200,
            message: "get data profile data not found",
            data: [],
          });
        }
        if (dataRecruiterId) {
          res.status(200).json({
            status: 200,
            message: "get data profile success",
            data: dataRecruiterId.rows,
          });
        }
      },
    getDataCompany: async (req, res, next) => {
        let data = await getRecruiterAll()
        if (data) {
            res.status(200).json({ "status": 200, "message": "get data Users success", data: data.rows })
        }
    }

}

module.exports = ProfilRecruiterController