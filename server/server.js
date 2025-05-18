import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/db.js';
import 'dotenv/config';
import userRoute from './routes/userRoute.js';
import sellerRouter from './routes/sellerRoute.js';
import connectCloudinary from './configs/cloudinary.js';
import productRouter from './routes/productRoute.js';
import cartRoute from './routes/cartRoute.js';
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/orderRoute.js';
import { stripeWebhooks } from './controllers/orderController.js';

const app = express();
const port = process.env.PORT || 4000;

await connectDB()
await connectCloudinary()


// Alloow multiple origins
const allowedOrigins = ['http://localhost:5173','https://fresh-cart-2ers7vk1y-n-aishwaryas-projects.vercel.app']


app.post('/stripe',express.raw({type:'application/json'}),stripeWebhooks)

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigins, credentials: true}));

app.get('/',(req, res) => res.send("API is working"));
app.use('/api/user', userRoute)
app.use('/api/seller', sellerRouter);
app.use('/api/product', productRouter)
app.use('/api/cart', cartRoute)
app.use('/api/address', addressRouter)
app.use('/api/order', orderRouter)

app.listen(port,() =>{
    console.log(`Server is running on http://localhost:${port}`);
})
