const {
    postMessageModel
  } = require("../model/MessageModel");
  
  const messageController = {
    postMessage: async (req, res, next) => {
      const { position_job,message_hiring,id_pekerja } = req.body;
  
      console.log("post file");
      console.log(req.body);

  
      let id_rekruter = req.payload.id;
      console.log("payload");
      console.log(req.payload);
  
console.log(req.body)

      if (!position_job || !message_hiring ||!id_rekruter ||!id_pekerja) {
        return res.status(404).json({
          message: "input correctly",
        });
      }
  
      let data = {
        position_job,
        message_hiring,
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
    }
  };
  
  module.exports = messageController;
  