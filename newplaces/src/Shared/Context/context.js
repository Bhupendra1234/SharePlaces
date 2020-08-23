import {createContext} from 'react';

export  const AuthContext  = createContext({
    IsloggedIn :false,
    token:null,
    userId: null,
    login:() =>{},
    logout:() =>{}
});