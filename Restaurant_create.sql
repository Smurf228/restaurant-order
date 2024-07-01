
CREATE SCHEMA IF NOT EXISTS 'restaurant';

CREATE TABLE IF NOT EXISTS Client (
                        _id integer UNSIGNED  NOT NULL AUTO_INCREMENT ,
                        first_name varchar(20)  NOT NULL,
                        last_name varchar(20)  NOT NULL,
                        emeil varchar(25)  NULL,
                        phone_number varchar(15)  NOT NULL,
                        PRIMARY KEY (`_id`),
                        UNIQUE INDEX `client_id_UNIQUE` (`_id`)
) ;
CREATE TABLE IF NOT EXISTS Oder (
                      _id integer UNSIGNED  NOT NULL AUTO_INCREMENT,
                      oder_number integer  NOT NULL,
                      oder_time time NOT NULL,
                      adres varchar(20)  NOT NULL,
                      PRIMARY KEY (`_id`),
                      UNIQUE INDEX `o_id_UNIQUE` (`_id`)
) ;
-- Table: Dish
CREATE TABLE IF NOT EXISTS Dish (
                      _id integer UNSIGNED  NOT NULL AUTO_INCREMENT,
                      Client__id integer UNSIGNED  NOT NULL,
                      Oder__id integer UNSIGNED  NOT NULL,
                      title varchar(25)  NOT NULL,
                      weight varchar(10)  NULL,
                      price integer  NOT NULL,
                      PRIMARY KEY (`_id`),
                      UNIQUE INDEX `d_id_UNIQUE` (`_id`),
                      CONSTRAINT client_fk FOREIGN KEY (client__id) REFERENCES `Client` (`_id`),
                      CONSTRAINT oder_fk FOREIGN KEY (oder__id) REFERENCES `Oder` (`_id`)
) ;

INSERT IGNORE INTO client(_id, first_name, last_name, emeil, phone_number)
values(1, 'David', 'Hur', 'qwerty@rtt.pl', '654222456'),
      (2, 'Sara', 'Konor','', '555111222');

INSERT IGNORE INTO oder(_id, oder_number, oder_time, adres)
values(1, 1, '2022-12-24 13:25:00', 'krs 25'),
      (2, 2,  '2022-12-25 15:55:00', 'ry 14');

INSERT IGNORE INTO dish(_id, client__id, oder__id, title, weight, price)
values(1, 1, 1, 'Zupa', '300g', 25),
      (2, 1, 1, 'Salatka', '', 20);



