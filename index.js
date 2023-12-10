const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.SERVER_PORT;

const user_route = require("./routers/users");
const product_route = require("./routers/products");

//MIDDLEWARE
app.use(express.json());

//API ROUTES
app.use("/api/users", user_route);
app.use("/api/products", product_route);

app.get("/", (req, res) => {
  res.send("Hello World! subhash chandar products");
});

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
