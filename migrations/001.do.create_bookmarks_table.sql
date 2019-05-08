CREATE TABLE bookmarks (
  title TEXT NOT NULL, 
  rating INTEGER DEFAULT 5,
  url TEXT NOT NULL,
  description TEXT,
  id SERIAL PRIMARY KEY
);