import {createPool} from "mysql";


const pool = createPool({
    host: "localhost",
    port : "3306",
    user: "root",
    password : "",
    database : "hello_login",
    connectionLimit: 100,
})

pool.on("connection",(connection) => {
    console.log("Database connected Successfully")
})

export {pool}