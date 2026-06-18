CREATE TABLE IF NOT EXISTS pets (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age VARCHAR(50) NOT NULL,
    area VARCHAR(255) NOT NULL,
    justification TEXT NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    type VARCHAR(100) NOT NULL,
    filename VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS blogs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    author VARCHAR(100) NOT NULL DEFAULT 'Admin',
    image VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS site_counters (
    id SERIAL PRIMARY KEY,
    key VARCHAR(100) UNIQUE NOT NULL,
    value VARCHAR(100) NOT NULL,
    label VARCHAR(100) NOT NULL
);

INSERT INTO site_counters (key, value, label)
VALUES
    ('dogs_on_site', '72', 'DOGS ON SITE'),
    ('long_term_residents', '40', 'LONG-TERM RESIDENTS'),
    ('dogs_rescued', '200', 'DOGS RESCUED'),
    ('founded', '2019', 'FOUNDED')
ON CONFLICT (key) DO NOTHING;

CREATE TABLE IF NOT EXISTS dogs (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    breed VARCHAR(100),
    age VARCHAR(50),
    gender VARCHAR(20),
    description TEXT,
    image VARCHAR(255),
    looking_for_home BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE dogs
ADD COLUMN IF NOT EXISTS looking_for_home BOOLEAN NOT NULL DEFAULT FALSE;

CREATE TABLE IF NOT EXISTS site_settings (
    key VARCHAR(100) PRIMARY KEY,
    value TEXT NOT NULL
);

INSERT INTO site_settings (key, value)
VALUES
    ('featured_video_id', '88TDPIASN3Y'),
    ('featured_video_title', 'LEARN MORE')
ON CONFLICT (key) DO NOTHING;

CREATE TABLE IF NOT EXISTS videos (
    id SERIAL PRIMARY KEY,
    youtube_id VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS adopt_forms (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    phone_no VARCHAR(50) NOT NULL,
    living_situation TEXT NOT NULL,
    previous_experience TEXT NOT NULL,
    family_composition TEXT NOT NULL,
    pet_id INTEGER NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW()
);
