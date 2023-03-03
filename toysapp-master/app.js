import express from 'express';
import categoryRouter from './routes/category.route.js';
import productRouter from './routes/product.route.js';
import userRouter from './routes/user.route.js';
import adminRouter from './routes/admin.route.js';
import path from 'path';
import {fileURLToPath} from 'url';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import session from 'express-session';
import cartRouter from './routes/cart.route.js';
import orderRouter from './routes/order.route.js';
const app = express();

app.set("view engine","ejs");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicPath = path.join(__dirname,'public');
app.use(express.static(publicPath));
app.use(session({secret: 'dadereccvdreeer'}));


mongoose.set('strictQuery', true);

//  This mongodb database only accessable by Parul Sahu Don't try to use this 
 
mongoose.connect('mongodb+srv://Parul:A6CdObGzYUwHML8m@toydb.ebe6wep.mongodb.net/?retryWrites=true&w=majority',err=>{
    if(err)
     console.log(err);
    else{
        console.log("mongo atlas connected....");
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));
        
        app.use("/",adminRouter);
          
        app.use("/category",categoryRouter);
        app.use("/product",productRouter);
        app.use("/user",userRouter);
        app.use("/admin",adminRouter);
        app.use("/cart",cartRouter);
        app.use("/order",orderRouter);
        app.listen(3000,()=>{
            console.log("server started....");
        });
    } 
});
