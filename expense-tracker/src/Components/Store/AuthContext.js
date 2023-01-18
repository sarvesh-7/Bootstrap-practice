import {createContext} from 'react';
const AuthContext = createContext(
    {
        token : '',
        isLoggedin:false,
        updateToken:(token)=>{}
    }
);

export default AuthContext;