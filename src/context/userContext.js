import { useState, createContext} from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState('');
    const [token, setToken] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    return <UserContext.Provider
        value={{
            user,
            setUser,
            token,
            setToken,
            loggedIn,
            setLoggedIn
        }}>{children}
    </UserContext.Provider>

}