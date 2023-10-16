import { Box } from '@mui/material';
import {categoriesList} from '../../constants/data'
import  styled  from 'styled-components';

const NavBar = () => {
    return(
        <Container>
        <Box className='container'>
            {
                categoriesList.map((data) => (
                    <Box className='nav_img'>
                        <img className='categories_img' src={data.url} alt="categories image" />
                        <p className='categories_img_name'>{data.text}</p>  
                    </Box>
                ))
            }
        </Box>
        </Container>
    )
}

export default NavBar;


const Container = styled.div`
.container{
    display: flex;
    margin-top: 50px; 
    margin-left: 90px; 
}
.nav_img{
    margin: 20px 20px 0px 20px ;
}
.categories_img{
    padding: 0px 15px;
    width:60px;
}
.categories_img_name{
    margin-top: 0px;
    margin-left: 18px;
}
`;