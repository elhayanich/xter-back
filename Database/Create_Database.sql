CONNECT xter;


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


