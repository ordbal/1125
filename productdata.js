import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./productdata.sqlite");

const initializeDB = async () => {
    await dbRun("CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, price REAL NOT NULL");

    const products = [
        { name: "prdouct01", price: "1000" },
        { name: "prodeuct02", price: "2000" },
        { name: "product03", price: "3000" },
    ];

    for (const product of products) {
        await dbRun("INSERT INTO products (name, price) VALUES (?, ?)", [product.name, product.price]);
    }
};

function dbQuery(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

function dbRun(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            if (err) reject(err);
            else resolve(this);
        });
    });
}

export { db, dbQuery, dbRun, initializeDB };
