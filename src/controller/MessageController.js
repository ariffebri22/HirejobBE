const { postMessage } = require("../model/MessageModel");

const MessageController = {
  postDataMessage: async (req, res, next) => {
    const {id_worker} = req.params
    const { company_message, workers_message } = req.body;

    console.log("post file");
    console.log(req.body);
    console.log("post data");
    console.log(company_message, workers_message);

    let id_company = req.payload.id;
    console.log("payload");
    console.log(req.payload);
    console.log(id_company, company_message, workers_message);

    if (!id_company) {
      return res.status(404).json({
        message: "input correctly",
      });
    }

    let data = {
      id_company,
      id_worker,
      company_message,
      workers_message,
    };

    console.log("data");
    console.log(data);

    let result = await postMessage(data);
    console.log(result);

    return res
      .status(200)
      .json({ status: 200, message: "data recipe success", data });
  },
  putWorkers: async (req, res, next) => {
    const { id } = req.params;
    const { skills_name } = req.body;
    console.log("req.body");
    console.log(req.body);
    console.log(skills_name);

    if (!id || id <= 0 || isNaN(id)) {
      return res.status(404).json({ message: "wrong input id" });
    }

    let dataWorkersId = await getSkillWorkersById(parseInt(id));

    let id_worker = req.payload.id;

    console.log("id data");
    console.log(id_worker);
    console.log(dataWorkersId.rows[0]);
    if (id_worker != dataWorkersId.rows[0].id_worker) {
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
    console.log("put data");
    console.log(dataWorkersId.rows[0]);
    let data = {
      skills_name: skills_name || dataWorkersId.rows[0].skills_name,
    };

    console.log(data);

    let result = await putSkillWorkers(parseInt(id), data);
    let after = await getSkillWorkersById(parseInt(id));
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

    let id_worker = req.payload.id;
    let dataWorkersId = await getSkillWorkersById(parseInt(id));

    console.log("id data");
    console.log(id_worker);
    console.log(dataWorkersId);
    if (id_worker != dataWorkersId.rows[0].id_worker) {
      return res.status(404).json({ message: "not your profile" });
    }

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

module.exports = MessageController;
