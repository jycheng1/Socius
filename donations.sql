DROP TABLE IF EXISTS donations;
CREATE TABLE donations
(
  id smallint unsigned NOT NULL auto_increment,
  donationDate TIMESTAMP NOT NULL,
  request text NOT NULL,
  quantity int NOT NULL,
  
  PRIMARY KEY (id)
);
