require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./database');

const { userRouter } = require('./routes/user');
const { urlrouter } = require('./routes/url');



const app = express();  
const port = process.env.LOCAL_PORT || 8080;

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

app.use(userRouter);
app.use(urlrouter)
//1660918125328
const data = new Date()
console.log(data.getDate())
connectDB().then(()=>{
    app.listen(port, ()=> {
        console.log(`Server is running on port ${port}`);
    })
}).catch((err)=>{
    console.log(err);
});