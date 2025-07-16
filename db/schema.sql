DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS faculty;

CREATE TABLE departments(
    id serial PRIMARY KEY,
    name text UNIQUE NOT NULL,
    description text NOT NULL,
    images url,
    contact_info text NOT NULL
);


CREATE TABLE faculty(
    id serial PRIMARY KEY,
    name text UNIQUE NOT NULL,
    bio text NOT NULL,
    profile_pic url,
    department_id interger NOT NULL REFERENCES departments(id) ON DELETE CASCADE
)