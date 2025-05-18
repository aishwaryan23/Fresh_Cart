import express from 'express';
import {isAuth, login, logout, register } from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';

const userRoute = express.Router();

userRoute.post('/register', register)
userRoute.post('/login',login);

userRoute.get('/is-auth',authUser ,isAuth);
userRoute.get('/logout',authUser ,logout);



export default userRoute;