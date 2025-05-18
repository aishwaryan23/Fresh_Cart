import { createContext, useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
export const AppContext = createContext();
import { toast } from "react-hot-toast";
import { useEffect } from "react"; 
import axios from 'axios';


axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContextProvider = ({ children }) => {

    const currency = import.meta.env.VITE_CURRENCY ;
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const[isSeller,setIsSeller] = useState(false);
    const[showUserLogin,setShowUserLogin] = useState(false);
    const[products,setProducts] = useState([]);
    const [cartItems,setCartItems] = useState({});
    const [searchQuery,setsearchQuery] = useState({});

    //Fetch seller status
    const fetchSeller = async() =>{
        try{
            const {data} = await axios.get("/api/seller/is-auth");
            if(data.success){
                setIsSeller(true)
            }else{
                setIsSeller(false);
            }
            
        }catch(error){
            setIsSeller(false);
        }
    }
    //Fetch user Auth status, user data and cart items
    const fetchUser = async ()=>{
        try {
            const {data} = await axios.get('/api/user/is-auth');
            if(data.success){
                setUser(data.user);
                setCartItems(data.user.cartItems);
            }
        } catch (error) {
            setUser(null);
        }
    }
    //fetch all products
    const fetchProducts = async () => {
        try {
            const { data } = await axios.get('/api/product/list');
            if(data.success){
                setProducts(data.products);
            }else{
                toast.error(data.message);
            }
        } catch (error) {
           toast.error(error.message); 
        }
    }

    //add product to cart
    const addToCart = (itemId)=>{
        let cartdata = structuredClone(cartItems);
        if(cartdata[itemId]){
            cartdata[itemId]+=1;
        }else{
            cartdata[itemId]=1;
        }
        setCartItems(cartdata);
        toast.success("Added to Cart");
    }

    //update cart item quantity

    const UpdateCartItem = (itemId,quantity) =>{
        let cartdata = structuredClone(cartItems);
        cartdata[itemId] = quantity;
        setCartItems(cartdata);
        toast.success("Cart Updated");
    }

    //remove product from cart
    const removeFromCart = (itemId) => {
        let cartdata = structuredClone(cartItems);
        if(cartdata[itemId]){
            cartdata[itemId] -= 1;
            if(cartdata[itemId] === 0){
                delete cartdata[itemId];
            }
        }        
        toast.success("Removed from Cart");
        setCartItems(cartdata);
    }
    //get cart item count

    const getCartCount = () =>{
        let totalCount = 0;
        for(const item in cartItems){
            totalCount += cartItems[item];
        }
        return totalCount;
    }
    //get cart total price
    const getCartTotal = () =>{
        let totalPrice = 0;
        for(const item in cartItems){
            let itemInfo = products.find((product)=>product._id ===item);
            if(cartItems[item] > 0){
                totalPrice += cartItems[item] * itemInfo.offerPrice;
            }
        }
        return Math.floor(totalPrice * 100)/100;
    }

    useEffect(() => {
        fetchSeller()
        fetchProducts()
        fetchUser();

    },[])

    //update database cart items
    useEffect(()=>{
        const updateCart = async()=>{
            try {
                const {data} = await axios.post('/api/cart/update',{cartItems});
                if(!data.success){
                    toast.error(data.message);
                }
            }catch(error){
                toast.error(error.message);
            }
        
        }
        if(user){
            updateCart();
        }
    },[cartItems])
    const value = {setCartItems,navigate,user,setUser,setIsSeller,isSeller,showUserLogin,setShowUserLogin,products,currency,addToCart,UpdateCartItem,removeFromCart,cartItems,searchQuery,setsearchQuery,getCartCount,getCartTotal,axios,fetchProducts};

    return <AppContext.Provider value={value}>
            {children}
    </AppContext.Provider>;
}

export const useAppContext = () => {
    return useContext(AppContext);
}