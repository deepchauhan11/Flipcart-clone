/* eslint-disable react/prop-types */
import { Box, Typography } from "@mui/material"
import { TotalContainer } from "./styles"
import { useEffect, useState } from "react"
import { useGlobalContext } from "../../context/context"

const Total = ({ data }) => {

    const [price, setPrice] = useState(0)
    const [discount, setDiscount] = useState(0)

    const { total, setTotal } = useGlobalContext()


    useEffect(() => {
        totalAmount()
    }, [data, total])

    const totalAmount = () => {
        let price = 0, discount = 0;

        data?.map((item) => {
            return (
                price += item?.price?.mrp,
                discount += (item?.price?.mrp - item?.price?.cost)
            )
        })
        setPrice(price);
        setDiscount(discount)
        setTotal(price - discount + 50)
    }



    return (
        <>
            <TotalContainer>
                <Typography>PRICE DETAILS</Typography>
                <Box>
                    <Typography>Price&nbsp;({data?.length} item)&nbsp;&nbsp;
                        <span>₹{price}</span>
                    </Typography>
                    <Typography>Discount&nbsp;&nbsp;
                        <span>-₹{discount}</span>
                    </Typography>
                    <Typography>Delivery charges&nbsp;&nbsp;
                        <span>₹50</span>
                    </Typography>
                    <Typography variant="h6">
                        Total Amount&nbsp;&nbsp;
                        <span>₹{total}</span>
                    </Typography>
                    <Typography>You will save ₹{discount - 50} on this order</Typography>
                </Box>
            </TotalContainer>
        </>
    )
}

export default Total
