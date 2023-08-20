const Pool = require("../config/db");

const getHomeSearchSortPagination = async (data) => {
    const { search, searchBy, offset, limit, order, sort } = data;
    return new Promise((resolve, reject) => {
        Pool.query(
        `SELECT workers.* FROM workers JOIN workers_profile ON workers.id = workers_profile.id_worker JOIN workers_skills ON workers.id = workers_skills.id_worker WHERE ${searchBy} ILIKE '%${search}%' ORDER BY ${order} ${sort} OFFSET ${offset} LIMIT ${limit}`,
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


