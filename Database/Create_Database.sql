CONNECT xter;

CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    content INT NOT NULL,
    date_post TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reactions_id INT,
    picture_id INT,
    parent_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (reactions_id) REFERENCES reactions(id),
    FOREIGN KEY (picture_id) REFERENCES pictures(id),
    FOREIGN KEY (parent_id) REFERENCES messages(id),
);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL
    is_admin BOOLEAN NOT NULL,
    email INT NOT NULL,
    date_inscription TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_password VARCHAR(255) NOT NULL,
    picture_id INT,
    follow_id INT,
    FOREIGN KEY (picture_id) REFERENCES pictures(id),
    FOREIGN KEY (follow_id) REFERENCES messages(id), 
)