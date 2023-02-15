const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDatabase = require("./config/database")

const app = express();
const env = require("dotenv");

// routes 
const defaultroutes = require("./routes/index");
const userRoutes = require("./routes/user")
const adminRoutes = require("./routes/admin/auth")
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product")
const cartRoutes = require("./routes/cart")
const addressRoutes = require("./routes/address")
const orderRoutes = require("./routes/order")

// env config
env.config();


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())

// Connecting to database
connectDatabase();


app.use("/api", defaultroutes)
app.use("/api", userRoutes)
app.use("/api", adminRoutes)
app.use("/api", categoryRoutes)
app.use("/api", productRoutes)
app.use("/api", cartRoutes)
app.use("/api", addressRoutes)
app.use("/api", orderRoutes)


const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
})