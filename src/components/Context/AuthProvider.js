import { createContext, useState } from "react";

const AuthContext = createContext({
    user : null,
    token : null,
    setUser : () => {},
    setToken : () => {}
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [token, _setToken] = useState(localStorage.getItem('apiToken'));

    const setToken = (token) => {
        _setToken(token);
        if(token){
            localStorage.setItem('apiToken',token);
        }else {
            localStorage.removeItem('apiToken')
        }
    }


    return (
        <AuthContext.Provider value={{ 
            user, 
            token,
            setUser,
            setToken }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;