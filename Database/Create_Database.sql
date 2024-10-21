USE xter;

SET FOREIGN_KEY_CHECKS = 0; -- Desactivation des cles etrangeres pour drop les tables sans soucis

DROP TABLE IF EXISTS message;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS pictures;
DROP TABLE IF EXISTS follows;
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS reactiontypes;
DROP TABLE IF EXISTS reactions;

SET FOREIGN_KEY_CHECKS = 1;  -- Maintenant que les tables sont droppées on peut réactiver les foreign keys

CREATE TABLE pictures (
    id INT AUTO_INCREMENT PRIMARY KEY,
    entity_type ENUM('user', 'message', 'reaction') NOT NULL, -- A FAIRE EVOLUER SI BESOIN
    entity_id INT,
    image_path VARCHAR(255) NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO pictures (entity_type, entity_id, image_path) VALUES ('user', 1, 'https://dentiste-dr-ngo-paris20.fr/wp-content/uploads/2018/05/Autruche-avec-dents.png');


CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    is_admin TINYINT(1) NOT NULL,
    email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    date_inscription TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    picture_id INT
);

INSERT INTO users (id, username, is_admin, email, user_password) VALUES (1, "coco", 1, "coco@lala.s", "1212");
INSERT INTO users (id, username, is_admin, email, user_password) VALUES (2, "bob", 0, "bob@casualuser.com", "0000");

CREATE TABLE follows (
    id INT AUTO_INCREMENT PRIMARY KEY,
    followed_by_id INT NOT NULL,
    following_id INT NOT NULL,
    FOREIGN KEY (followed_by_id) REFERENCES users(id),
    FOREIGN KEY (following_id) REFERENCES users(id)
);

INSERT INTO follows (followed_by_id, following_id) VALUES (1, 2);

CREATE TABLE tags (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tagname VARCHAR(255) NOT NULL
);

INSERT INTO tags (tagname) VALUES ('freebritney');

CREATE TABLE reactiontypes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    reaction_name VARCHAR(31) NOT NULL,
    reaction_value FLOAT NOT NULL,
    icon_path VARCHAR(255)
);

INSERT INTO reactiontypes (reaction_name) VALUES 
    ('Like', 1), ('Dislike', -1), ('Do not care', -1.5);

CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    content VARCHAR(511) NOT NULL,
    date_post TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reactions_id INT,
    picture_id INT,
    parent_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO messages (user_id, content) VALUES (1, "bonjour");

CREATE TABLE tagmessages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    message_id INT NOT NULL,
    tag_id INT NOT NULL,
    FOREIGN KEY (message_id) REFERENCES messages(id),
    FOREIGN KEY (tag_id) REFERENCES tags(id)
);

INSERT INTO tagmessages (message_id, tag_id) VALUES (1, 1);

CREATE TABLE reactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    message_id INT,
    reaction_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (message_id) REFERENCES messages(id),
    FOREIGN KEY (reaction_id) REFERENCES reactions(id)
);

INSERT INTO reactions (user_id, message_id, reaction_id) VALUES (1, 1, 1);
