DROP TABLE IF EXISTS resources;
CREATE TABLE resources
(
  id smallint unsigned NOT NULL auto_increment,
  requestDate TIMESTAMP NOT NULL,
  request mediumtext NOT NULL,
  organization text NOT NULL,
  address text NOT NULL,
  comments mediumtext NOT NULL,
  lattitude varchar(255) NOT NULL,
  longitude varchar(255) NOT NULL,
  priority smallint unsigned NOT NULL,
  
  PRIMARY KEY (id)
);
