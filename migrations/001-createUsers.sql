-- Up
CREATE TABLE Users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT,
    password TEXT
);

INSERT INTO Users (email, password) values ('ad@yahoo.com', 'PalletTown');

-- Down
DROP TABLE Users;