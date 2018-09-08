INSERT INTO ers.ers_reimbursement_status
(ers_reimb_status_id,ers_reimb_status) VALUES (0,'approved');
INSERT INTO ers.ers_reimbursement_type
(ers_reimb_type_id,ers_reimb_type) VALUES (0,'general');
INSERT INTO ers.ers_user_roles
(ers_user_role_id,user_role) VALUES (0,'manager');
INSERT INTO ers.ers_users
(ers_username,ers_password,user_first_name,user_last_name,user_email,user_role_id)
VALUES ('zdscott','pass','Zachaary','Scott','zscott@evil-corp.net',1);

INSERT INTO ers.ers_reimbursement
            (reimb_amount,reimb_submitted,reimb_resolved,reimb_description,
                reimb_author,reimb_resolver,reimb_status_id,reimb_type_id)
                VALUES (100,CURRENT_TIMESTAMP, CURRENT_TIMESTAMP,'TESTING',
						2,2,0,0)
INSERT INTO ers.ers_reimbursement
            (reimb_amount,reimb_description,reimb_author,reimb_status_id,reimb_type_id)
            VALUES (100,'asdf',1,1,4),(250,'qwer',1,2,3)