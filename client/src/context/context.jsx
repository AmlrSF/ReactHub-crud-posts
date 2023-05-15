import { createContext, useState } from "react";

export const userContext = createContext({});


export const UserContextProvider=(props)=>{
    const [user,setUser] = useState('');
    const [pass,setpass] = useState('');
    const [email,setemail] = useState('');
    const [id,setid] = useState('');
    return (
        <userContext.Provider 
        value={{
            user,setUser,
            pass,setpass,
            email,setemail,
            id,setid
        }}
        >
            {props.children}
        </userContext.Provider>
    )
}