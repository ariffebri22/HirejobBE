const { getHomeSearchSortPagination, getDetailHiring, getHomeCount} = require("../model/HomeModel");

const homeController = {
  getDataSearch: async (req, res, next) => {
    const { page, order, sort, search, searchBy, limit } = req.query;
    let limiter = limit ||5
    data = {
      page: page || 1,
      order: order || "workers_authprofile.username",
      sort: sort || "ASC",
      search: search || "",
      searchBy: searchBy || "username",
      limit: limit || 4,
      offset: (page - 1) * limiter || 0,
    };
    console.log(data);
    let dataSearch = await getHomeSearchSortPagination(data);
    if (!dataSearch.rows[0]) {
      return res.status(200).json({
        status: 200,
        message: "get data profile data not found",
        data: [],
      });
    }
    let dataHomeCount = await getHomeCount(data)

        let pagination = {
            totalPage: Math.ceil(dataHomeCount.rows[0].count/limiter),
            totalData: parseInt(dataHomeCount.rows[0].count),
            pageNow: parseInt(page)
        }

        console.log("dataSearch")
        console.log(dataSearch)
        console.log("total data")
        console.log(dataHomeCount.rows[0])

        console.log(dataHomeCount.rows[0].count)
        if(dataSearch){
            res.status(200).json({"status":200,"message":"get data Home success",data:dataSearch.rows,pagination})
        }
  },

  getDataHiring: async (req, res, next) => {
    const {id } = req.params

    console.log(id);
    let dataSearch = await getDetailHiring(id);
    if (!dataSearch.rows[0]) {
      return res.status(200).json({
        status: 200,
        message: "get data profile data not found",
        data: [],
      });
    }
    if (dataSearch) {
      res.status(200).json({
        status: 200,
        message: "get data profile success",
        data: dataSearch.rows,
      });
    }
  },
};

module.exports = homeController;
