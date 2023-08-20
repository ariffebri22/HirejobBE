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