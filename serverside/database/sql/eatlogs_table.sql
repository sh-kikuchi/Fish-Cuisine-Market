-- Table: public.eatlogs

-- DROP TABLE IF EXISTS public.eatlogs;

CREATE TABLE IF NOT EXISTS public.eatlogs
(
    id bigint NOT NULL DEFAULT nextval('eatlogs_id_seq'::regclass),
    store_id bigint NOT NULL,
    menu_id bigint NOT NULL,
    text character varying(400) COLLATE pg_catalog."default",
    created_at time without time zone,
    updated_at time without time zone,
    date date,
    rating character varying(5) COLLATE pg_catalog."default",
    CONSTRAINT eatlogs_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.eatlogs
    OWNER to postgres;