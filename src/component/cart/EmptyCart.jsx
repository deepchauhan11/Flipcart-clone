import { Box, Typography } from "@mui/material";
import { Empty } from "./styles";

const EmptyCart = () => {
    const imgurl = 'https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90';
    return (
        <Empty>
            <Box>
                <img src={imgurl} alt="empty" />
                <Typography>Your cart is empty</Typography>
                <Typography>Add items to it now</Typography>
            </Box>

        </Empty>
    )
}
export default EmptyCart
