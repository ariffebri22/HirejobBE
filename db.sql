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