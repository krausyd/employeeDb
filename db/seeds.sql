INSERT INTO departments(name) 
VALUES
    ('Board'),
    ('Engineering'),
    ('HR'),
    ('Finances'),
    ('Marketing');

INSERT INTO roles(job_title, department)
VALUES
    ('CEO', 4),
    ('Engineering Manager', 1),
    ('Software Engineer', 1),
    ('Senior Software Engineer', 1),
    ('Principal Software Engineer', 1),
    ('Head of HR', 2),
    ('Engineering Recruiter', 2);

INSERT INTO employees(first_name, last_name, job, department, salary)
VALUES ('jeremy', 'allaire', 1, 1, 1000000);
INSERT INTO employees(first_name, last_name, job, department, salary, manager)
VALUES ('steve', 'jin', 2, 2, 180000, 1);
INSERT INTO employees(first_name, last_name, job, department, salary, manager)
VALUES ('karina', 'guerrero', 3, 2, 150000, 2);