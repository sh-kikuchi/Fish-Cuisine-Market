-- Table: public.menus

-- DROP TABLE IF EXISTS public.menus;

CREATE TABLE IF NOT EXISTS public.menus
(
    id bigint NOT NULL DEFAULT nextval('menus_id_seq'::regclass),
    store_id bigint NOT NULL,
    name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    memo character varying(255) COLLATE pg_catalog."default",
    price bigint,
    created_at time without time zone,
    updated_at time without time zone,
    region_flg character varying(5) COLLATE pg_catalog."default",
    CONSTRAINT menus_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.menus
    OWNER to postgres;