import { useDispatch, useSelector } from "react-redux"
import { useGetUserId } from "../hooks/useGetUserId";
import { useEffect } from "react";
import { getCartProduct, removeAllFromCart } from "../store/store";
import { Grid, Typography } from "@mui/material";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";
import Total from "./Total";
import { Bottom, StyledGrid } from "./styles";
import { useGlobalContext } from "../context/context";
import { KEY } from "../keys/data"
import { handlePayment, verifyPayment } from "../services/api"







const Cart = () => {

    // payment integration 
    const handleOpenRazorPay = (data) => {
        const options = {
            key: KEY,
            amount: Number(data.amount) * 100,
            currency: data.currency,
            name: "FLIPKART CLONE",
            order_id: data.id,
            handler: async function (response) {
                console.log(response)
                try {
                    await verifyPayment(response)
                    dispatch(removeAllFromCart(userId))
                    console.log("deleted")
                } catch (error) {
                    console.log(error)
                }

            }

        }
        const rzp = new window.Razorpay(options)
        rzp.open();
    }

    const payment = async (amt) => {
        const response = await handlePayment(amt)
        if (response) {
            if (response.data.data.error) {
                console.log(response.data.data.error)
            } else {
                console.log(response.data.data.success)
                handleOpenRazorPay(response.data.data)
            }
        } else {
            console.log("Something went wrong");
        }
    }
    // payment integration 

    const dispatch = useDispatch()
    const userId = useGetUserId()

    const data = useSelector((state) => state.products.cart)

    const { total } = useGlobalContext()


    useEffect(() => {
        if (!userId) {
            console.log("login to add")
        } else {
            dispatch(getCartProduct(userId))
        }
    }, [data, userId, total])


    const handlePay = async () => {
        payment(total)
    }

    return (
        <>
            {
                !userId || data?.length < 1 ? (
                    <EmptyCart />
                ) : (
                    <StyledGrid container >
                        <Grid item lg={7} md={7} sm={12} xs={12} >
                            <Typography sx={{ fontWeight: "600", ml: "0.1rem" }} >Cart ({data?.length})</Typography>
                            {
                                data?.map((item) => (
                                    <CartItem key={item?.id} data={item} />
                                ))
                            }
                            <Bottom>
                                <button onClick={handlePay} >Place order</button>
                            </Bottom>
                        </Grid>
                        <Grid item sm={12} xs={12} lg={5} md={5} >
                            <Total data={data} />
                        </Grid>
                    </StyledGrid>
                )
            }
        </>
    )
}

export default Cart
