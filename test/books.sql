USE bookstore;

DROP TABLE IF EXISTS books;
CREATE TABLE books
(     
  id int unsigned NOT NULL auto_increment, #Unique ID for the record
  title varchar(255) NOT NULL, #full title of the book
  author varchar(255) NOT NULL, #author of the bok
  price decimal(10, 2) NOT NULL, #price of the book

  PRIMARY KEY (id)
);
