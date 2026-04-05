--
-- PostgreSQL database dump
--

\restrict HTkd8IFBcdEahmFghxIdFdkHUNooKvOlWGvXjWvMphhiGB5ve5JI5LZk9LPgOI4

-- Dumped from database version 16.13 (Ubuntu 16.13-0ubuntu0.24.04.1)
-- Dumped by pg_dump version 18.3 (Homebrew)

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
-- Name: cats; Type: TABLE; Schema: public; Owner: konno
--

CREATE TABLE public.cats (
    id integer NOT NULL,
    name character varying(59) NOT NULL,
    age integer NOT NULL,
    breed character varying(255)
);


ALTER TABLE public.cats OWNER TO konno;

--
-- Name: cats_id_seq; Type: SEQUENCE; Schema: public; Owner: konno
--

ALTER TABLE public.cats ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.cats_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: cats; Type: TABLE DATA; Schema: public; Owner: konno
--

COPY public.cats (id, name, age, breed) FROM stdin;
1	tess	20	black hair
2	cats	30	white hair
\.


--
-- Name: cats_id_seq; Type: SEQUENCE SET; Schema: public; Owner: konno
--

SELECT pg_catalog.setval('public.cats_id_seq', 2, true);


--
-- Name: cats cats_pkey; Type: CONSTRAINT; Schema: public; Owner: konno
--

ALTER TABLE ONLY public.cats
    ADD CONSTRAINT cats_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

\unrestrict HTkd8IFBcdEahmFghxIdFdkHUNooKvOlWGvXjWvMphhiGB5ve5JI5LZk9LPgOI4

