CREATE EXTENSION IF NOT EXISTS pgcrypto;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS faculty;
DROP TABLE IF EXISTS departments;

CREATE TABLE users(
    id serial PRIMARY KEY,
    email text NOT NULL UNIQUE,
    username text NOT NULL UNIQUE,
    password text NOT NULL,
    is_admin boolean NOT NULL
);

CREATE TABLE departments(
    id serial PRIMARY KEY,
    name text UNIQUE NOT NULL,
    description text NOT NULL,
    banner_image text DEFAULT 'https://www.gravatar.com/avatar/?d=mp&s=32',
    contact_info text NOT NULL
);

CREATE TABLE faculty(
    id serial PRIMARY KEY,
    name text UNIQUE NOT NULL,
    email text NOT NULL,
    bio text NOT NULL,
    profile_pic text DEFAULT 'https://www.gravatar.com/avatar/?d=mp&s=32',
    department_id integer NOT NULL REFERENCES departments(id) ON DELETE CASCADE
);

