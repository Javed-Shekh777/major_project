require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require("http");
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const router = require('./routes');
const bodyParser = require('body-parser');
const { Server } = require("socket.io");
const path = require('path');




const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    // credentials : true,
}));


app.get("/", (req, res) => {
    res.send("Ecommerce API is running.....");
});




app.use(express.json());
app.use("/invoices", express.static(path.join(__dirname, "invoices")));
app.use(cookieParser());
app.use(bodyParser.json({ limit: '20mb' }))
app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }))

app.use(express.static(path.join(__dirname, "client/build")));
app.use("/api", router);





const PORT = process.env.PORT || 8080;


connectDB().then(() => {
    server.listen(PORT, () => {
        console.log("connnect to DB")
        console.log("Server is running " + PORT)
    })
}).catch((err) => {
    console.log("Error connecting", err)

});




