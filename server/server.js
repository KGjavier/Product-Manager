const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;

require("./config/mongoose.config");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const productmanagerRoutes = require("./routes/productmanager.routes");
productmanagerRoutes(app);

app.listen(8000, () => console.log("The server is all fired up on port 8000"));
