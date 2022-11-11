--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Ubuntu 14.5-2.pgdg22.04+2)
-- Dumped by pg_dump version 14.5 (Ubuntu 14.5-2.pgdg22.04+2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: appointmentStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."appointmentStatus" AS ENUM (
    'Consulta Marcada',
    'Consulta Cancelada',
    'Consulta Realizada'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: appointments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.appointments (
    id integer NOT NULL,
    "specialistDoctor" text NOT NULL,
    "appointmentDate" timestamp without time zone NOT NULL,
    "appointmentAddress" text NOT NULL,
    comments text,
    status public."appointmentStatus" DEFAULT 'Consulta Marcada'::public."appointmentStatus"
);


--
-- Name: appointments_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.appointments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: appointments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.appointments_id_seq OWNED BY public.appointments.id;


--
-- Name: appointments id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.appointments ALTER COLUMN id SET DEFAULT nextval('public.appointments_id_seq'::regclass);


--
-- Data for Name: appointments; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.appointments VALUES (2, 'Pediatra', '2022-11-21 15:30:00', 'Rua x numero y', NULL, 'Consulta Marcada');
INSERT INTO public.appointments VALUES (3, 'Pediatra', '2022-11-21 15:30:00', 'Rua x numero y', 'marcar reconsulta', 'Consulta Marcada');
INSERT INTO public.appointments VALUES (7, 'Hematologista', '2022-12-01 09:50:00', 'Rua x numero y', 'marcar reconsulta', 'Consulta Marcada');
INSERT INTO public.appointments VALUES (8, 'Hematologista', '2022-12-01 09:50:00', 'Rua x numero y', 'marcar reconsulta', 'Consulta Marcada');
INSERT INTO public.appointments VALUES (9, 'Hematologista', '2022-12-01 09:50:00', 'Rua x numero y', 'marcar reconsulta', 'Consulta Marcada');
INSERT INTO public.appointments VALUES (6, 'Hematologista', '2022-12-01 09:50:00', 'Rua x numero y', 'marcar reconsulta', 'Consulta Cancelada');
INSERT INTO public.appointments VALUES (11, 'Dentista', '2022-12-25 00:00:00', 'Rua do Limoeiro', 'Conulta para Mônica', 'Consulta Cancelada');


--
-- Name: appointments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.appointments_id_seq', 11, true);


--
-- Name: appointments appointments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

