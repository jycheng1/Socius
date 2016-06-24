DROP TABLE IF EXISTS resources;
CREATE TABLE resources
(
  id smallint unsigned NOT NULL auto_increment,
  requestDate TIMESTAMP NOT NULL,
  request1 text NOT NULL,
  request2 text NOT NULL,
  request3 text NOT NULL,
  why mediumtext NOT NULL,
  organization text NOT NULL,
  address text NOT NULL,
  comments mediumtext NOT NULL,
  lattitude varchar(255) NOT NULL,
  longitude varchar(255) NOT NULL,
  priority smallint unsigned NOT NULL,
  isDeleted char(2) NOT NULL DEFAULT 'N',
  
  PRIMARY KEY (id)
);
