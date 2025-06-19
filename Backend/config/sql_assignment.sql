
CREATE TABLE IF NOT EXISTS users__mysql (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL
);


CREATE TABLE IF NOT EXISTS moments__mysql (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    image_url VARCHAR(255),
    video_url VARCHAR(255),
    created_by INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users__mysql(id) ON DELETE SET NULL
);


INSERT INTO users__mysql (username, email, password) VALUES 
('Rohit', 'rohit@gully.com', 'rohit123'),
('Neha', 'neha@gully.com', 'neha123'),
('Aman', 'aman@gully.com', 'aman123');

-- SEED MOMENTS
INSERT INTO moments__mysql (title, location, description, image_url, video_url, created_by) VALUES
('Legendary Sixer', 'Gully 7', 'Rohit smashed the ball onto a moving rickshaw.', 'sixer.jpg', 'sixer.mp4', 1),
('Slippery Dive', 'Gully 4', 'Neha slipped while diving and still caught the ball.', 'dive.jpg', 'dive.mp4', 2),
('Unexpected Hit', 'Gully 1', 'Aman hit the ball into someone’s lunch box.', 'hit.jpg', 'hit.mp4', 3);
