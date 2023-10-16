import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { useDispatch, useSelector } from "react-redux";
import {  useParams } from "react-router-dom";
import { Box, Button, Grid, TableBody, TableCell, TableRow, Typography } from '@mui/material'
import { GridContainer, Left, PriceContent, Right, SmallText, StyledBadge } from "./styles";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import Header from "../header/Header";

const ProductDetail = () => {
    const [product, setProduct] = useState([]);
    const { productId } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8001/product/${productId}`)
          .then(response => {
            setProduct(response.data);
          })
          .catch(error => {
            console.error('Error fetching product detail:', error);
          });
      }, [productId]);


    return (
        <GridContainer container >
        <Header/>
                <Grid item xs={12} lg={4} md={12} sm={12}>
                    <Left>
                        <img src={product.image} alt="product" width="100%" />
                        <Box>
                            <Button variant="contained"  fullWidth sx={{ background: "#ff9f00", ":hover": { background: "#ff9700" } }} > <ShoppingCartIcon />&nbsp;Add to cart</Button>
                            <Button variant="contained"  fullWidth sx={{ background: "#fb5413", ":hover": { background: "#fb5413" } }} > <FlashOnIcon />&nbsp;Buy now</Button>
                        </Box>
                    </Left>
                </Grid>
                <Grid item xs={12} lg={8} md={12} sm={12}>
                    <Right>
                        <Typography variant="h5" >{product.name}</Typography>
                        <Typography>8 Ratings and 1 reviews</Typography>
                        <PriceContent>
                            <span>₹{product.price}</span>&nbsp;&nbsp;
                            <span> <strike>{product.description}</strike></span>&nbsp;&nbsp;&nbsp;
                            <span></span>
                        </PriceContent>
                        <Typography>Available Offers</Typography>
                        <SmallText>
                            <Typography><StyledBadge /> Get extra 10% off upto ₹50 on 1 item(s) T&C </Typography>
                            <Typography><StyledBadge /> Get extra 13% off (price inclusive of discount) T&C </Typography>
                            <Typography><StyledBadge /> Sign up for FlipKart PayLater and get FlipKart Gift Card worth ₹100 know more </Typography>
                            <Typography><StyledBadge /> Bank offer 9% Cashback on FlipKart Axis Bank Card T&C</Typography>
                            <Typography><StyledBadge /> No on EMI on Bajaj Finserv EMI card on cart value above ₹2999 T&C</Typography>
                        </SmallText>
                        <TableBody>
                            <TableRow>
                                <TableCell>Delivery</TableCell>
                                <TableCell>Delivery by </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Warranty</TableCell>
                                <TableCell>No Warranty</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Seller</TableCell>
                                <TableCell  >
                                    <Box component='span' style={{ color: "#2874f0" }} >
                                        SuperComNet
                                    </Box>
                                    <Typography>GST invoice available</Typography>
                                    <Typography>View more sellers starting from ₹ </Typography>
                                </TableCell>

                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={2} >
                                    <img src='https://rukminim1.flixcart.com/flap/128/128/image/f15c02bfeb02d15d.png?q=100' alt="advertisement" style={{ width: 300 }} />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableBody>
                    </Right>
                </Grid>
            </GridContainer>

    )
}

export default ProductDetail;