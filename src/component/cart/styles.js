/* eslint-disable no-unused-vars */
import { Box, Grid, Paper, styled } from "@mui/material";


export const Card = styled(Paper)(({ theme }) => ({
    padding: "1rem 1.5rem",
    margin: "0.5rem 0",
}))

export const SmallText = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems:"center",
    margin: "0.5rem 0",
    color:"#878787",
    gap:"0.5rem",
    fontSize: "14px",
    "& >span> img": {
        width: "50px",
    }
}))


export const Bottom = styled(Paper)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    margin: "0.8rem 0",
    padding: "1rem 0.5rem",
    "& > button": {
        background: "#fb5413",
        color: "white",
        padding: "0.5rem 5rem",
        fontSize: "1.1rem",
        border: "none",
        outline: "none",
        borderRadius: "3px",
        cursor: "pointer",
        textTransform: "uppercase"
    },
    [theme.breakpoints.down("md")]:{
        justifyContent:"center"
    }
}))

export const PriceContent = styled(Box)(({ theme }) => ({
    fontWeight: "bold",
    fontSize: "0.8rem",
    "&>*:nth-of-type(2)": {
        color: "#878787"
    },
    "&>*:nth-of-type(3)": {
        color: "#388E3C"
    }
}))

export const Empty = styled(Box)(({ theme }) => ({
    height: "70vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& > div": {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "0.5rem",
        flexDirection: "column",
        "& > img": {
            width: "50%",
        },
        "& > p": {
            fontWeight: "bold"
        }
    }
}))



export const TotalContainer = styled(Paper)(({ theme }) => ({
    padding: "1rem 1.5rem",
    marginTop: "2rem",
    "& > p": {
        color: "#878787",
        fontWeight: "bold",
    },
    "& > div": {
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        marginTop: "1rem",
        "& >:last-child": {
            color: "green",
            fontWeight: "600",
            fontSize: "0.8rem",
            letterSpacing: "0.8px"
        },
        "& > p, & > h6": {
            fontSize: "0.9rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
        },
        "& > :nth-of-type(2) > span": {
            color: "red",
            fontWeight: "600"
        },
        "& > h6 > span": {
            color: "green",
            fontWeight: "600"
        }
    }
}))

export const StyledGrid = styled(Grid)(({ theme }) => ({
    minHeight: "70vh",
    padding: "1rem",
    "& > div": {
        padding: "1rem 0.5rem"
    }
}))

export const CardContent = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    margin: "0.5rem 0",
    gap: "2rem",
    "& > div": {
        display: "flex",
        height: "100%",
        flexDirection: "column",
        gap: "1rem",
        "&> img": {
            width: "100%",
            height: "100%",
            objectFit: "cover"
        },
        "& > p": {
            fontWeight: "600"
        },
    },
    [theme.breakpoints.down("sm")]:{
        flexDirection:"column"
    }
}))