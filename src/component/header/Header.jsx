import React, { useState } from 'react';
import styled from '@emotion/styled';
import {AppBar, Box, Toolbar,Button, Typography} from '@mui/material'
import Search from './Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './Header.css'
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';



const Header = () => {

    const FlipkartLogo = "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png"
    const FlipkartPlus = "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/plus_aef861.png"
    const LoginImg = "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png"

    const [isOpen, setIsOpen] = useState(false);

    const openPopup = () => {
        setIsOpen(true);
    };

    const closePopup = () => {
        setIsOpen(false);
    };

    const FlipkartHeader = styled(AppBar)`
        background-color: #2974F1;
        height: 50px;
    `;
    const LogoBox = styled(Box)`
        margin-left: 12%;
        line-height: 0;
    `;
    const SubLogo = styled(Typography)`
        font-size: 11px;
        font-style: italic;
        margin-left: 12%;
    `;
   
    const PlusImg = styled("img")(
        {
            width: 10,
            height: 10,
            marginLeft: 4
        }
    )
    const Seller = styled("h4")(
        {
            marginTop: 7,
            marginLeft: 40,
            fontWeight: 'bold'
            
        }
        )
        const CartContainer = styled("h4")(
            {
                display: 'flex',
                marginTop: 12,
                marginLeft: 40,
                fontWeight: 'bold'
                
            }
            )
            const ShoppingIcon = styled(ShoppingCartIcon)`
            margin: 0px 5px 0px 0px;
            `;
            
            return(
        <FlipkartHeader>
            <Toolbar>
                <LogoBox>
                    <img src={FlipkartLogo} alt="Flipkart Logo" style={{width:75}} />
                    <Box style={{display:'flex'}}>
                        <SubLogo style={{display:'flex'}}>Explore &nbsp;
                            <Box component="span" style={{color: "#CDC967"}}>Plus</Box>
                        </SubLogo>
                        <PlusImg src={FlipkartPlus} alt="Flipkart Plus" />
                    </Box>
                </LogoBox>
                <Search />
                
                    <div className='login-container'>
                        <Button onClick={openPopup}>LOGIN</Button>
                        {isOpen && (
                            <div className="popup">
                                <div className="popup-content">
                                    <h1 className='login-heading'>Login</h1>
                                    <p className='login-para'>Get access to your Orders, Wishlist and Recommendations</p>
                                    <img src={LoginImg} alt="loginimg" style={{width:250, marginTop:170}}/>
                                </div>
                                    <div className='popup-right'>
                                        <div className='popup-right-content'>
                                            <input type="text" className='inp' placeholder='Enter Email/Mobile number' />
                                            <p className='right-content'>By continuing, you agree to Flipkart's Terms of Use and Privacy Policy.</p>
                                            <button className='otp-button'>Request OTP</button>
                                            <p className='right-create-ac'>New to Flipcart? Create a account</p>
                                        </div>
                                        </div> 
                                        <IconButton
                                            aria-label="close"
                                            onClick={closePopup}
                                            sx={{
                                                position: 'absolute',
                                                right: 8,
                                                top: 8,
                                                color: (theme) => theme.palette.grey[500],
                                            }}
                                            >
                                            <CloseIcon />
                                            </IconButton>
                                        </div>
                                        )}
                                        </div>
                    <Seller>Become a Seller</Seller>
                    <Seller>More</Seller>
                    <CartContainer>
                        <span><ShoppingIcon/></span>
                        Cart</CartContainer>

            </Toolbar>
        </FlipkartHeader>
    )
}

export default Header;