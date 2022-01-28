INSERT INTO departments(name) 
VALUES
    ('Board'),
    ('Engineering'),
    ('HR'),
    ('Finances'),
    ('Marketing');

INSERT INTO roles(job_title, department, salary)
VALUES
    ('CEO', 1, 1000000),
    ('Engineering Manager', 2, 180000),
    ('Software Engineer', 2, 150000),
    ('Senior Software Engineer', 2, 180000),
    ('Principal Software Engineer', 2, 215000),
    ('Head of HR', 3, 250000),
    ('Engineering Recruiter', 3, 130000);

INSERT INTO employees(first_name, last_name, job, department)
VALUES ('jeremy', 'allaire', 1, 1);
INSERT INTO employees(first_name, last_name, job, department, manager)
VALUES ('steve', 'jin', 2, 2, 1);
INSERT INTO employees(first_name, last_name, job, department, manager)
VALUES ('karina', 'guerrero', 3, 2, 2);