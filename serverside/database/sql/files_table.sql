-- Table: public.files

-- DROP TABLE IF EXISTS public.files;

CREATE TABLE IF NOT EXISTS public.files
(
    id bigint NOT NULL DEFAULT nextval('files_id_seq'::regclass),
    user_id bigint NOT NULL,
    eatlog_id bigint NOT NULL,
    filepath character varying(400) COLLATE pg_catalog."default",
    filename character varying(255) COLLATE pg_catalog."default" NOT NULL,
    store_id bigint,
    menu_id bigint
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.files
    OWNER to postgres;