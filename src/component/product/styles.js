/* eslint-disable no-unused-vars */
import { Box, Grid, Typography, styled } from "@mui/material";
import { LocalOffer as Badge } from '@mui/icons-material';

export const GridContainer = styled(Grid)(({ theme }) => ({
background:"white",
marginTop:"4.5rem",
padding:"0 3rem",
[theme.breakpoints.down("md")]:{
    padding:"0"
}
}))

export const Left = styled(Box)(({ theme }) => ({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: "1rem",
    "& > img": {
        objectFit: "cover",
        [theme.breakpoints.down("md")]: {
            height: "400px",
            width: "80%",
            objectFit: "contain"
        }
    },
    "& > div": {
        display: "flex",
        gap: "10px",
        margin: "1rem 0",
        width: "100%",
        "& > button": {
            padding: "1rem",
        }
    }
}))

export const Right = styled(Box)(({ theme }) => ({
    padding: "1rem",
    display: "flex",
    width: "100%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    gap: "1rem",
    "& > p": {
        color: "#878787",
        fontSize: "14px"
    },
    "tbody tr": {
        fontSize: "14px",
        "& > td": {
            fontSize: "14px",
            border: "none",
        }
    }
}))


export const PriceContent = styled(Box)(({ theme }) => ({
    "&>*:nth-of-type(2)": {
        color: "#878787"
    },
    "&>*:nth-of-type(3)": {
        color: "#388E3C"
    }
}))

export const SmallText = styled(Box)(({ theme }) => ({
    fontSize: "14px"
}))

export const StyledBadge = styled(Badge)(({ theme }) => ({
    marginRight: "10px",
    color: "#00cc00",
    fontSize: "15px"
}))