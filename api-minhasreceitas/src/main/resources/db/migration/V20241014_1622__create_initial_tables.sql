------------------------------- CREATE SEQUENCES -----------------------------------
CREATE SEQUENCE user_account_id_seq
    INCREMENT 1
    START 5
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

-------------------------------- CREATING TABLES -----------------------------------
CREATE TABLE user_account(
    id INTEGER PRIMARY KEY DEFAULT nextval('user_account_id_seq'),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    role SMALLINT NOT NULL,
    image TEXT
);

CREATE TABLE category(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE unit(
    id SERIAL PRIMARY KEY,
    type VARCHAR(100) NOT NULL
);

CREATE TABLE product(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    user_id INTEGER NOT NULL,
    CONSTRAINT user_id_FK FOREIGN KEY (user_id) REFERENCES user_account (id)
);

CREATE TABLE recipe(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    hint VARCHAR(200),
    image TEXT,
    preparation_mode TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    CONSTRAINT user_id_FK FOREIGN KEY (user_id) REFERENCES user_account (id),
    CONSTRAINT category_id_FK FOREIGN KEY (category_id) REFERENCES category (id)
);

CREATE TABLE ingredient(
   id SERIAL PRIMARY KEY,
   recipe_id INTEGER,
   product_id INTEGER NOT NULL,
   unit_id INTEGER,
   amount VARCHAR(100),
   CONSTRAINT recipe_id_FK FOREIGN KEY (recipe_id) REFERENCES recipe (id),
   CONSTRAINT product_id_FK FOREIGN KEY (product_id) REFERENCES product (id),
   CONSTRAINT unit_id_FK FOREIGN KEY (unit_id) REFERENCES unit (id)
);

--------------------------------- INSERT VALUES ------------------------------------

INSERT INTO user_account (id, name, email, password, role, image)
VALUES (1, 'Paulo Leite', 'paulo.sistemas@live.com', '$2a$10$0nNY7kBMffsOPPY8pHMKGOBl4tT5zPe9P2m1m9LSfrGW4o988nvde', 1, null);

INSERT INTO category (id, name)
VALUES
    (1, 'Bebidas'),
    (2, 'Bolos e Tortas'),
    (3, 'Drinks'),
    (4, 'Refeições'),
    (5, 'Sobremesas');

INSERT INTO unit (id, type)
VALUES
    (1, 'Colher(s) de Chá'),
    (2, 'Colher(s) de Sopa'),
    (3, 'Grama(s)'),
    (4, 'Kg'),
    (5, 'Lata(s)'),
    (6, 'Litro(s)'),
    (7, 'ml'),
    (8, 'Unidade(s)'),
    (9, 'Xícara(s)');
