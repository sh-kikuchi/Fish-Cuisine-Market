CREATE SEQUENCE store_id_seq;
ALTER TABLE stores ALTER COLUMN id SET DEFAULT nextval('store_id_seq');
SELECT setval('store_id_seq', 56); --ex: setval('store_id_seq', 56) → next value is 57)

CREATE SEQUENCE menu_id_seq;
ALTER TABLE menus ALTER COLUMN id SET DEFAULT nextval('menu_id_seq');
SELECT setval('menu_id_seq', 20);

CREATE SEQUENCE eatlog_id_seq;
ALTER TABLE eatlogs ALTER COLUMN id SET DEFAULT nextval('eatlog_id_seq');
SELECT setval('eatlog_id_seq', 73);

CREATE SEQUENCE file_id_seq;
ALTER TABLE files ALTER COLUMN id SET DEFAULT nextval('file_id_seq');
SELECT setval('file_id_seq', 36);

CREATE SEQUENCE user_id_seq;
ALTER TABLE users ALTER COLUMN id SET DEFAULT nextval('user_id_seq');
SELECT setval('user_id_seq', 14);