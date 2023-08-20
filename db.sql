CREATE TABLE workers_experience (
    id BIGSERIAL PRIMARY KEY,
    id_workers INT,
    posisi VARCHAR,
    nama_perusahaan VARCHAR,
    working_start_at DATE,
    working_end_at DATE,
    deskripsi TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE experience DROP COLUMN id_users;

ALTER TABLE experience ADD COLUMN id_workers VARCHAR NOT NULL;

SELECT ex.id, wo.username AS workers, ex.posisi, ex.nama_perusahaan, ex.working_start_at, ex.working_end_at, ex.deskripsi, ex.created_at
            FROM workers_experience ex
            JOIN workers wo ON ex.id_workers = wo.id
            ORDER BY ex.id DESC;

DROP TABLE workers_experience;

ALTER TABLE workers_experience ADD FOREIGN KEY (id_workers) REFERENCES workers(id);

SELECT ex.id, wo.username, ex.posisi, ex.nama_perusahaan, ex.working_start_at, ex.working_end_at, ex.deskripsi, ex.created_at
            FROM workers_experience ex JOIN workers wo ON ex.id_workers = wo.id
            ORDER BY ex.id DESC;

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
SELECT workers.*, workers_profile.*, workers_skills.skills_name FROM workers JOIN workers_profile ON workers.id = workers_profile.id_worker JOIN workers_skills ON workers.id = workers_skills.id_worker
