import { Fragment } from "react";
import Banner from "./Banner";
import NavBar from "./Navbar";
// import Product from "./Product";
import Footer from '../footer/Footer';
import SubFooter from '../footer/SubFooter';
import Header from '../header/Header';
import Products from '../product/products'

const Home = () => {
    return(
        <Fragment>
        <Header />
            <NavBar/>
            <Banner />
            <Products />
            <Footer />
            <SubFooter />
        </Fragment>
        
        
    )
}

export default Home;