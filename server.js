const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config({ path: "config.env" });

const db = require("./database/main");

const app = express();

app.use(express.json());
app.use(cors({
    origin: process.env.cors_origin,
    credentials: true
}));

app.use((req, res, next) => {
    console.log(`\n ----------[ ${new Date().toLocaleTimeString()} - ${req.url} ]---------- \n`);
    res.setHeader("Cache-Control", "no-store");
    next();
});

app.get("/", (req, res) => {
    res.send("Hello World !!!");
});

app.get("/data", async (req, res) => {
    const data = await db.query(`select email, code from users;`);
    res.send(data.rows);
});

app.listen(port = process.env.app_port, async () => {
    console.log(`1 - server listening on port ${port}`);
    try {
        await db.connect();
        console.log("2 - connection to the database was successful");
    } catch (error) {
        console.log(error);
    }
});