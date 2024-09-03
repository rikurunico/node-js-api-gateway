-- Seeder for users table
INSERT INTO users (username, password, role) VALUES
    ('admin', 'adminpassword', 'admin'),
    ('user1', 'user1password', 'user'),
    ('user2', 'user2password', 'user')
ON CONFLICT (username) DO NOTHING;

-- Seeder for items table
INSERT INTO items (name, description, created_by) VALUES
    ('Item 1', 'Description for item 1', 1),
    ('Item 2', 'Description for item 2', 2),
    ('Item 3', 'Description for item 3', 1)
ON CONFLICT (name) DO NOTHING;
