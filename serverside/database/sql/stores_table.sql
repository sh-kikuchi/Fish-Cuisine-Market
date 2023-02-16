-- Table: public.stores

-- DROP TABLE IF EXISTS public.stores;

CREATE TABLE IF NOT EXISTS public.stores
(
    id integer NOT NULL DEFAULT nextval('stores_id_seq'::regclass),
    user_id bigint NOT NULL,
    name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    address1 character varying(50) COLLATE pg_catalog."default" NOT NULL,
    address2 character varying(255) COLLATE pg_catalog."default",
    created_at time without time zone,
    updated_at time without time zone,
    toyosu_flg character varying(5) COLLATE pg_catalog."default",
    CONSTRAINT stores_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.stores
    OWNER to postgres;