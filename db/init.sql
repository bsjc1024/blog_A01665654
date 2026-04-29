--
-- PostgreSQL database dump
--

-- Dumped from database version 16.13 (Homebrew)
-- Dumped by pg_dump version 16.4

-- Started on 2026-04-29 12:15:02 CST

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 216 (class 1259 OID 16386)
-- Name: author; Type: TABLE; Schema: public; Owner: bumsoojang
--

CREATE TABLE public.author (
    id_author integer NOT NULL,
    name character varying(100),
    lastname character varying(100),
    date_of_birth date,
    email character varying(150),
    phone_number character varying(20),
    username character varying,
    password character varying
);


ALTER TABLE public.author OWNER TO bumsoojang;

--
-- TOC entry 215 (class 1259 OID 16385)
-- Name: author_id_author_seq; Type: SEQUENCE; Schema: public; Owner: bumsoojang
--

CREATE SEQUENCE public.author_id_author_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.author_id_author_seq OWNER TO bumsoojang;

--
-- TOC entry 3845 (class 0 OID 0)
-- Dependencies: 215
-- Name: author_id_author_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bumsoojang
--

ALTER SEQUENCE public.author_id_author_seq OWNED BY public.author.id_author;


--
-- TOC entry 218 (class 1259 OID 16393)
-- Name: post; Type: TABLE; Schema: public; Owner: bumsoojang
--

CREATE TABLE public.post (
    id_post integer NOT NULL,
    title character varying(200),
    date date,
    image character varying(300),
    text text,
    id_author integer
);


ALTER TABLE public.post OWNER TO bumsoojang;

--
-- TOC entry 217 (class 1259 OID 16392)
-- Name: post_id_post_seq; Type: SEQUENCE; Schema: public; Owner: bumsoojang
--

CREATE SEQUENCE public.post_id_post_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.post_id_post_seq OWNER TO bumsoojang;

--
-- TOC entry 3846 (class 0 OID 0)
-- Dependencies: 217
-- Name: post_id_post_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bumsoojang
--

ALTER SEQUENCE public.post_id_post_seq OWNED BY public.post.id_post;


--
-- TOC entry 219 (class 1259 OID 16406)
-- Name: session; Type: TABLE; Schema: public; Owner: bumsoojang
--

CREATE TABLE public.session (
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL
);


ALTER TABLE public.session OWNER TO bumsoojang;

--
-- TOC entry 3682 (class 2604 OID 16389)
-- Name: author id_author; Type: DEFAULT; Schema: public; Owner: bumsoojang
--

ALTER TABLE ONLY public.author ALTER COLUMN id_author SET DEFAULT nextval('public.author_id_author_seq'::regclass);


--
-- TOC entry 3683 (class 2604 OID 16396)
-- Name: post id_post; Type: DEFAULT; Schema: public; Owner: bumsoojang
--

ALTER TABLE ONLY public.post ALTER COLUMN id_post SET DEFAULT nextval('public.post_id_post_seq'::regclass);


--
-- TOC entry 3836 (class 0 OID 16386)
-- Dependencies: 216
-- Data for Name: author; Type: TABLE DATA; Schema: public; Owner: bumsoojang
--

COPY public.author (id_author, name, lastname, date_of_birth, email, phone_number, username, password) FROM stdin;
23	Camila	Torres	1997-11-05	camila.torres@example.com	+52 55 1003 0303	\N	\N
24	Mateo	Vega	1992-01-18	mateo.vega@example.com	+52 55 1004 0404	\N	\N
25	Isabella	Morales	1994-06-30	isabella.morales@example.com	+52 55 1005 0505	\N	\N
26	Sebastián	Cruz	1986-09-14	sebastian.cruz@example.com	+52 55 1006 0606	\N	\N
27	Valentina	Reyes	1993-04-22	valentina.reyes@example.com	+52 55 1007 0707	\N	\N
28	Emilio	Castillo	1990-12-03	emilio.castillo@example.com	+52 55 1008 0808	\N	\N
29	Natalia	Vargas	1989-08-17	natalia.vargas@example.com	+52 55 1009 0909	\N	\N
30	Rodrigo	Peña	1996-02-28	rodrigo.pena@example.com	+52 55 1010 1010	\N	\N
21	Sofía	Ramírez	1995-03-12	sofia.ramirez@example.com	+52 55 1001 0101	sofia	sofia
22	Diego	Fuentes	1988-07-24	diego.fuentes@example.com	+52 55 1002 0202	diego	diego
\.


--
-- TOC entry 3838 (class 0 OID 16393)
-- Dependencies: 218
-- Data for Name: post; Type: TABLE DATA; Schema: public; Owner: bumsoojang
--

COPY public.post (id_post, title, date, image, text, id_author) FROM stdin;
7	Primer post	2023-12-01	beagle.jpg	El comienzo de una aventura entre mascotas y datos.	21
8	Segundo post	2023-12-01	doberman.jpg	Las relaciones entre tablas son como lazos entre amigos.	22
9	Tercer post	2023-12-01	husky.jpg	Cada consulta SQL es una pregunta bien formulada.	23
10	Cuarto post	2023-12-01	golden.jpg	Los errores en la base de datos nos enseñan a ser precisos.	24
11	Quinto post	2023-12-01	beagle.jpg	Una imagen vale más que mil registros.	25
12	Sexto post	2023-12-01	golden.jpg	La consistencia en los datos es la clave del éxito.	26
\.


--
-- TOC entry 3839 (class 0 OID 16406)
-- Dependencies: 219
-- Data for Name: session; Type: TABLE DATA; Schema: public; Owner: bumsoojang
--

COPY public.session (sid, sess, expire) FROM stdin;
\.


--
-- TOC entry 3847 (class 0 OID 0)
-- Dependencies: 215
-- Name: author_id_author_seq; Type: SEQUENCE SET; Schema: public; Owner: bumsoojang
--

SELECT pg_catalog.setval('public.author_id_author_seq', 30, true);


--
-- TOC entry 3848 (class 0 OID 0)
-- Dependencies: 217
-- Name: post_id_post_seq; Type: SEQUENCE SET; Schema: public; Owner: bumsoojang
--

SELECT pg_catalog.setval('public.post_id_post_seq', 12, true);


--
-- TOC entry 3685 (class 2606 OID 16391)
-- Name: author author_pkey; Type: CONSTRAINT; Schema: public; Owner: bumsoojang
--

ALTER TABLE ONLY public.author
    ADD CONSTRAINT author_pkey PRIMARY KEY (id_author);


--
-- TOC entry 3687 (class 2606 OID 16400)
-- Name: post post_pkey; Type: CONSTRAINT; Schema: public; Owner: bumsoojang
--

ALTER TABLE ONLY public.post
    ADD CONSTRAINT post_pkey PRIMARY KEY (id_post);


--
-- TOC entry 3690 (class 2606 OID 16412)
-- Name: session session_pkey; Type: CONSTRAINT; Schema: public; Owner: bumsoojang
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);


--
-- TOC entry 3688 (class 1259 OID 16413)
-- Name: IDX_session_expire; Type: INDEX; Schema: public; Owner: bumsoojang
--

CREATE INDEX "IDX_session_expire" ON public.session USING btree (expire);


--
-- TOC entry 3691 (class 2606 OID 16401)
-- Name: post post_id_author_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bumsoojang
--

ALTER TABLE ONLY public.post
    ADD CONSTRAINT post_id_author_fkey FOREIGN KEY (id_author) REFERENCES public.author(id_author);


-- Completed on 2026-04-29 12:15:02 CST

--
-- PostgreSQL database dump complete
--

