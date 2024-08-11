--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

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
-- Name: public; Type: SCHEMA; Schema: -; Owner: docker
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO docker;

--
-- Name: Gender; Type: TYPE; Schema: public; Owner: docker
--

CREATE TYPE public."Gender" AS ENUM (
    'f',
    'm'
);


ALTER TYPE public."Gender" OWNER TO docker;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Admin; Type: TABLE; Schema: public; Owner: docker
--

CREATE TABLE public."Admin" (
    id integer NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Admin" OWNER TO docker;

--
-- Name: Admin_id_seq; Type: SEQUENCE; Schema: public; Owner: docker
--

CREATE SEQUENCE public."Admin_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Admin_id_seq" OWNER TO docker;

--
-- Name: Admin_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: docker
--

ALTER SEQUENCE public."Admin_id_seq" OWNED BY public."Admin".id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: docker
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO docker;

--
-- Name: birds; Type: TABLE; Schema: public; Owner: docker
--

CREATE TABLE public.birds (
    id integer NOT NULL,
    name text NOT NULL,
    father text NOT NULL,
    mother text NOT NULL,
    birth timestamp(3) without time zone NOT NULL,
    visible boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "genealogyId" integer NOT NULL,
    ring text NOT NULL,
    gender public."Gender" NOT NULL
);


ALTER TABLE public.birds OWNER TO docker;

--
-- Name: birds_id_seq; Type: SEQUENCE; Schema: public; Owner: docker
--

CREATE SEQUENCE public.birds_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.birds_id_seq OWNER TO docker;

--
-- Name: birds_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: docker
--

ALTER SEQUENCE public.birds_id_seq OWNED BY public.birds.id;


--
-- Name: genealogies; Type: TABLE; Schema: public; Owner: docker
--

CREATE TABLE public.genealogies (
    id integer NOT NULL,
    "paternalGrandfather" text,
    "paternalGrandmother" text,
    "maternalGrandfather" text,
    "maternalGrandmother" text,
    "paternalGreatGrandfather1" text,
    "paternalGreatGrandmother1" text,
    "paternalGreatGrandfather2" text,
    "paternalGreatGrandmother2" text,
    "maternalGreatGrandfather1" text,
    "maternalGreatGrandmother1" text,
    "maternalGreatGrandfather2" text,
    "maternalGreatGrandmother2" text,
    "paternalGreatGreatGrandfather1" text,
    "paternalGreatGreatGrandmother1" text,
    "paternalGreatGreatGrandfather2" text,
    "paternalGreatGreatGrandmother2" text,
    "paternalGreatGreatGrandfather3" text,
    "paternalGreatGreatGrandmother3" text,
    "paternalGreatGreatGrandfather4" text,
    "paternalGreatGreatGrandmother4" text,
    "maternalGreatGreatGrandfather1" text,
    "maternalGreatGreatGrandmother1" text,
    "maternalGreatGreatGrandfather2" text,
    "maternalGreatGreatGrandmother2" text,
    "maternalGreatGreatGrandfather3" text,
    "maternalGreatGreatGrandmother3" text,
    "maternalGreatGreatGrandfather4" text,
    "maternalGreatGreatGrandmother4" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.genealogies OWNER TO docker;

--
-- Name: genealogies_id_seq; Type: SEQUENCE; Schema: public; Owner: docker
--

CREATE SEQUENCE public.genealogies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.genealogies_id_seq OWNER TO docker;

--
-- Name: genealogies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: docker
--

ALTER SEQUENCE public.genealogies_id_seq OWNED BY public.genealogies.id;


--
-- Name: Admin id; Type: DEFAULT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public."Admin" ALTER COLUMN id SET DEFAULT nextval('public."Admin_id_seq"'::regclass);


--
-- Name: birds id; Type: DEFAULT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public.birds ALTER COLUMN id SET DEFAULT nextval('public.birds_id_seq'::regclass);


--
-- Name: genealogies id; Type: DEFAULT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public.genealogies ALTER COLUMN id SET DEFAULT nextval('public.genealogies_id_seq'::regclass);


--
-- Data for Name: Admin; Type: TABLE DATA; Schema: public; Owner: docker
--

COPY public."Admin" (id, email, password, "createdAt", "updatedAt") FROM stdin;
1	admin123	admin123	2024-08-04 01:44:38.286	2024-08-04 01:44:38.286
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: docker
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
133c1c7e-49bc-4fcb-96cd-0a912aba6c3f	512752c1b06f33cae54db692a060ba76182208982c38102ce8b035197fee74e4	2024-08-04 01:31:02.907159+00	20240804013102_first	\N	\N	2024-08-04 01:31:02.877615+00	1
48157059-1a97-4578-acdf-f9f8b20e16ce	45ac34d44950d2352d1e68fa0dc7af20b0026e927b0081860507d7006851f4e2	2024-08-04 01:32:45.361011+00	20240804013245_add_maps	\N	\N	2024-08-04 01:32:45.34133+00	1
7493ab2a-6b2b-45da-9afe-db1b0ab61318	8e392e7af6250369bd6d29ceeb82f3b75fe8c1d419c535202a83d4ffb2eba06e	2024-08-06 18:31:06.555716+00	20240806183106_ring	\N	\N	2024-08-06 18:31:06.54257+00	1
\.


--
-- Data for Name: birds; Type: TABLE DATA; Schema: public; Owner: docker
--

COPY public.birds (id, name, father, mother, birth, visible, "createdAt", "updatedAt", "genealogyId", ring, gender) FROM stdin;
3	filho teste	pai teste	mae teste	2000-02-22 00:00:00	t	2024-08-06 20:21:44.164	2024-08-06 20:21:44.164	5	teste ce/a 22022005	m
4	Filho cache	pai cache	mae cache	2000-02-22 00:00:00	t	2024-08-08 01:11:47.539	2024-08-08 01:11:47.539	6	jp ce/a 22022005 teste cache	m
5	nelson junior	nelson	rita	1981-06-28 00:00:00	t	2024-08-08 20:54:43.572	2024-08-08 20:54:43.572	7	nj ce/a 28061981	m
2	filho	pai a	mae	2000-02-22 00:00:00	t	2024-08-06 20:15:12	2024-08-10 18:39:21.613	4	jp ce/a 22022005a	m
1	joão pedro 	nelson  ab	eli jk 	2005-02-22 00:00:00	t	2024-08-06 18:31:45.509	2024-08-10 18:51:43.854	3	jp ce/a 22022005	m
\.


--
-- Data for Name: genealogies; Type: TABLE DATA; Schema: public; Owner: docker
--

COPY public.genealogies (id, "paternalGrandfather", "paternalGrandmother", "maternalGrandfather", "maternalGrandmother", "paternalGreatGrandfather1", "paternalGreatGrandmother1", "paternalGreatGrandfather2", "paternalGreatGrandmother2", "maternalGreatGrandfather1", "maternalGreatGrandmother1", "maternalGreatGrandfather2", "maternalGreatGrandmother2", "paternalGreatGreatGrandfather1", "paternalGreatGreatGrandmother1", "paternalGreatGreatGrandfather2", "paternalGreatGreatGrandmother2", "paternalGreatGreatGrandfather3", "paternalGreatGreatGrandmother3", "paternalGreatGreatGrandfather4", "paternalGreatGreatGrandmother4", "maternalGreatGreatGrandfather1", "maternalGreatGreatGrandmother1", "maternalGreatGreatGrandfather2", "maternalGreatGreatGrandmother2", "maternalGreatGreatGrandfather3", "maternalGreatGreatGrandmother3", "maternalGreatGreatGrandfather4", "maternalGreatGreatGrandmother4", "createdAt", "updatedAt") FROM stdin;
1	nelson	rita	joão 	tereza																									2024-08-06 18:26:54.924	2024-08-06 18:26:54.924
2	nelson	rita	joão 	tereza																									2024-08-06 18:28:03.736	2024-08-06 18:28:03.736
3	nelson	rita	joão 	tereza																									2024-08-06 18:31:45.503	2024-08-06 18:31:45.503
4	Avô Paterno:	Avo Paterno	Avô Materno	Avô Materna	Bisavô Paterno 1	Bisavo Paterno 1	Bisavô Paterno 2	Bisavô Paterno 2																					2024-08-06 20:15:11.989	2024-08-06 20:15:11.989
5	Avô Paterno: teste	Avo Paterna 	Avô Materno teste	Avo Materna teste																									2024-08-06 20:21:44.157	2024-08-06 20:21:44.157
6	avo cache 1	avo cache 2	avo cache 3	avo cache 4																									2024-08-08 01:11:47.509	2024-08-08 01:11:47.509
7	Francisco	Elza	Antonio	Beatriz	Luís	Dona Maria	José	Dona Rosa	Jorge	Dona Silvia	Raimundo	Dona Elisabete	Pedro	Dona Laura	João	Dona Clara	Manuel	Dona Rita	José	Dona Célia	Gustavo	Dona Alice	Edson	Dona Marta	Ricardo	Dona Fátima	Afonso	Dona Clarice	2024-08-08 20:54:43.542	2024-08-08 20:54:43.542
\.


--
-- Name: Admin_id_seq; Type: SEQUENCE SET; Schema: public; Owner: docker
--

SELECT pg_catalog.setval('public."Admin_id_seq"', 1, true);


--
-- Name: birds_id_seq; Type: SEQUENCE SET; Schema: public; Owner: docker
--

SELECT pg_catalog.setval('public.birds_id_seq', 5, true);


--
-- Name: genealogies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: docker
--

SELECT pg_catalog.setval('public.genealogies_id_seq', 7, true);


--
-- Name: Admin Admin_pkey; Type: CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public."Admin"
    ADD CONSTRAINT "Admin_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: birds birds_pkey; Type: CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public.birds
    ADD CONSTRAINT birds_pkey PRIMARY KEY (id);


--
-- Name: genealogies genealogies_pkey; Type: CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public.genealogies
    ADD CONSTRAINT genealogies_pkey PRIMARY KEY (id);


--
-- Name: Admin_email_key; Type: INDEX; Schema: public; Owner: docker
--

CREATE UNIQUE INDEX "Admin_email_key" ON public."Admin" USING btree (email);


--
-- Name: birds_genealogyId_key; Type: INDEX; Schema: public; Owner: docker
--

CREATE UNIQUE INDEX "birds_genealogyId_key" ON public.birds USING btree ("genealogyId");


--
-- Name: birds_ring_key; Type: INDEX; Schema: public; Owner: docker
--

CREATE UNIQUE INDEX birds_ring_key ON public.birds USING btree (ring);


--
-- Name: birds birds_genealogyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public.birds
    ADD CONSTRAINT "birds_genealogyId_fkey" FOREIGN KEY ("genealogyId") REFERENCES public.genealogies(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

