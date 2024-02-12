const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');

async function setup() {
    const db = await sqlite.open({
        filename: './mydb.sqlite',
        driver: sqlite3.Database
    });
    await db.migrate({force: 'last'});

    const users = await db.all('SELECT * FROM users');
    console.log(users);
}

setup();