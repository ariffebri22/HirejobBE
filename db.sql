-- Active: 1690000069845@@147.139.210.135@5432@kb02
CREATE TABLE profil_company(
    id SERIAL PRIMARY KEY,
    id_company INT,
    FOREIGN KEY (id_company) REFERENCES recruiters(id),
    bidang VARCHAR NOT NULL,
    provinsi VARCHAR NOT NULL,
    kota VARCHAR NOT NULL,
    deskripsi VARCHAR NOT NULL,
    email_perusahaan VARCHAR NOT NULL,
    phone_company VARCHAR NOT NULL,
    linkedin VARCHAR NOT NULL,
    photo VARCHAR,
    created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE profil_company RENAME COLUMN deskirpsi TO deskripsi;
-- Active: 1692248997743@@147.139.210.135@5432@kb02

CREATE TABLE
    workers_experience (
        id BIGSERIAL PRIMARY KEY,
        id_workers INT,
        FOREIGN KEY (id_workers) REFERENCES workers_authprofile(id),
        posisi VARCHAR,
        nama_perusahaan VARCHAR,
        working_start_at DATE,
        working_end_at DATE,
        deskripsi TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

ALTER TABLE experience DROP COLUMN id_users;

ALTER TABLE experience ADD COLUMN id_workers VARCHAR NOT NULL;

SELECT
    ex.id,
    wo.username AS workers,
    ex.posisi,
    ex.nama_perusahaan,
    ex.working_start_at,
    ex.working_end_at,
    ex.deskripsi,
    ex.created_at
FROM
    workers_experience ex
    JOIN workers wo ON ex.id_workers = wo.id
ORDER BY
    ex.id DESC;

DROP TABLE workers_experience;

ALTER TABLE workers_experience
ADD
    FOREIGN KEY (id_workers) REFERENCES workers(id);

SELECT
    ex.id,
    wo.username,
    ex.posisi,
    ex.nama_perusahaan,
    ex.working_start_at,
    ex.working_end_at,
    ex.deskripsi,
    ex.created_at
FROM
    workers_experience ex
    JOIN workers wo ON ex.id_workers = wo.id
ORDER BY
    ex.id DESC;

SELECT * FROM workers_experience;

-- Active: 1692248997743@@147.139.210.135@5432@kb02

CREATE TABLE
    workers (
        id SERIAL PRIMARY KEY,
        username VARCHAR (152) NOT NULL,
        email VARCHAR (104) UNIQUE NOT NULL,
        phone VARCHAR (24) NOT NULL,
        password VARCHAR (104) NOT NULL
    );

-- profile

CREATE TABLE
    workers_profile (
        id SERIAL PRIMARY KEY,
        id_worker INT,
        FOREIGN KEY (id_worker) REFERENCES workers(id),
        position VARCHAR(104) NOT NULL,
        domicile VARCHAR(104) NOT NULL,
        company_work VARCHAR(256) NOT NULL,
        job_desc VARCHAR(256) NOT NULL,
        photo_worker VARCHAR(256) NOT NULL
    );

CREATE TABLE
    workers_skills (
        id SERIAL PRIMARY KEY,
        id_worker INT,
        FOREIGN KEY (id_worker) REFERENCES workers_authprofile(id),
        skills_name VARCHAR(256) NOT NULL
    );

CREATE TABLE
    workers_portofolio (
        id SERIAL PRIMARY KEY,
        id_worker INT,
        FOREIGN KEY (id_worker) REFERENCES workers_authprofile(id),
        porto_name VARCHAR(256) NOT NULL,
        porto_link VARCHAR(256) NOT NULL,
        porto_type VARCHAR(104) NOT NULL,
        porto_photo VARCHAR(256) NOT NULL,
        created_at TIMESTAMP DEFAULT current_timestamp
    );

CREATE TABLE
    workers_authprofile (
        id SERIAL PRIMARY KEY,
        username VARCHAR (152) NOT NULL,
        email VARCHAR (104) UNIQUE NOT NULL,
        phone VARCHAR (24) NOT NULL,
        password VARCHAR (104) NOT NULL,
        is_active BOOLEAN,
        checker VARCHAR,
        position VARCHAR(104),
        domicile VARCHAR(104),
        company_work VARCHAR(256),
        job_desc VARCHAR(256),
        photo_worker VARCHAR(256)
    );

drop Table workers_skills
SELECT
    workers.*,
    workers_profile.*,
    workers_skills.skills_name
FROM workers
    JOIN workers_profile ON workers.id = workers_profile.id_worker
    JOIN workers_skills ON workers.id = workers_skills.id_worker

ALTER TABLE workers_experience
ADD
    FOREIGN KEY (id_workers) REFERENCES workers_authprofile(id);

DROP TABLE workers;

SELECT a.id AS id_authprofile, a.username, a.email, a.phone, a.password, a.is_active, a.checker, a.position AS position_authprofile, a.domicile, a.company_work, a.job_desc, a. photo_worker, b.id AS id_experience, b.id_workers AS id_workers_exp, b.posisi as posisi_exp, b.nama_perusahaan, b.working_start_at, b.working_end_at, b.deskripsi, b.created_at as created_at_exp, c.id as id_portofolio, c.id_worker AS id_workers_porto, c.porto_name, c.porto_link, c.porto_type, c.porto_photo, c.created_at as created_at_porto, d.id as id_skills, d.id_worker as id_worker_skill, d.skills_name
FROM workers_authprofile a JOIN workers_experience b ON a.id = b.id_workers JOIN workers_portofolio c ON a.id = c.id_worker JOIN workers_skills d ON a.id = d.id_worker;

SELECT workers_authprofile.id AS authprofile_id, workers_experience.id AS experience_id, workers_portofolio.id AS portofolio_id, workers_skills.id AS skills_id, workers_experience.id_workers AS experience_id_workers, workers_portofolio.id_worker AS portofolio_id_worker, workers_skills.id_worker AS skills_id_worker, workers_authprofile.username, workers_authprofile.email, workers_authprofile.phone, workers_authprofile.is_active, workers_authprofile.checker, workers_authprofile.position, workers_authprofile.domicile, workers_authprofile.company_work, workers_authprofile.job_desc, workers_authprofile.photo_worker, workers_experience.posisi, workers_experience.nama_perusahaan, workers_experience.working_start_at, workers_experience.working_end_at, workers_experience.deskripsi, workers_experience.created_at, workers_portofolio.porto_name, workers_portofolio.porto_link, workers_portofolio.porto_type, workers_portofolio.porto_photo, workers_portofolio.created_at, workers_skills.skills_name FROM workers_authprofile JOIN workers_skills ON workers_authprofile.id = workers_skills.id_worker JOIN workers_experience ON workers_authprofile.id = workers_experience.id_workers JOIN workers_portofolio ON workers_authprofile.id = workers_portofolio.id_worker;

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
