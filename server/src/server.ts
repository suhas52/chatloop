const express = require('express');
const app = express();
require('dotenv').config()
const cors = require('cors');
const PORT:number = Number(process.env.EXPRESS_PORT ?? 3000);

app.use(cors());
app.use(express.json());



app.listen(PORT, () => {
    console.log("The server was started on port: ", PORT)
})