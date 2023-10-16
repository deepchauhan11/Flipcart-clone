/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Box, Button, Divider, Typography } from "@mui/material"
import { Bottom, Card, CardContent, PriceContent, SmallText } from "./styles"
import { useGetUserId } from "../../hooks/useGetUserId"
import { useDispatch } from "react-redux";
import { deleteItemFromCart } from "../../store/store";
import { toast } from "react-toastify";

const CartItem = ({ data }) => {

    const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png';

    const userID = useGetUserId();

    const dispatch = useDispatch()

    const trimTitle = (text) => {
        return text.slice(0, 50) + "..."
    }

    const handleDelete = () => {
        dispatch(deleteItemFromCart({ userId: userID, itemTitle: data.title.shortTitle }))
        if (dispatch) {
            toast.success("Item removed")
        } else {
            toast.error("Item not removed")
        }

    }

    return (
        <Card>
            <CardContent>
                <Box flex={1}>
                    <img src={data?.url} alt="product image" />
                </Box>
                <Box flex={5}>
                    <Typography>{trimTitle(data?.title?.longTitle)}</Typography>
                    <SmallText>Seller:RetailNet
                        <span><img src={fassured} alt="flipkart" /></span>
                    </SmallText>
                    <PriceContent>
                        <span>₹{data?.price?.cost}</span>&nbsp;&nbsp;
                        <span> <strike>{data?.price?.mrp}</strike></span>&nbsp;&nbsp;&nbsp;
                        <span>{data?.price?.discount}</span>
                    </PriceContent>
                    <Box>
                        <Button
                            onClick={handleDelete} color="error" size="medium">Remove</Button>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    )
}

export default CartItem
