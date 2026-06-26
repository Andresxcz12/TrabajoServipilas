--
-- PostgreSQL database dump
--

\restrict xlDLsRFVELA4DitVN4F6H8JZnsDS2MarP6qaAxSQcATwP6CzfcOowsLWPQdBpxJ

-- Dumped from database version 18.4 (Debian 18.4-1.pgdg13+1)
-- Dumped by pg_dump version 18.4 (Debian 18.4-1.pgdg13+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: pedidos; Type: TABLE; Schema: public; Owner: crm_n2ch_user
--

CREATE TABLE public.pedidos (
    id integer NOT NULL,
    fechacreacion text,
    fechaventa text,
    usuario text,
    email text,
    telefono text,
    direccion text,
    tienda text,
    idrepartidor text,
    producto text,
    descripcion text,
    sku text,
    idproducto text,
    unidad integer,
    preciounitario numeric,
    pagototal numeric,
    ciudad text,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.pedidos OWNER TO crm_n2ch_user;

--
-- Name: pedidos_id_seq; Type: SEQUENCE; Schema: public; Owner: crm_n2ch_user
--

CREATE SEQUENCE public.pedidos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.pedidos_id_seq OWNER TO crm_n2ch_user;

--
-- Name: pedidos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: crm_n2ch_user
--

ALTER SEQUENCE public.pedidos_id_seq OWNED BY public.pedidos.id;


--
-- Name: pedidos id; Type: DEFAULT; Schema: public; Owner: crm_n2ch_user
--

ALTER TABLE ONLY public.pedidos ALTER COLUMN id SET DEFAULT nextval('public.pedidos_id_seq'::regclass);


--
-- Data for Name: pedidos; Type: TABLE DATA; Schema: public; Owner: crm_n2ch_user
--

COPY public.pedidos (id, fechacreacion, fechaventa, usuario, email, telefono, direccion, tienda, idrepartidor, producto, descripcion, sku, idproducto, unidad, preciounitario, pagototal, ciudad, created_at) FROM stdin;
1	2026-06-26	2026-06-26	Juan	amayahiguitaandresfelipe@gmail.com	3054272011	050011	Rappi	DADA	f		FSF	DAD	1	20000	20000		2026-06-26 19:44:03.305573
\.


--
-- Name: pedidos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: crm_n2ch_user
--

SELECT pg_catalog.setval('public.pedidos_id_seq', 1, true);


--
-- Name: pedidos pedidos_pkey; Type: CONSTRAINT; Schema: public; Owner: crm_n2ch_user
--

ALTER TABLE ONLY public.pedidos
    ADD CONSTRAINT pedidos_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

\unrestrict xlDLsRFVELA4DitVN4F6H8JZnsDS2MarP6qaAxSQcATwP6CzfcOowsLWPQdBpxJ

