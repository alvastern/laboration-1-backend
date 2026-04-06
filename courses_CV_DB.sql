CREATE DATABASE coursesDB;

use coursesDB;

CREATE TABLE coursesDB (
	id INT AUTO_INCREMENT PRIMARY KEY,
    course_code VARCHAR (10),
    course_name VARCHAR (100),
    syllabus TEXT,
    progression VARCHAR (5)
);