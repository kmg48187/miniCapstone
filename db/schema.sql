
DROP DATABASE IF EXISTS minicapstone;
CREATE DATABASE minicapstone;

\c minicapstone;

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE users(
    id serial PRIMARY KEY,
    email text NOT NULL UNIQUE,
    username text NOT NULL UNIQUE,
    password text NOT NULL,
    is_admin boolean NOT NULL
);


DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS faculty;

CREATE TABLE departments(
    id serial PRIMARY KEY,
    name text UNIQUE NOT NULL,
    description text NOT NULL,
    banner_image text,
    contact_info text NOT NULL
);


CREATE TABLE faculty(
    id serial PRIMARY KEY,
    name text UNIQUE NOT NULL,
    email text NOT NULL,
    bio text NOT NULL,
    profile_pic text,
    department_id interger NOT NULL REFERENCES departments(id) ON DELETE CASCADE
)

