const express = require("express");
const app = express();
const port = 8005;
const mongoose = require("mongoose");
const products = require("./models/productsSchema");
const DefaultData = require("./defaultdata");
const cors = require("cors")
const router = require("./routes/router");
require('dotenv').config();
const cookieParser = require("cookie-parser");
app.use(express.urlencoded({ extended: true }));


                  // middleware
app.use(express.json());
app.use(cookieParser(""));
app.use(cors())
app.use(router);
                   // ejs
app.set('view engine', 'ejs')
app.set('views','./views')

                 // mongoose
mongoose
  .connect(
    "mongodb+srv://omar:omar@cluster0.f9ottjh.mongodb.net/Amazon?retryWrites=true&w=majority")
  .then((result) => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}`);
    });
  })

  .catch((err) => {
    console.log(err);
  });

                      // auto refrech
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));
  
                         
const connectLivereload = require("connect-livereload");
app.use(connectLivereload());
  
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
}); 


DefaultData();