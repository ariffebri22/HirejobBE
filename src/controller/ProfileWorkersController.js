const {
  postProfileWorkers,
  getProfileWorkersById,
  putProfileWorkers
} = require("../model/ProfileWorkersModel");

const cloudinary = require("../config/photo");

const profileWorkersController = {
  postWorkers: async (req, res, next) => {
    const { position, domicile, company_work, job_desc } =
      req.body;
      const{ photo_worker} = req.file
    console.log("post file");
    console.log(req.file);

    console.log(req.body);

    console.log("post data");

    console.log(position, domicile, company_work, job_desc, photo_worker);

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
    console.log(
      id_worker,
      position,
      domicile,
      company_work,
      job_desc,
      photo_worker
    );

    if (
      !id_worker ||
      !position ||
      !domicile ||
      !company_work ||
      !job_desc
      // !photo_worker
    ) {
      return res.status(404).json({
        message: "input correctly",
      });
    }

    let data = {
      id_worker,
      position,
      domicile,
      company_work,
      job_desc,
      photo_worker: ImageCloud.secure_url,
    };

    console.log("data");
    console.log(data);

    let result = await postProfileWorkers(data);
    console.log(result);

    return res
      .status(200)
      .json({ status: 200, message: "data recipe success", data });
  },
  putWorkers: async (req, res, next) => {
    const { id } = req.params
    const { position, domicile, company_work, job_desc} =
      req.body;
      const {photo_worker} = req.file
    console.log("req.body");
    console.log(req.body);
    console.log(position, domicile, company_work, job_desc, photo_worker)

    if (!id || id <= 0 || isNaN(id)) {
      return res.status(404).json({ message: "wrong input id" });
    }

    let dataWorkersId = await getProfileWorkersById(parseInt(id));

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
    console.log('req.isFileValid')

    console.log(req.isFileValid)

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
      position: position || dataWorkersId.rows[0].position,
      domicile: domicile || dataWorkersId.rows[0].domicile,
      company_work: company_work || dataWorkersId.rows[0].company_work,
      job_desc: job_desc || dataWorkersId.rows[0].job_desc,
      photo_worker: ImageCloud.secure_url || dataWorkersId.rows[0].photo_worker,
    };

    console.log(data)

    let result = await putProfileWorkers(parseInt(id), data);
    let after = await getProfileWorkersById(parseInt(id));
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
    let dataWorkersId = await getProfileWorkersById(parseInt(id));

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

module.exports = profileWorkersController;
