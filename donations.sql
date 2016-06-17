DROP TABLE IF EXISTS donations;
CREATE TABLE donations
(
  id smallint unsigned NOT NULL auto_increment,
  requestDate TIMESTAMP NOT NULL,
  organization text NOT NULL,
  name text NOT NULL,
  requestId smallint unsigned NOT NULL, 
  /* for now, the request will be linked by request id */ 
  
  PRIMARY KEY (id)
);
