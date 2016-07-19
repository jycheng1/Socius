DROP TABLE IF EXISTS reqAgg;
CREATE TABLE reqAgg
(
  id smallint unsigned NOT NULL auto_increment,
  requestDate TIMESTAMP NOT NULL,
  request mediumtext NOT NULL,
  quantity int NOT NULL,
  
  PRIMARY KEY (id)
);
