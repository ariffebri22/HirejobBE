const Pool = require("../config/db");

const getHomeSearchSortPagination = async (data) => {
    const { search, searchBy, offset, limit, order, sort } = data;
    return new Promise((resolve, reject) => {
        Pool.query(
        `SELECT
        workers_authprofile.id AS authprofile_id,
        workers_experience.id AS experience_id,
        workers_portofolio.id AS portofolio_id,
        workers_skills.id AS skills_id,

        workers_experience.id_workers AS experience_id_workers,
        workers_portofolio.id_worker AS portofolio_id_worker,
        workers_skills.id_worker AS skills_id_worker,

        workers_authprofile.username, workers_authprofile.email, workers_authprofile.phone, workers_authprofile.is_active, workers_authprofile.checker, workers_authprofile.position, workers_authprofile.domicile, workers_authprofile.company_work, workers_authprofile.job_desc, workers_authprofile.photo_worker,

        workers_experience.posisi, workers_experience.nama_perusahaan, workers_experience.working_start_at, workers_experience.working_end_at, workers_experience.deskripsi, workers_experience.created_at,

        workers_portofolio.porto_name, workers_portofolio.porto_link, workers_portofolio.porto_type, workers_portofolio.porto_photo, workers_portofolio.created_at,

        workers_skills.skills_name
        
        FROM workers_authprofile
        JOIN workers_skills ON workers_authprofile.id = workers_skills.id_worker
        JOIN workers_experience ON workers_authprofile.id = workers_experience.id_workers
        JOIN workers_portofolio ON workers_authprofile.id = workers_portofolio.id_worker

        WHERE ${searchBy} ILIKE '%${search}%' ORDER BY ${order} ${sort} OFFSET ${offset} LIMIT ${limit}`,
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


