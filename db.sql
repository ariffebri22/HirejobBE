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