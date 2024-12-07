const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
dotenv.config()
const authRouter = require('./routes/auth/auth-routh')
const adminProductRouter = require("./routes/admin/product-routs")
mongoose.connect(process.env.MONGO_DB_URI).then(()=>{
    console.log("mongodb connect")
}).catch((error)=>{
console.log(error)
})

const app = express();
app.use(cors({
    origin: 'http://localhost:5173', // Corrected URL
    methods: ['GET', 'POST', 'DELETE', 'PUT'], // Allowed HTTP methods
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'Cache-Control',
        'Expires',
        'Pragma',
    ], // Allowed request headers
    credentials: true, // Allows cookies and other credentials
}));

app.use(cookieParser())
app.use(express.json())
app.use('/api/auth/',authRouter)
app.use('/api/admin/products',adminProductRouter)
const Port = process.env.PORT || 5000
app.listen(Port,()=>{
    console.log(`server is running on port ${Port}`)
})