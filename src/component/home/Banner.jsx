import Carousel from 'react-multi-carousel'
import React from 'react';
import 'react-multi-carousel/lib/styles.css'
import {bannerImg} from '../../constants/data'
import { Box } from '@mui/material';
import  styled  from 'styled-components';

const responsive = {
    SuperLargeDesktop: {
        breakpoint: { max: 4000, min: 3000},
        items: 1
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024},
        items: 1
    },
    tablet: {
        breakpoint: { max: 1024, min: 464},
        items: 1
    },
    mobile: {
        breakpoint: { max: 464, min: 0},
        items: 1
    },
}



const Banner = () => {
    return(
        <Container className='container'>
            <Carousel
                swipeable={false}
                draggable={false}
                responsive={responsive}
                ssr={true}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={3000}
                customTransition='all .5s'
                transitionDuration={500}
                containerClass='carousel container'
                itemClass='carousel-item-padding-40-px'
            >
                {
                    bannerImg.map((img) => (
                        <Box key={img.id}>
                            <img className='banner_img' src={img.url} alt="banner img" /> 
                        </Box>
                    ))
            }
            </Carousel>
        </Container>
    )
}
export default Banner;

const Container = styled.div`
.container{
    width: 100vw;
    height: 40vh;
    top: 0px;
    // background-size:contain;
    // background-position:top;
    background: cover;
}
.banner_img{
    width: 100vw;
    height: 40vh;
}
`;
