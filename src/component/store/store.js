import { createSlice, createAsyncThunk, configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import {BACKEND_URL} from '../keys/data'


const URL = BACKEND_URL
// const URL = "http://localhost:8000"

const initialState = {
    allProducts: [],
    product: {},
    cart: [],
}


export const getAllProducts = createAsyncThunk("products/all", async () => {
    try {
        const { data } = await axios.get(`${URL}/products`);
        return data;
    } catch (error) {
        console.log(error, 'error while calling getAllProducts api');
    }
})

export const getProduct = createAsyncThunk("products/singleProduct", async (id) => {
    try {
        const { data } = await axios.get(`${URL}/products/${id}`);
        return data;
    } catch (error) {
        console.log(error, "error while calling getProduct api")
    }
})

export const getCartProduct = createAsyncThunk("products/cart", async (userId) => {
    try {
        const { data: { cart } } = await axios.get(`${URL}/user/cart/${userId}`);
        return cart
    } catch (error) {
        console.log("error while calling getCartProduct api");
    }
})

export const deleteItemFromCart = createAsyncThunk("products/remove", async ({ userId, itemTitle }) => {
    try {
        const { data: { cart } } = await axios.put(`${URL}/user`, { userId, itemTitle })
        return cart
    } catch (error) {
        console.log(error, "error while calling deleteItemFromCart api");
    }
})

export const removeAllFromCart = createAsyncThunk("products/removeAll", async (id) => {
    try {
        const userID = { userId: id }
        const { data: { cart } } = await axios.put(`${URL}/user/removeAll`, userID)
        console.log(cart, "removeAllFromCart")
        return cart
    } catch (error) {
        console.log(error, "error while calling removeAllFromCart api");
    }
})

// for all the products 
const ProductSlice = createSlice({
    name: "products",
    initialState,
    extraReducers: (builders) => {
        builders.addCase(getAllProducts.fulfilled, (state, action) => {
            state.allProducts = action.payload;
        });
        builders.addCase(getProduct.fulfilled, (state, action) => {
            state.product = action.payload
        });
        builders.addCase(getCartProduct.fulfilled, (state, action) => {
            state.cart = action.payload
        });
        builders.addCase(deleteItemFromCart.fulfilled, (state, action) => {
            state.cart = action.payload
        });
        builders.addCase(removeAllFromCart.fulfilled, (state, action) => {
            state.cart = action.payload
        })
    }
})

//for login signup modal open close functionalities
const modalSlice = createSlice({
    name: "modal",
    initialState: {
        isOpen: false,
    },
    reducers: {
        openModal: (state) => {
            state.isOpen = true;
        },
        closeModal: (state) => {
            state.isOpen = false;
        }
    }
})



export const store = configureStore({
    reducer: {
        products: ProductSlice.reducer,
        modal: modalSlice.reducer,
    }
})

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;