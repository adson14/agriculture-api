-- -----------------------------------------------------
-- Schema brain
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS public;
SET search_path TO public;

-- -----------------------------------------------------
-- Table public.producer
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS producer (
  id SERIAL PRIMARY KEY,
  name VARCHAR(45) NOT NULL,
  document VARCHAR(45) NOT NULL,
  doc_type VARCHAR(10) NOT NULL CHECK (doc_type IN ('CPF', 'CNPJ'))
);

-- -----------------------------------------------------
-- Table public.farm
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS farm (
  id SERIAL PRIMARY KEY,
  name VARCHAR(45) NOT NULL,
  city VARCHAR(45) NOT NULL,
  state VARCHAR(45) NOT NULL,
  total_area DOUBLE PRECISION,
  farming_area DOUBLE PRECISION,
  vegetation_area DOUBLE PRECISION,
  producer_id INT NOT NULL REFERENCES producer(id) ON DELETE CASCADE
);

-- -----------------------------------------------------
-- Table public.crop
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS crop (
  id SERIAL PRIMARY KEY,
  year VARCHAR(4) NOT NULL,
  farm_id INT NOT NULL REFERENCES farm(id) ON DELETE CASCADE
);

-- -----------------------------------------------------
-- Table public.crops_planted
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS crops_planted (
  id SERIAL PRIMARY KEY,
  name VARCHAR(45) NOT NULL,
  farm_id INT NOT NULL REFERENCES farm(id) ON DELETE CASCADE
);

-- -----------------------------------------------------
-- Table public.crop_culture
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS crop_culture (
  id SERIAL PRIMARY KEY,
  crop_id INT NOT NULL REFERENCES crop(id) ON DELETE CASCADE,
  crops_planted_id INT NOT NULL REFERENCES crops_planted(id) ON DELETE CASCADE,
  CONSTRAINT unique_crop_culture UNIQUE (crop_id, crops_planted_id)
);


