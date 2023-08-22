const {
  postPortoWorkers,
  getPortoWorkersById,
  deletePortoWorkersById,
  putPortoWorkers,
} = require("../model/PortoWorkersModel");

const cloudinary = require("../config/photo");

const portoWorkersController = {
  postWorkers: async (req, res, next) => {
    const { porto_name, porto_link, porto_type } = req.body;
    const { porto_photo } = req.file;
    
    console.log("post file");
    console.log(req.file);
    console.log(req.body);
    console.log("post data");
    console.log(porto_name, porto_link, porto_type, porto_photo);

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

    let id_worker = req.payload.id;
    console.log("payload");
    console.log(req.payload);
    console.log(id_worker, porto_name, porto_link, porto_type, porto_photo);

    if (
      !id_worker ||
      !porto_name ||
      !porto_link ||
      !porto_type
      // !porto_photo
    ) {
      return res.status(404).json({
        message: "input correctly",
      });
    }

    let data = {
      id_worker,
      porto_name,
      porto_link,
      porto_type,
      porto_photo: ImageCloud.secure_url,
    };

    console.log("data");
    console.log(data);

    let result = await postPortoWorkers(data);
    console.log(result);

    return res
      .status(200)
      .json({ status: 200, message: "data workers success", data });
  },
  putWorkers: async (req, res, next) => {
    const { id } = req.params;
    const { porto_name, porto_link, porto_type } = req.body;
    const { porto_photo } = req.file;
    console.log("req.body");
    console.log(req.body);
    console.log(porto_name, porto_link, porto_type, porto_photo);

    if (!id || id <= 0 || isNaN(id)) {
      return res.status(404).json({ message: "wrong input id" });
    }

    let dataWorkersId = await getPortoWorkersById(parseInt(id));

    let id_worker = req.payload.id;

    console.log("id data");
    console.log(id_worker);
    console.log(dataWorkersId);
    if (id_worker != dataWorkersId.rows[0].id_worker) {
      return res.status(404).json({ message: "not your workers" });
    }

    console.log("dataWorkersId");
    console.log(dataWorkersId);
    if (!dataWorkersId.rows[0]) {
      return res.status(200).json({
        status: 200,
        message: "get data workers data not found",
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
      porto_name: porto_name || dataWorkersId.rows[0].porto_name,
      porto_link: porto_link || dataWorkersId.rows[0].porto_link,
      porto_type: porto_type || dataWorkersId.rows[0].porto_type,
      porto_photo: ImageCloud.secure_url || dataWorkersId.rows[0].porto_photo,
    };

    console.log(data);

    let result = await putPortoWorkers(parseInt(id), data);
    let after = await getPortoWorkersById(parseInt(id));
    console.log(result);
    return res.status(200).json({
      status: 200,
      message: "update data workers success",
      data,
      after: after.rows[0],
    });
  },

  deleteWorkersById: async (req, res, next) => {
    const { id } = req.params;
    if (isNaN(id) || id < 0 || !id) {
      return res.status(404).json({ message: "wrong input id" });
    }
    let dataWorkersId = await getPortoWorkersById(parseInt(id));

    let id_worker = req.payload.id;

    if (!dataWorkersId.rows[0]) {
      return res.status(200).json({
        status: 200,
        message: "get data workers data not found",
        data: [],
      });
    }

    console.log("id data");
    console.log(id_worker);
    console.log(dataWorkersId.rows[0]);
    if (id_worker != dataWorkersId.rows[0].id_worker) {
      return res.status(404).json({ message: "not your workers" });
    }

    let deleteWorkersId = await deletePortoWorkersById(parseInt(id));
    console.log("deleteWorkersId");
    console.log(deleteWorkersId);
    console.log(dataWorkersId.rows);
    if (deleteWorkersId) {
      res.status(200).json({
        status: 200,
        message: "delete data workers success",
        data: dataWorkersId.rows,
        dataDelete: deleteWorkersId.rows,
      });
    }
  },

  getWorkersById: async (req, res, next) => {
    const { id } = req.params;
    // let numberId = parseInt(req.params.id)
    // console.log(numberId)
    if (isNaN(id) || id < 0 || !id) {
      return res.status(404).json({ message: "wrong input id" });
    }

    let id_worker = req.payload.id;
    let dataWorkersId = await getPortoWorkersById(parseInt(id));

    console.log("id data");
    console.log(id_worker);
    console.log(dataWorkersId);
    if (id_worker != dataWorkersId.rows[0].id_worker) {
      return res.status(404).json({ message: "not your porto" });
    }

    console.log("dataWorkersId");
    console.log(dataWorkersId);
    if (!dataWorkersId.rows[0]) {
      return res.status(200).json({
        status: 200,
        message: "get data porto data not found",
        data: [],
      });
    }
    if (dataWorkersId) {
      res.status(200).json({
        status: 200,
        message: "get data porto success",
        data: dataWorkersId.rows,
      });
    }
  },
};

module.exports = portoWorkersController;
