const {
  getUserByEmail,
  createUser,
  changePassword,
  activatedUser,
} = require("../model/WorkerModel");
const argon2 = require("argon2");
const { GenerateToken } = require("../helpers/GenerateToken");

const { v4: uuidv4 } = require("uuid");
const Email = require("./../midleware/Email");

const AuthController = {
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

    return res
      .status(200)
      .json({ status: 200, message: "User registration successful" });
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
      return res
        .status(404)
        .json({ status: 404, message: "Email is not yet registered" });
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
      return res
        .status(404)
        .json({ status: 494, message: "email belum diaktivasi" });
    }

    res
      .status(200)
      .json({ status: 200, message: "get data profile success", users });
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
