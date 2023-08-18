const express = require('express')
const bodyParser = require("body-parser");
const morgan = require("morgan");
const Router = require("./src/router/index");
const cors = require("cors");



const port = 3000;
const app = express()

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
  }


app.use(cors(corsOptions))
// app.use('/img', express.static('./tmp'))
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(Router);


app.get('/', (req, res) => {
    res.status(200).json({ status: 200, message: "server running"});
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });