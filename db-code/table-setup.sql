
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
	ers_username VARCHAR(50),
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

