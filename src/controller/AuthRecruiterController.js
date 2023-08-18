const {
    createUser,
    getUsersByEmail,
    activatedUser,
    changeData,
  } = require("../model/RecruiterModel");
  const argon2 = require("argon2");
  const { GenerateToken } = require("../helpers/GenerateToken");
  
  //email
  const { v4: uuidv4 } = require("uuid");
  const Email = require("./../midleware/Email");
  
  const AuthController = {
    register: async (req, res, next) => {
      let { email, password, username, phone, jabatan, perusahaan } = req.body;
  
      // const ImageCloud = await cloudinary.uploader.upload(req.file.path, { folder: 'recipe' });
  
      // if (!ImageCloud) {
      //     return res.status(404).json({ "message": "upload photo fail" });
      // }
      // console.log(ImageCloud)
  
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
  };
  
  module.exports = AuthController;