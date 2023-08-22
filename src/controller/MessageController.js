const {
    postMessageModel,
    getMessageCompanyById,
    getMessageById
  } = require("../model/MessageModel");
  
  const messageController = {
    postMessage: async (req, res, next) => {
      const { position_job,message_recruiter,id_pekerja,message_workers } = req.body;
  
      console.log("post file");
      console.log(req.body);

  
      let id_rekruter = req.payload.id;
      console.log("payload");
      console.log(req.payload);
  
console.log(req.body)

      if (!position_job || !message_recruiter ||!id_rekruter ||!id_pekerja) {
        return res.status(404).json({
          message: "input correctly",
        });
      }
  
      let data = {
        position_job,
        message_recruiter,
        message_workers,
        id_rekruter,
        id_pekerja,
      };
      
      console.log("data");
      console.log(data);
  
      let result = await postMessageModel(data);
      console.log(result);
  
      return res
        .status(200)
        .json({ status: 200, message: "data recipe success", data });
    },
    getCompanyById: async (req, res, next) => {
      const { id } = req.params;
      // let numberId = parseInt(req.params.id)
      // console.log(numberId)
      if (isNaN(id) || id < 0 || !id) {
        return res.status(404).json({ message: "wrong input id" });
      }
  
      let id_payload = req.payload.id;
      let dataCompanyId = await getMessageCompanyById(parseInt(id));
  
      console.log("id data");
      console.log(id_payload);
      console.log(dataCompanyId);
      // if (id_payload != dataCompanyId.rows[0].id) {
      //   return res.status(404).json({ message: "not your profile" });
      // }
  
      console.log("dataCompanyId");
      console.log(dataCompanyId);
      if (!dataCompanyId.rows[0]) {
        return res.status(200).json({
          status: 200,
          message: "get data profile data not found",
          data: [],
        });
      }
      if (dataCompanyId) {
        res.status(200).json({
          status: 200,
          message: "get data profile success",
          data: dataCompanyId.rows,
        });
      }
    },
    getMessageId: async (req, res, next) => {
      const { id } = req.params;
      // let numberId = parseInt(req.params.id)
      // console.log(numberId)
      if (isNaN(id) || id < 0 || !id) {
        return res.status(404).json({ message: "wrong input id" });
      }
  
      let id_payload = req.payload.id;
      let dataCompanyId = await getMessageById(parseInt(id));
  
      console.log("id data");
      console.log(id_payload);
      console.log(dataCompanyId);
      // if (id_payload != dataCompanyId.rows[0].id) {
      //   return res.status(404).json({ message: "not your profile" });
      // }
  
      console.log("dataCompanyId");
      console.log(dataCompanyId);
      if (!dataCompanyId.rows[0]) {
        return res.status(200).json({
          status: 200,
          message: "get data profile data not found",
          data: [],
        });
      }
      if (dataCompanyId) {
        res.status(200).json({
          status: 200,
          message: "get data profile success",
          data: dataCompanyId.rows,
        });
      }
    },
    
  };
  
  module.exports = messageController;
  