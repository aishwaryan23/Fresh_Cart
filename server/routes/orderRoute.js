import express from "express";
import { authUser } from "../middlewares/authUser.js";
import { getAllOrders, getUseOrders, placeOrderCOD, placeOrderStripe } from "../controllers/orderController.js";
import authSeller from "../middlewares/authSeller.js";

const orderRouter = express.Router();
orderRouter.post('/cod',authUser,placeOrderCOD);
orderRouter.get('/user',authUser,getUseOrders);
orderRouter.get('/seller',authSeller,getAllOrders);
orderRouter.post('/stripe',authUser,placeOrderStripe);

export default orderRouter;