// import { useDispatch, useSelector } from "react-redux"
// // import { useGetUserId } from "../../hooks/useGetUserId";
// import { useEffect } from "react";
// // import { getCartProduct, removeAllFromCart } from "../../store/store";
// import { Grid, Typography } from "@mui/material";
// // import CartItem from "./CartItem";
// // import EmptyCart from "./EmptyCart";
// // import Total from "./Total";
// // import { Bottom, StyledGrid } from "./styles";
// // import { useGlobalContext } from "../../context/context";
// // import { KEY } from "../../keys/data"
// // import { handlePayment, verifyPayment } from "../../services/api"







// const Cart = () => {

//     // payment integration 
//     const handleOpenRazorPay = (data) => {
//         const options = {
            
//             amount: Number(data.amount) * 100,
//             currency: data.currency,
//             name: "FLIPKART CLONE",
//             order_id: data.id,
//             handler: async function (response) {
//                 console.log(response)
//                 try {
//                     await (response)
//                     console.log("deleted")
//                 } catch (error) {
//                     console.log(error)
//                 }

//             }

//         }
//         const rzp = new window.Razorpay(options)
//         rzp.open();
//     }

//     const payment = async (amt) => {
//         const response = await (amt)
//         if (response) {
//             if (response.data.data.error) {
//                 console.log(response.data.data.error)
//             } else {
//                 console.log(response.data.data.success)
//                 handleOpenRazorPay(response.data.data)
//             }
//         } else {
//             console.log("Something went wrong");
//         }
//     }
//     // payment integration 

//     const dispatch = useDispatch()
//     // const userId = useGetUserId()

//     const data = useSelector((state) => state.products.cart)

//     // const { total } = useGlobalContext()


//     // useEffect(() => {
//         // if  {
//         //     console.log("login to add")
//         // } else {
//         //     dispatch(getCartProduct(userId))
//         // }
//     // }, [data, userId, total])


//     const handlePay = async () => {
//         payment(total)
//     }

//     return (
//         <>
//             {
//                 // !userId || data?.length < 1 ? (
//                 //     // <EmptyCart />
//                 // ) : (
//                     <div container >
//                         <div item lg={7} md={7} sm={12} xs={12} >
                            
                            
//                         </div>
                        
                        
//                     </div>
                
//             }
//         </>
//     )
// }

// export default Cart
