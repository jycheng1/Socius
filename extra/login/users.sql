DROP TABLE IF EXISTS users;
CREATE TABLE users
(
  user_id INT(5) NOT NULL AUTO_INCREMENT,
  username VARCHAR(25) NOT NULL,
  email VARCHAR(35) NOT NULL,
  password VARCHAR(50) NOT NULL,
  UNIQUE(email),

  PRIMARY KEY (user_id)
);
