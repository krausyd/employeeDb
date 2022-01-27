INSERT INTO departments(name) 
VALUES
    ('Board'),
    ('Engineering'),
    ('HR'),
    ('Finances'),
    ('Marketing');

INSERT INTO roles(job_title, department, salary)
VALUES
    ('CEO', 4, 1000000),
    ('Engineering Manager', 1, 180000),
    ('Software Engineer', 1, 150000),
    ('Senior Software Engineer', 1, 180000),
    ('Principal Software Engineer', 1, 215000),
    ('Head of HR', 2, 250000),
    ('Engineering Recruiter', 2, 130000);

INSERT INTO employees(first_name, last_name, job, department)
VALUES ('jeremy', 'allaire', 1, 1);
INSERT INTO employees(first_name, last_name, job, department, manager)
VALUES ('steve', 'jin', 2, 2, 1);
INSERT INTO employees(first_name, last_name, job, department, manager)
VALUES ('karina', 'guerrero', 3, 2, 2);