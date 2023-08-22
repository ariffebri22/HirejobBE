const Pool = require("../config/db");

const getHomeSearchSortPagination = async (data) => {
  const { search, searchBy, offset, limit, order, sort } = data;
  return new Promise((resolve, reject) => {
    Pool.query(
      `SELECT
        workers_authprofile.id AS authprofile_id,

        workers_authprofile.username, workers_authprofile.email, workers_authprofile.phone, workers_authprofile.is_active, workers_authprofile.checker, workers_authprofile.position, workers_authprofile.domicile, workers_authprofile.company_work, workers_authprofile.job_desc, workers_authprofile.photo_worker,

        workers_skills.id AS skills_id,
        workers_skills.id_worker AS skills_id_worker,
        workers_skills.skills_name
        
        FROM workers_authprofile
        JOIN workers_skills ON workers_authprofile.id = workers_skills.id_worker
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

const getHomeCount = async (data) => {
  console.log("model getHomeCount")
  return new Promise((resolve,reject)=>
      Pool.query(`SELECT COUNT(*) FROM workers_authprofile WHERE is_active=true`,(err,result)=>{
          if(!err){
              resolve(result)
          } else{
              reject(err)
          }
      })
  )
}

const getDetailHiring = async (id) => {
  return new Promise((resolve, reject) => {
    Pool.query(
      `SELECT
workers_authprofile.id,
workers_authprofile.username,
workers_authprofile.email,
workers_authprofile.phone,
workers_authprofile.is_active,
workers_authprofile.checker,
workers_authprofile.position,
workers_authprofile.domicile,
workers_authprofile.company_work,
workers_authprofile.job_desc,
workers_authprofile.photo_worker,
workers_skills.id AS skill_id,
workers_skills.id_worker,
workers_skills.skills_name,

(SELECT jsonb_agg(jsonb_build_object(
    'id', workers_experience.id,
    'id_workers', workers_experience.id_workers,
    'posisi', workers_experience.posisi,
    'nama_perusahaan', workers_experience.nama_perusahaan,
    'working_start_at', workers_experience.working_start_at,
    'working_end_at', workers_experience.working_end_at,
    'deskripsi', workers_experience.deskripsi,
    'created_at', workers_experience.created_at
)) FROM workers_experience WHERE workers_experience.id_workers = workers_authprofile.id) AS experience,

(SELECT jsonb_agg(jsonb_build_object(
    'id', workers_portofolio.id,
    'id_worker', workers_portofolio.id_worker,
    'porto_name', workers_portofolio.porto_name,
    'porto_link', workers_portofolio.porto_link,
    'porto_type', workers_portofolio.porto_type,
    'porto_photo', workers_portofolio.porto_photo,
    'created_at', workers_portofolio.created_at
)) FROM workers_portofolio WHERE workers_portofolio.id_worker = workers_authprofile.id) AS portofolio

FROM workers_authprofile
LEFT JOIN workers_skills ON workers_authprofile.id = workers_skills.id_worker
WHERE workers_authprofile.id = ${id}
GROUP BY
workers_authprofile.id, workers_authprofile.username, workers_authprofile.email, workers_authprofile.phone, workers_authprofile.is_active, workers_authprofile.checker,
workers_authprofile.position, workers_authprofile.domicile, workers_authprofile.company_work, workers_authprofile.job_desc, workers_authprofile.photo_worker,
workers_skills.id, workers_skills.id_worker, workers_skills.skills_name`,
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
  getHomeSearchSortPagination,
  getDetailHiring,
  getHomeCount
};
