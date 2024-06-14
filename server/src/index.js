const express = require('express')
const routes = require('./routes/index');
const connectDB = require('./db/mongodb');

const app = express()
var cors = require('cors')

app.use(cors())
app.use(express.json());

app.use('/api/v1', routes);
connectDB();

app.listen(8000, () => {
    console.log("server started at port 8000");
})