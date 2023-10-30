import {createContext, useContext, useState} from "react";

const userContext = createContext();

export const useUserContext = () =>{
    return useContext(userContext);
}

export const UserContextProvider = ({children}) =>{
    const [user,setUser] = useState('');
    const [email,setEmail] = useState('');
    return (
        <userContext.Provider value={{user,setUser,email,setEmail}}>
            {children}
        </userContext.Provider>
    )
}