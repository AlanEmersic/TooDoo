const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const mysql = require("promise-mysql");
const config = require("./config");
const pool = mysql.createPool(config.pool);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

const userRouter = require("./routes/users")(express, pool, jwt, config.secret);
const listRouter = require("./routes/lists")(express, pool, jwt, config.secret);
const todoRouter = require("./routes/todos")(express, pool, jwt, config.secret);

app.use("/api/users", userRouter);
app.use("/api/lists", listRouter);
app.use("/api/todos", todoRouter);

app.listen(config.port);