import express, { json, request, urlencoded } from "express";
import { createConnection } from "mysql2/promise";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
const port = 3000;
let connection: any;

dotenv.config();
connectServer();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

async function connectServer() {
  connection = await createConnection({
    host: process.env.DB_HOST, // 'localhost',
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
  console.log("connection successful?", connection != null);
}

app.get("/", randomHandler);
async function randomHandler(req: any, res: any) {
  if (connection == null) return;

  let [result] = await connection.query(
    "SELECT * FROM `test` Order by rand() Limit 1"
  );
  res.send(result);
}

app.get("/test", testHandler);
async function testHandler(req: any, res: any) {
  res.send({ aaa: "aaaa", bbb: "bb" });
}
