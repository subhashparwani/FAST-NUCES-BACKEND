const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.SERVER_PORT;

const users_route = require("./routers/users");
const products_route = require("./routers/products");

app.use("/api/users", users_route);
app.use("/api/products", products_route);

app.get("/", (req, res) => {
  res.send("Hello World! subhash chandar products");
});

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
