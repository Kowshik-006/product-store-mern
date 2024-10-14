// "type" : "module" in package.json is necessary to use ES6 import syntax
import express from 'express';
import dotenv from "dotenv"
import connectDB from './config/db.js';
import productRouter from './routes/productRoutes.js';
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());

app.use("/api/products", productRouter);

// Deployment code
import path from 'path'
const __dirname = path.resolve();
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/frontend/dist' )));

    //anything except /api/products will be redirected to index.html
    app.get('*', (req,res)=>{
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
    })
}
// ...............

app.listen(PORT,()=>{
    connectDB();
    console.log(`Server started at http://localhost:${PORT}`);
});
