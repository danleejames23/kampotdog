const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'pawfinds.db'));

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
CREATE TABLE IF NOT EXISTS pets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age TEXT NOT NULL,
    area TEXT NOT NULL,
    justification TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    type TEXT NOT NULL,
    filename TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Pending',
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS blogs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT NOT NULL DEFAULT 'Admin',
    image TEXT,
    created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS site_counters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    key TEXT UNIQUE NOT NULL,
    value TEXT NOT NULL,
    label TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS dogs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    breed TEXT,
    age TEXT,
    gender TEXT,
    description TEXT,
    image TEXT,
    looking_for_home INTEGER NOT NULL DEFAULT 0,
    pinned INTEGER NOT NULL DEFAULT 0,
    sponsored INTEGER NOT NULL DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS site_settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS videos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    youtube_id TEXT NOT NULL,
    title TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS adopt_forms (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    phone_no TEXT NOT NULL,
    living_situation TEXT NOT NULL,
    previous_experience TEXT NOT NULL,
    family_composition TEXT NOT NULL,
    pet_id INTEGER NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
    created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS contact_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'unread',
    created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS return_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    dog_name TEXT NOT NULL,
    adopter_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    reason TEXT NOT NULL,
    additional_info TEXT,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS sponsorships (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    dog_name TEXT NOT NULL UNIQUE,
    sponsor_name TEXT NOT NULL,
    sponsor_email TEXT NOT NULL,
    sponsor_phone TEXT,
    sponsor_reason TEXT,
    sponsored_at TEXT,
    created_at TEXT DEFAULT (datetime('now'))
);
`);

try {
    db.prepare('ALTER TABLE dogs ADD COLUMN pinned INTEGER NOT NULL DEFAULT 0').run();
} catch(e) {}
try {
    db.prepare('ALTER TABLE dogs ADD COLUMN sponsored INTEGER NOT NULL DEFAULT 0').run();
} catch(e) {}
try {
    db.prepare('ALTER TABLE sponsorships ADD COLUMN sponsored_at TEXT').run();
} catch(e) {}

try {
    db.prepare(`UPDATE dogs SET pinned=1, sponsored=1 WHERE LOWER(REPLACE(name,' ','')) LIKE '%yinyang%'`).run();
} catch(e) {}

try {
    db.prepare(`UPDATE sponsorships SET sponsored_at = COALESCE(sponsored_at, date(created_at), date('now'))`).run();
} catch(e) {}

const ensureBlog = db.prepare(
    `INSERT OR IGNORE INTO blogs (title, category, content, author, image)
     VALUES (?, ?, ?, ?, ?)`
);

const upsertBlogByTitle = (title, category, content, author, image) => {
    const existing = db.prepare('SELECT id FROM blogs WHERE LOWER(title)=? LIMIT 1').get(title.toLowerCase());
    if (existing) {
        db.prepare('UPDATE blogs SET category=?, content=?, author=?, image=? WHERE id=?')
            .run(category, content, author, image, existing.id);
        return existing.id;
    }

    return db.prepare('INSERT INTO blogs (title, category, content, author, image) VALUES (?, ?, ?, ?, ?)')
        .run(title, category, content, author, image).lastInsertRowid;
};

const removeDuplicateBlogs = (title) => {
    db.prepare(`
        DELETE FROM blogs
        WHERE LOWER(title)=?
          AND id NOT IN (
              SELECT MIN(id)
              FROM blogs
              WHERE LOWER(title)=?
          )
    `).run(title.toLowerCase(), title.toLowerCase());
};

const seedCounters = db.prepare(`INSERT OR IGNORE INTO site_counters (key, value, label) VALUES (?, ?, ?)`);
const insertCounters = db.transaction(() => {
    seedCounters.run('dogs_on_site', '72', 'DOGS ON SITE');
    seedCounters.run('long_term_residents', '40', 'LONG-TERM RESIDENTS');
    seedCounters.run('dogs_rescued', '200', 'DOGS RESCUED');
    seedCounters.run('founded', '2019', 'FOUNDED');
});
insertCounters();

const seedSettings = db.prepare(`INSERT OR IGNORE INTO site_settings (key, value) VALUES (?, ?)`);
const insertSettings = db.transaction(() => {
    seedSettings.run('featured_video_id', '88TDPIASN3Y');
    seedSettings.run('featured_video_title', 'LEARN MORE');
});
insertSettings();

const existingWhoIsJoe = db.prepare('SELECT id FROM blogs WHERE LOWER(title)=? LIMIT 1').get('who is joe?');
if (!existingWhoIsJoe) {
    db.prepare(
        'INSERT INTO blogs (title, category, content, author, image) VALUES (?, ?, ?, ?, ?)'
    ).run(
        'WHO IS JOE?',
        'Who Is Joe',
        'Joe is an Australian citizen who fell in love with Cambodia and chose to build a life here. Over time, he became the heart behind Kampot Dog Sanctuary and rescue work for vulnerable dogs.',
        'KDS Team',
        'whoisjoe.jpg'
    );
}

try {
    db.prepare(`UPDATE blogs SET image=? WHERE LOWER(title)=?`).run('whoisjoe.jpg', 'who is joe?');
} catch(e) {}

const chickChick = db.prepare(
    `SELECT name, description, image FROM dogs WHERE LOWER(REPLACE(name, ' ', '')) = ? LIMIT 1`
).get('chickchick');
if (chickChick) {
    const chickChickContent = `${chickChick.description || 'Bio coming soon.'}\n\nWarning: Chick Chick is not aggressive if left alone, but she does not like being touched or stroked. Please let her come to you if she wants attention.`;
    upsertBlogByTitle('CHICK CHICK', 'Dog Profile', chickChickContent, 'KDS Team', chickChick.image || 'chick_chick.jpg');
    removeDuplicateBlogs('CHICK CHICK');
}

const finn = db.prepare(
    `SELECT name, description, image FROM dogs WHERE LOWER(name) = ? LIMIT 1`
).get('finn');
if (finn) {
    upsertBlogByTitle(
        'FINN',
        'Dog Profile',
        `${finn.description || 'Bio coming soon.'}\n\nWarning: Finn is not aggressive when left alone, but does not like being touched or stroked. Please respect his space.`,
        'KDS Team',
        finn.image || 'finn.jpg'
    );
    removeDuplicateBlogs('FINN');
}

const seedSponsorship = db.prepare(
    `INSERT OR IGNORE INTO sponsorships (dog_name, sponsor_name, sponsor_email, sponsor_phone, sponsor_reason, sponsored_at)
     VALUES (?, ?, ?, ?, ?, ?)`
);
seedSponsorship.run('Yin Yang', 'Daniel James', 'danleejames2026@gmail.com', 'N/A', 'N/A', '2026-06-01');

try {
    db.prepare(`UPDATE sponsorships SET dog_name='Yin Yang', sponsored_at=? WHERE LOWER(REPLACE(dog_name,' ',''))='yinyang'`).run('2026-06-01');
} catch(e) {}

try {
    db.prepare(`DELETE FROM sponsorships WHERE LOWER(REPLACE(dog_name,' ',''))='yinyang' AND dog_name<>'Yin Yang'`).run();
} catch(e) {}

module.exports = db;
