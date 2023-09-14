import { Surreal } from 'surrealdb.js';

const db = new Surreal();
export default async function getSurreal  () {
    await db.connect('http://127.0.0.1:8000/rpc', {
        // Set the namespace and database for the connection
        ns: 'test',
        db: 'test',

        // Set the authentication details for the connection
        auth: {
            NS: 'test',
            DB: 'test',
           
            user: 'root',
            pass: 'root',
        },
    });
return db;


}