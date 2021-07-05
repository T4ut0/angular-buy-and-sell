import mysql from 'mysql';

let connection;

export const db = {
    connect: () => {
        connection = mysql.createConnection({
            host: process.env.DB_HOST, //34.65.219.225
            user: process.env.DB_USER,// hapi-server
            password: process.env.DB_PASS, //abc123!
            database: process.env.DB_NAME, // buy-and-sell
            socketPath: process.env.DB_SOCKET,
        });
        connection.connect();
    },
    query: (queryString, escapedValues) =>
        new Promise((resolve, reject) => {
            connection.query(queryString, escapedValues, (error, results, fields) => {
                if (error) reject(error);
                resolve({ results, fields });
            })
        }),
    end: () => connection.end(),
}