PGDMP                         z            businessdashboard    14.4    14.4                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16396    businessdashboard    DATABASE     m   CREATE DATABASE businessdashboard WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'French_France.1252';
 !   DROP DATABASE businessdashboard;
                postgres    false            �            1259    16405    admins    TABLE     �   CREATE TABLE public.admins (
    admin_id integer NOT NULL,
    email character varying(255),
    password character varying(255)
);
    DROP TABLE public.admins;
       public         heap    postgres    false            �            1259    16404    admins_admin_id_seq    SEQUENCE     �   CREATE SEQUENCE public.admins_admin_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.admins_admin_id_seq;
       public          postgres    false    212                       0    0    admins_admin_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.admins_admin_id_seq OWNED BY public.admins.admin_id;
          public          postgres    false    211            �            1259    24595 	   employees    TABLE     �  CREATE TABLE public.employees (
    emp_id integer NOT NULL,
    drts_full_name character varying,
    drts_id character varying,
    system_id character varying,
    "position" character varying,
    reports_to character varying,
    integration_date date,
    exit_date date,
    birth_date date,
    cin character varying,
    phone_number character varying,
    system_login character varying
);
    DROP TABLE public.employees;
       public         heap    postgres    false            �            1259    24594    employees_emp_id_seq    SEQUENCE     �   CREATE SEQUENCE public.employees_emp_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.employees_emp_id_seq;
       public          postgres    false    214                       0    0    employees_emp_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.employees_emp_id_seq OWNED BY public.employees.emp_id;
          public          postgres    false    213            �            1259    16398    projects    TABLE       CREATE TABLE public.projects (
    project_id integer NOT NULL,
    bu character varying(50),
    wo_number character varying,
    project_name character varying(55),
    requestor character varying(75),
    wo_description character varying(255),
    xr character varying(75)
);
    DROP TABLE public.projects;
       public         heap    postgres    false            �            1259    16397    projects_project_id_seq    SEQUENCE     �   CREATE SEQUENCE public.projects_project_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.projects_project_id_seq;
       public          postgres    false    210                       0    0    projects_project_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.projects_project_id_seq OWNED BY public.projects.project_id;
          public          postgres    false    209            g           2604    16408    admins admin_id    DEFAULT     r   ALTER TABLE ONLY public.admins ALTER COLUMN admin_id SET DEFAULT nextval('public.admins_admin_id_seq'::regclass);
 >   ALTER TABLE public.admins ALTER COLUMN admin_id DROP DEFAULT;
       public          postgres    false    211    212    212            h           2604    24598    employees emp_id    DEFAULT     t   ALTER TABLE ONLY public.employees ALTER COLUMN emp_id SET DEFAULT nextval('public.employees_emp_id_seq'::regclass);
 ?   ALTER TABLE public.employees ALTER COLUMN emp_id DROP DEFAULT;
       public          postgres    false    213    214    214            f           2604    16401    projects project_id    DEFAULT     z   ALTER TABLE ONLY public.projects ALTER COLUMN project_id SET DEFAULT nextval('public.projects_project_id_seq'::regclass);
 B   ALTER TABLE public.projects ALTER COLUMN project_id DROP DEFAULT;
       public          postgres    false    210    209    210            �          0    16405    admins 
   TABLE DATA           ;   COPY public.admins (admin_id, email, password) FROM stdin;
    public          postgres    false    212   C       �          0    24595 	   employees 
   TABLE DATA           �   COPY public.employees (emp_id, drts_full_name, drts_id, system_id, "position", reports_to, integration_date, exit_date, birth_date, cin, phone_number, system_login) FROM stdin;
    public          postgres    false    214   �       �          0    16398    projects 
   TABLE DATA           j   COPY public.projects (project_id, bu, wo_number, project_name, requestor, wo_description, xr) FROM stdin;
    public          postgres    false    210   �       	           0    0    admins_admin_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.admins_admin_id_seq', 2, true);
          public          postgres    false    211            
           0    0    employees_emp_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.employees_emp_id_seq', 38, true);
          public          postgres    false    213                       0    0    projects_project_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.projects_project_id_seq', 40, true);
          public          postgres    false    209            l           2606    16412    admins admins_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_pkey PRIMARY KEY (admin_id);
 <   ALTER TABLE ONLY public.admins DROP CONSTRAINT admins_pkey;
       public            postgres    false    212            n           2606    24602    employees employees_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_pkey PRIMARY KEY (emp_id);
 B   ALTER TABLE ONLY public.employees DROP CONSTRAINT employees_pkey;
       public            postgres    false    214            j           2606    16403    projects projects_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (project_id);
 @   ALTER TABLE ONLY public.projects DROP CONSTRAINT projects_pkey;
       public            postgres    false    210            �   �   x�M���   �g���R�zkakvCm�pm��&����������a\I}+{+���3[��u|��Y��R?`e�ㆥ����-�(o%9�3)&Y5�Hk��4�wø�����L��4���	�ï����NT�wk��|�Q�S����6�ᾯb\��(JT��EN� �(�;      �   w  x�eR=o� ��_�\����sZ�]���,$�1R�+p���lb;	B�Ü�ޑ�WǓ��);hg��}g��sB�2���2@J	�	����BH��K7&ե?���mg�b����K�Y�c*��v�>v�1f�`|m�j����=>j�K:%ay�bԙ�_C!{cCv5bQ��c�R^V�6�.��_���	Fc*�3ؼI*����(/hI'vT@(�j�����|Z�%�r�:��z^��n>k,��?��w\�̅��WՂU�����ޭ��S[Y�a4�u�LE�BmV���	O�{����q=�C�-<t�J��e2h�~T�����x��[
�z�ۧ�5����E�t�Jr�F�W��?W�Ӣ      �     x����N�0���O�hl�-pc��	.7��t���H	���-?�I'mg�wN2v_���7�z�(���j���T�և���8�l�|[�J����l������J�#a|�z��i�&x�9P؛�N�����w���`(��P
_�WL�A�v�A(�@&G�;�ԕ:Y��o�߳��$H����ئWu;f4Z�`?ꦱ#�>A\���* @8ܤ	��GȢq��9\%i�@Z�7e����֯	�D$9ØN�׏y⽦���B��{9     