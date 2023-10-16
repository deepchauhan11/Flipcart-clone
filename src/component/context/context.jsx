/* eslint-disable react/prop-types */
import React, { useContext, useState } from "react";


const AppContext = React.createContext();


const AppProvider = ({ children }) => {
    const username = localStorage.getItem("username")

    const [total, setTotal] = useState(0)

    const [account, setAccount] = useState(username);


    return <AppContext.Provider value={{ account, setAccount, total, setTotal }} >{children}</AppContext.Provider>
}


export const useGlobalContext = () => {
    return useContext(AppContext);
}

export { AppContext, AppProvider }