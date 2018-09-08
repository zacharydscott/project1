
CREATE TABLE ers.ers_user_roles(
	ers_user_role_id SERIAL PRIMARY KEY,
	user_role VARCHAR(20)
);

CREATE TABLE ers.ers_reimbursement_type(
	ers_reimb_type_id SERIAL PRIMARY KEY,
	ers_reimb_type VARCHAR(20)
);

CREATE TABLE ers.ers_reimbursement_status(
	ers_reimb_status_id SERIAL PRIMARY KEY,
	ers_reimb_status VARCHAR(20)
);

CREATE TABLE ers.ers_users (
	ers_user_id SERIAL PRIMARY KEY,
	ers_username VARCHAR(50) UNIQUE,
	ers_password VARCHAR(50),
	user_first_name VARCHAR(100),
	user_last_name VARCHAR(100),
	user_email VARCHAR(150) UNIQUE,
	user_role_id INTEGER,
	CONSTRAINT user_role FOREIGN KEY (user_role_id) REFERENCES ers.ers_user_roles(ers_user_role_id)
);

CREATE TABLE ers.ers_reimbursement (reimb_id SERIAL PRIMARY KEY, 
	reimb_amount NUMERIC(10,2),
	reimb_submitted TIMESTAMP,
 	reimb_resolved TIMESTAMP,
 	reimb_description VARCHAR(20),
	reimb_author INTEGER, 
 	reimb_resolver INTEGER,
 	reimb_status_id INTEGER, 
 	reimb_type_id INTEGER,
	CONSTRAINT reimb_author FOREIGN KEY (reimb_author) REFERENCES ers.ers_users(ers_user_id),
	CONSTRAINT reimb_resolver FOREIGN KEY (reimb_author) REFERENCES ers.ers_users(ers_user_id), 
	CONSTRAINT reimb_status_id FOREIGN KEY (reimb_status_id) REFERENCES ers.ers_reimbursement_status(ers_reimb_status_id),
	CONSTRAINT reimb_type_id  FOREIGN KEY (reimb_type_id) REFERENCES ers.ers_reimbursement_type(ers_reimb_type_id)										
 );

CREATE OR REPLACE FUNCTION insert_sub_stamp()
RETURNS trigger as $$
BEGIN
 NEW.reimb_submitted = CURRENT_TIMESTAMP;
RETURN NEW;
END $$ LANGUAGE 'plpgsql';


CREATE TRIGGER submissionTime
BEFORE INSERT ON ers.ers_reimbursement
FOR EACH ROW
EXECUTE PROCEDURE insert_sub_stamp();

CREATE OR REPLACE FUNCTION insert_res_stamp()
RETURNS trigger as $$
BEGIN
IF (OLD.reimb_status_id <> NEW.reimb_status_id) THEN
 NEW.reimb_resolved = CURRENT_TIMESTAMP;
END IF;
RETURN NEW;
END $$ LANGUAGE 'plpgsql';


CREATE TRIGGER resolveTime
BEFORE UPDATE ON ers.ers_reimbursement
FOR EACH ROW
EXECUTE PROCEDURE insert_res_stamp();

INSERT INTO ers.ers_reimbursement_status
(ers_reimb_status_id,ers_reimb_status) VALUES (1,'pending'),(2,'approved'),(3,'denied');

INSERT INTO ers.ers_user_roles
(ers_user_role_id,user_role) VALUES (1,'admin'), (2,'user');

INSERT INTO ers.ers_reimbursement_type
(ers_reimb_type_id,ers_reimb_type) VALUES (1,'admin'),(2,'travel'),(3,'food'),(4,'other')

INSERT INTO ers.ers_users
(ers_username,ers_password,user_first_name,user_last_name,user_email,user_role_id)
VALUES ('zdscott','pass','Zachaary','Scott','zscott@evil-corp.net',2),('admin','pass1','admin','guy','admin@secure.org',1);

INSERT INTO ers.ers_reimbursement
            (reimb_amount,reimb_description,reimb_author,reimb_status_id,reimb_type_id)
            VALUES (100,'asdf',1,1,4),(250,'qwer',1,2,3)