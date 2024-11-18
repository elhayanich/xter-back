USE xter;

SET FOREIGN_KEY_CHECKS = 0; -- Desactivation des cles etrangeres pour drop les tables sans soucis

DROP TABLE IF EXISTS message;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS picture;
DROP TABLE IF EXISTS follow;
DROP TABLE IF EXISTS tag;
DROP TABLE IF EXISTS reactiontype;
DROP TABLE IF EXISTS reaction;
DROP TABLE IF EXISTS reaction;

DROP TABLE IF EXISTS tagmessage;

SET FOREIGN_KEY_CHECKS = 1;  -- Maintenant que les tables sont droppées on peut réactiver les foreign keys

-- Table utilisateur
-- Table utilisateur
CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    is_admin TINYINT(1) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    date_inscription TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    picture VARCHAR(255)
);

-- Table message
CREATE TABLE message (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    content VARCHAR(511) NOT NULL,
    picture VARCHAR(255),
    date_post TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reactions_id INT,
    parent_id INT,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

-- Table follow
CREATE TABLE follow (
    follower INT,
    followed INT,
    UNIQUE(follower, followed)
   
);

-- Table tag
CREATE TABLE tag (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tagname VARCHAR(255) NOT NULL
);

-- Table reactiontype
CREATE TABLE reactiontype (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(31) NOT NULL,
    rate  INT NULL,
    picture VARCHAR (255) NOT NULL
);

-- Table tagmessage
CREATE TABLE tagmessage (
    message_id INT,
    tag_id INT,
    PRIMARY KEY (message_id, tag_id)
    
);

-- Table reaction
CREATE TABLE reaction (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    message_id INT,
    reaction_id INT,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
   
);





INSERT INTO user (id, username, is_admin, email, user_password) VALUES (1, "coco", 1, "coco@lala.s", "$2b$12$ILi3wTbklsacej3OXuy6P.HpLD50AIj6QTp4oJJgkq9cFGlUO6cKq");
INSERT INTO user (id, username, is_admin, email, user_password) VALUES (2, "bob", 0, "bob@casualuser.com", "$2b$12$ILi3wTbklsacej3OXuy6P.HpLD50AIj6QTp4oJJgkq9cFGlUO6cKq");
INSERT INTO user (id, username, is_admin, email, user_password ) VALUES (3, "lilo", 1, "lilo@lilo.lilo", "azertyazerty1" );
INSERT INTO message (user_id, content) VALUES (1, "bonjour comment ça va les copaings");
INSERT INTO message (user_id, content) VALUES (3, "Nana c'est la vie");
INSERT INTO message (user_id, content) VALUES (3, "Bleu c'est comme le ciel, il pleure");
INSERT INTO message (user_id, content) VALUES (1, "It's more like, u know, something going wrong with me... ");
INSERT INTO message (user_id, content) VALUES (1, "bonjour comment ça va les copaings");

INSERT INTO tag (tagname) VALUES ('freebritney');




INSERT INTO reactiontype (name, rate, picture) VALUES 
    ('Like', 1, 'https://cdn-icons-png.flaticon.com/512/10307/10307920.png'),
    ('pokemon', 5, 'https://dextraneous.blog/wp-content/uploads/2019/09/092.png'),
    ('disgust', -1, 'https://i.pinimg.com/originals/59/42/d9/5942d9add3506de9b7f1a25a278c69c6.png');



INSERT INTO tagmessage (message_id, tag_id) VALUES (1, 1);

INSERT INTO reaction (user_id, message_id, reaction_id) VALUES (1, 1, 1);


SELECT COUNT(*) AS num_messages FROM message;
SELECT COUNT(*) AS num_reactions FROM reactiontype;
SELECT COUNT(*) AS num_users FROM user;

