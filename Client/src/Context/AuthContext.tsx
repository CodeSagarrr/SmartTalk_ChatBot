import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { loginUser, signupUser, userLogout } from '../api/AuthMange'
type User = {
    firstName: string
    lastName: string
    email: string
    password: string
    userName: string
}

type UserAuth = {
    user: User | null,
    login: (email: string, password: string) => Promise<void>,
    signup: (firstName: string, lastName: string, email: string, password: string) => Promise<void>
    logout: () => void,

}

export const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {

   

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    const [activeUser, setActiveUser] = useState< User | null >(null);

   


    const Name = activeUser?.userName;
    const firstLetter = Name?.charAt(0).toUpperCase();
    // set user in localstorage
    const getUser = (user : User) =>{
        if(user){
            setActiveUser(user);
            localStorage.setItem('user', JSON.stringify(user));
        }
    }

    // logout from localstorage
    const localUserLogout = () =>{
        localStorage.removeItem('user');
        setActiveUser(null);
        setIsAuthenticated(false);
    }
    

    // login

    const login = async (email: string, password: string) => {
        try {
            const data = await loginUser(email, password);
            if (data) {
                setUser(data);
                setIsAuthenticated(true);
                getUser(data)
            }
        } catch (error) {
            console.log(error || "Error Occured")
        }
    }

    // signup
    const signup = async (firstName: string, lastName: string, email: string, password: string) => {
        try {
            const data = await signupUser(firstName, lastName, email, password)
            if (data) {
                setIsAuthenticated(true)
            }
        } catch (error) {
            console.log(error || "Error Occured")
        }

    }

    // logout
    const logout = async () => {
        localUserLogout();
        try {
            const data = await userLogout();
            if (data) {
                setIsAuthenticated(false);
            }
        } catch (error) {
            console.log(error || "Error Occured")
        }
    }

    // Get user
    useEffect(() =>{
        const user = localStorage.getItem('user')
        if(user) {
            setActiveUser(JSON.parse(user))
            setIsAuthenticated(true)
        }
    },[user])


    const value = {
        user,
        isAuthenticated,
        activeUser,
        firstLetter,
        login, logout, signup
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )

}

export const userAuth = () => useContext(AuthContext);