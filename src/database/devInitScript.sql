-- Drop Table --
DROP TABLE IF EXISTS public.users CASCADE;
DROP TABLE IF EXISTS public.trips CASCADE;
DROP TABLE IF EXISTS public.containers CASCADE;
DROP TABLE IF EXISTS public.items CASCADE;

-- Create Users Table --
CREATE TABLE public.users (
	id SERIAL PRIMARY KEY NOT NULL,
	user_id TEXT NOT NULL UNIQUE,
	first_name TEXT NOT NULL,
	last_name TEXT NOT NULL,
	email TEXT NOT NULL UNIQUE,
	created_on TIMESTAMP NOT NULL DEFAULT(current_timestamp)
);

-- Seed User Data --
INSERT INTO public.users (user_id, first_name, last_name, email) 
VALUES (
	'949dc7dc-0b75-4552-a565-dc977c8e8b7b',
	'Adrian',
	'DSouza',
	'testingdsz@gmail.com'
);

INSERT INTO public.users (user_id, first_name, last_name, email)
VALUES (
	'f8bf854e-f80a-4165-808b-e1b607af122e',
	'Alan',
	'Joy',
	'testingjoy@gmail.com'
);

INSERT INTO public.users (user_id, first_name, last_name, email)
VALUES (
	'db62b0aa-9f84-487a-9969-80b50a8cebff',
	'Jerry',
	'Cardenas',
	'testingcard@gmail.com'
);

INSERT INTO public.users (user_id, first_name, last_name, email)
VALUES (
	'9c6c5f35-da49-45b8-8269-7975fbbc7d8e',
	'Manish',
	'Devkota',
	'testingdev@gmail.com'
);

-- Create trips table --
CREATE TABLE public.trips (
	id SERIAL PRIMARY KEY NOT NULL,
	trip_id TEXT NOT NULL UNIQUE,
	user_id TEXT NOT NULL REFERENCES public.users(user_id) ON DELETE CASCADE,
	name TEXT NOT NULL,
	origin TEXT NOT NULL,
	destination TEXT NOT NULL,
	date TIMESTAMP NOT NULL CHECK (date > current_timestamp),
	completed BOOL NOT NULL DEFAULT(FALSE)
);

-- Seed trip date --
INSERT INTO public.trips (trip_id, user_id, name, origin, destination, date)
VALUES (
	'eecf6cce-16a6-40ac-be8d-b9f7ce206517',
	'949dc7dc-0b75-4552-a565-dc977c8e8b7b',
	'Move in - Uni',
	'Toronto - ON',
	'Ottawa - ON',
	'2020-10-15'
);

INSERT INTO public.trips (trip_id, user_id, name, origin, destination, date)
VALUES (
	'5719c0c2-a504-4f4e-a8a7-ea7737c7b6f7',
	'949dc7dc-0b75-4552-a565-dc977c8e8b7b',
	'Ohio Trip',
	'Toronto - ON',
	'Ada - OH',
	'2020-09-25'
);

INSERT INTO public.trips (trip_id, user_id, name, origin, destination, date)
VALUES (
	'bba3b37b-7c88-4f6f-bdb8-ee630950d124',
	'9c6c5f35-da49-45b8-8269-7975fbbc7d8e',
	'Uni Move in',
	'Brampton - ON',
	'Ottawa - ON',
	'2020-10-20'
);

-- Create containers table --
CREATE TABLE public.containers (
	id SERIAL PRIMARY KEY NOT NULL,
	container_id TEXT NOT NULL UNIQUE,
	trip_id TEXT NOT NULL REFERENCES public.trips(trip_id) ON DELETE CASCADE,
	type TEXT NOT NULL DEFAULT('suitcase'),
	description TEXT NOT NULL
);

-- Seed containers data --

-- Create items table --
CREATE TABLE public.items (
	id SERIAL PRIMARY KEY NOT NULL,
	container_id TEXT NOT NULL REFERENCES public.containers(container_id) ON DELETE CASCADE,
	description TEXT NOT NULL,
	type TEXT NOT NULL,
	in_the_bag BOOL NOT NULL DEFAULT(FALSE),
	checked_at_destination BOOL NOT NULL DEFAULT(FALSE)
);

-- Seed items data --
