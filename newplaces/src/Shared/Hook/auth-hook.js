import {useCallback,useEffect,useState} from 'react';

export const useAuth =()=>{
const [token, Settoken] = useState(false);
const [userId,setuserId] =useState(false);
const login = useCallback((uid,token)=>{
    Settoken(token);
    setuserId(uid);
    // const tokenExpirationDate = ExpirationDate || new Date(new Date().getTime()+1000*60*60);
    localStorage.setItem('userData',JSON.stringify({userId:uid,token:token}))
},[]);
const logout = useCallback(()=>{
  Settoken(null);
  setuserId(null);
  localStorage.removeItem('userData');
},[]);

   useEffect(()=>
   {
     const storedata = JSON.parse(localStorage.getItem('userData'));
     if(storedata &&storedata.token)
     login(storedata.userId,storedata.token);
   },[login])

    return {token,login,logout,userId};
};