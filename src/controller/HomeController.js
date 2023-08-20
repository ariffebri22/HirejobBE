const { getHomeSearchSortPagination } = require("../model/HomeModel");

const homeController = {
  getDataSearch: async (req, res, next) => {
    const { page, order, sort, search, searchBy, limit } = req.query;
    data = {
      page: page || 1,
      order: order || "workers_authprofile.username",
      sort: sort || "ASC",
      search: search || "",
      searchBy: searchBy || "username",
      limit: limit || 3,
      offset: (page - 1) * limit || 0,
    };
    console.log(data);
    let dataSearch = await getHomeSearchSortPagination(data);
    if (!dataSearch.rows[0]) {
      return res.status(200).json({
        status: 200,
        message: "get data recipe data not found",
        data: [],
      });
    }
    if (dataSearch) {
      res.status(200).json({
        status: 200,
        message: "get data recipe success",
        data: dataSearch.rows,
      });
    }
  },
};

module.exports = homeController;
