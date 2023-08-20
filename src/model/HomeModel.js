const Pool = require("../config/db");

const getHomeSearchSortPagination = async (data) => {
    const { search, searchBy, offset, limit, order, sort } = data;
    return new Promise((resolve, reject) => {
        Pool.query(
        `SELECT * FROM workers_authprofile JOIN workers_skills ON workers_authprofile.id = workers_skills.id_worker WHERE ${searchBy} ILIKE '%${search}%' ORDER BY ${order} ${sort} OFFSET ${offset} LIMIT ${limit}`,
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  };

module.exports = {
    getHomeSearchSortPagination
};


