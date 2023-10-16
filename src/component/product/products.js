import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Paper, Typography } from "@mui/material"
import { Container, MainContainer, Middle, ProductLink, SideProduct } from "./productStyles"
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";


const Products = ({title}) => {
    const [products, setProducts] = useState([]);

useEffect(() => {
    axios.get('http://localhost:8001/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products data:', error);
      });
  }, []);

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

    return (
            <MainContainer  >
                <Typography variant='h6' >{title}</Typography>
                <Container>
                    <SideProduct  >
                        <Box sx={{
                            background: "url('https://rukminim1.flixcart.com/fk-p-flap/530/810/image/1758140ba2b1da70.jpg?q=20')",
                        }} ></Box>
                    </SideProduct>
                    <Middle>
                        <Carousel
                            responsive={responsive}
                            infinite={true}
                            swipeable={true}
                            draggable={true}
                            autoPlay={true}
                            centerMode={true}
                            autoPlaySpeed={4000}
                            dotListClass='custom-dot-list-style'
                            itemClass='Carousel-item-padding-40-px'
                            containerClass='carousel-container'

                        >
                        {products.length === 0 ? (
                            <tr>
                              <td colSpan="5">No record found</td>
                            </tr>
                          ) : (
                          products.map(product => (
                            <ProductLink>
                            <Paper>
                            <Link to={`/product/${product._id}`} target="_blank" rel="noopener noreferrer" key={product._id}>
                                            <img src={product.image} alt="product image" />
                                            <Typography sx={{ fontWeight: "600", color: "#212121",  }} >{product.name}</Typography>
                                            <Typography sx={{ color: "green" }} >{product.price}</Typography>
                                            </Link>
                                        </Paper>
                            </ProductLink>
                                
                                    )))}
                        </Carousel>
                    </Middle>
                    <SideProduct>
                        <Box sx={{
                            background: "url('https://rukminim1.flixcart.com/fk-p-flap/530/810/image/d133935e34408b02.jpg?q=20')",
                        }} ></Box>
                    </SideProduct>
                </Container>
            </MainContainer>
        
    );
};

export default Products;