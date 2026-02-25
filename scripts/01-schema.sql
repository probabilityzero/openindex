-- Core Schema for Planet-Scale Catalog
-- Run this in Supabase SQL Editor

-- Works table (canonical entities)
CREATE TABLE IF NOT EXISTS works (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type VARCHAR(50) NOT NULL, -- film, book, software, game, audio, asset
  title VARCHAR(500) NOT NULL,
  original_title VARCHAR(500),
  year INTEGER,
  summary TEXT,
  cover_url VARCHAR(1000),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_works_type_year ON works(type, year DESC);
CREATE INDEX idx_works_title_gin ON works USING GIN(to_tsvector('english', title));
CREATE INDEX idx_works_summary_gin ON works USING GIN(to_tsvector('english', summary));

-- Resources table (versions/links/materials)
CREATE TABLE IF NOT EXISTS resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  work_id UUID NOT NULL REFERENCES works(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL, -- main, subtitle, trailer, docs, patch, source
  version_label VARCHAR(100),
  language VARCHAR(10),
  format VARCHAR(100), -- mp4, mkv, pdf, exe, torrent, magnet, http, etc
  platform VARCHAR(100), -- web, android, ios, linux, windows, macos
  locator VARCHAR(2000), -- url, magnet link, identifier
  size_bytes BIGINT,
  source VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_resources_work_id ON resources(work_id);
CREATE INDEX idx_resources_type ON resources(type);
CREATE INDEX idx_resources_language ON resources(language);
CREATE INDEX idx_resources_platform ON resources(platform);

-- People table
CREATE TABLE IF NOT EXISTS people (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(500) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_people_name ON people(name);

-- Work-People relationship
CREATE TABLE IF NOT EXISTS work_people (
  work_id UUID NOT NULL REFERENCES works(id) ON DELETE CASCADE,
  person_id UUID NOT NULL REFERENCES people(id) ON DELETE CASCADE,
  role VARCHAR(100), -- director, author, composer, developer, actor, etc
  PRIMARY KEY (work_id, person_id, role)
);

CREATE INDEX idx_work_people_person_id ON work_people(person_id);

-- Tags table
CREATE TABLE IF NOT EXISTS tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(200) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_tags_name ON tags(name);

-- Work-Tags relationship
CREATE TABLE IF NOT EXISTS work_tags (
  work_id UUID NOT NULL REFERENCES works(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (work_id, tag_id)
);

CREATE INDEX idx_work_tags_tag_id ON work_tags(tag_id);

-- External IDs (IMDb, TMDB, etc)
CREATE TABLE IF NOT EXISTS external_ids (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  work_id UUID NOT NULL REFERENCES works(id) ON DELETE CASCADE,
  source VARCHAR(100) NOT NULL, -- imdb, tmdb, igdb, goodreads, etc
  external_key VARCHAR(500) NOT NULL,
  url VARCHAR(1000),
  UNIQUE(work_id, source, external_key)
);

CREATE INDEX idx_external_ids_source ON external_ids(source, external_key);

-- User profiles (extends Supabase auth)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username VARCHAR(200) UNIQUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_profiles_username ON profiles(username);

-- Enable RLS (Row Level Security)
ALTER TABLE works ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE people ENABLE ROW LEVEL SECURITY;
ALTER TABLE work_people ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE work_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE external_ids ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies (all tables readable by public, writes restricted)
CREATE POLICY "Enable read access for all users" ON works FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON resources FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON people FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON work_people FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON tags FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON work_tags FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON external_ids FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON profiles FOR SELECT USING (true);

-- Insertable only by authenticated users (for submissions)
CREATE POLICY "Enable insert for authenticated users" ON works FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable insert for authenticated users" ON resources FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable insert for authenticated users" ON people FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable insert for authenticated users" ON work_people FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable insert for authenticated users" ON tags FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable insert for authenticated users" ON work_tags FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable insert for authenticated users" ON external_ids FOR INSERT WITH CHECK (auth.role() = 'authenticated');
