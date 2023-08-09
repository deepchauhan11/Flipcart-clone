import React, { useState } from "react";
import { Dialog, DialogContent, Typography ,Box, styled } from "@mui/material";



const loginInitials = {
    emailid: "",
    password: ""
}
const signupInitials = {
    phone: "",
    name: "",
    emailid: ""
}

const LoginDialog = () => {
    const [logIn, setLogIn] = useState(loginInitials);
    const [signUp, setSignUp] = useState(signupInitials);

    return(
        <Dialog>
            
        </Dialog>
    )
}


export default LoginDialog;