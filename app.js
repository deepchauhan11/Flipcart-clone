import express from 'express';
import DefaultData from './defaultdata';
const cors = require("cors")
const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(cors())
const PORT = 5000;





app.listen(PORT, ()=>
    console.log(`Server Started on Port ${PORT}`)
)
DefaultData();