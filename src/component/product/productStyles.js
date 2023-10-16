/* eslint-disable no-unused-vars */
import { Box, styled } from '@mui/material';

export const MainContainer = styled(Box)(({ theme }) => ({
    "& > h6": {
        fontWeight: "bolder",
        margin: "0.5rem"
    },
    margin: "1rem 0"
}))

export const Container = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: "center",
    justifyContent: "center",
    height: "300px",
    width: "100%",
    gap: "10px",
    "& > div": {
        height: "100%",
        width: "100%"
    },
}))

export const SideProduct = styled(Box)(({ theme }) => ({
    flex: 1,
    display: 'flex',
    height: "100%",
    alignItems: "center",
    position: "relative",
    justifyContent: "center",
    [theme.breakpoints.down("md")]: {
        display: "none"
    },
    "& > div": {
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: -2,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "100%",
        width: "100%"
    }
}))

export const Middle = styled(Box)(({ theme }) => ({
    flex: 5,
    overflow: "hidden",
    height: "100%"
}))


export const ProductLink = styled(Box)(({ theme }) => ({
    textDecoration: "none",
    height: "100%",
    "& > div": {
        padding: "0.8rem 0",
        margin: "0 0.5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
        background: "#fff",
        height: "300px",
        ":hover": {
            boxShadow: "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px"
        }
    },
    "&  img": {
        objectFit: "contain",
        height: "60%",
        width: "100%",
    },
}))