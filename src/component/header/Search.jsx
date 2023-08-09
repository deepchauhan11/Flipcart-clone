import styled from "@emotion/styled";
import { Box, InputBase } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';


const SearchBoxContainer = styled(Box)`
    background: white;
    width: 35%;
    border-radius: 2px;
    margin-left: 15px;
    margin-bottom: 10px;
    display: flex;
`;
const InputBaseSearch = styled(InputBase)`
    padding-left: 20px;
    width: 100%;
`;
const IconSearch = styled(SearchIcon)`
    margin: 4px 5px 0px 0px;
`;

const Search = () => {
    return(
        <SearchBoxContainer>
            <InputBaseSearch placeholder="Search for products, brands and more" />
            <Box>
                <IconSearch style={{color:'#2974F1'}}/>
            </Box>
        </SearchBoxContainer>
    )
}

export default Search;