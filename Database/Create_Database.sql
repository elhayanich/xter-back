USE xter;

SET FOREIGN_KEY_CHECKS = 0; -- Desactivation des cles etrangeres pour drop les tables sans soucis

DROP TABLE IF EXISTS message;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS picture;
DROP TABLE IF EXISTS follow;
DROP TABLE IF EXISTS tag;
DROP TABLE IF EXISTS reactiontype;
DROP TABLE IF EXISTS reaction;
DROP TABLE IF EXISTS tagmessages;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS pictures;
DROP TABLE IF EXISTS follows;
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS reactiontypes;
DROP TABLE IF EXISTS reactions;

DROP TABLE IF EXISTS tagmessage;

SET FOREIGN_KEY_CHECKS = 1;  -- Maintenant que les tables sont droppées on peut réactiver les foreign keys

--  BEGIN 

--  CREATE PICTURES 


CREATE TABLE picture (
    id INT AUTO_INCREMENT PRIMARY KEY,
    entity_type ENUM('user', 'message', 'reaction') NOT NULL, -- A FAIRE EVOLUER SI BESOIN
    entity_id INT,
    image_path VARCHAR(255) NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO picture (entity_type, entity_id, image_path) VALUES ('user', 1, 'https://dentiste-dr-ngo-paris20.fr/wp-content/uploads/2018/05/Autruche-avec-dents.png');


-- USERS 


CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    is_admin TINYINT(1) NOT NULL,
    email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    date_inscription TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    picture_id INT
);

INSERT INTO user (id, username, is_admin, email, user_password) VALUES (1, "coco", 1, "coco@lala.s", "1212");
INSERT INTO user (id, username, is_admin, email, user_password) VALUES (2, "bob", 0, "bob@casualuser.com", "0000");


-- FOLLOW 


CREATE TABLE follow (
    id INT AUTO_INCREMENT PRIMARY KEY,
    followed_by_id INT NOT NULL,
    following_id INT NOT NULL,
    FOREIGN KEY (followed_by_id) REFERENCES user(id),
    FOREIGN KEY (following_id) REFERENCES user(id)
);

INSERT INTO follow (followed_by_id, following_id) VALUES (1, 2);


-- TAG 


CREATE TABLE tag (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tagname VARCHAR(255) NOT NULL,
    date_post TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO tag (tagname) VALUES ('freebritney');


-- REACTIONTYPES 


CREATE TABLE reactiontype (
    id INT AUTO_INCREMENT PRIMARY KEY,
    reaction_name VARCHAR(31) NOT NULL,
    reaction_value FLOAT NOT NULL,
    icon_path VARCHAR(255)
);

INSERT INTO reactiontype (reaction_name, reaction_value) VALUES 
    ('Like', 1), ('Dislike', -1), ('Do not care', -1.5);


-- MESSAGES 


CREATE TABLE message (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    content VARCHAR(511) NOT NULL,
    date_post TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reactions_id INT,
    picture_id INT,
    parent_id INT,
    FOREIGN KEY (user_id) REFERENCES user(id)
);

INSERT INTO message (user_id, content) VALUES (1, "bonjour comment ça va les copaings");


-- TAG MESSAGES 
CREATE TABLE tagmessage (
    message_id INT,
    tag_id INT,
    PRIMARY KEY (message_id, tag_id),
    FOREIGN KEY (message_id) REFERENCES message(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tag(id) ON DELETE CASCADE
);


INSERT INTO tagmessage (message_id, tag_id) VALUES (1, 1);


-- REACTIONS 


CREATE TABLE reaction (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    message_id INT,
    reaction_id INT,
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (message_id) REFERENCES message(id),
    FOREIGN KEY (reaction_id) REFERENCES reaction(id)
);

INSERT INTO reaction (user_id, message_id, reaction_id) VALUES (1, 1, 1);


