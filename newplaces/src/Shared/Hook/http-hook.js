import {useState,useCallback,useRef,useEffect} from 'react';
export const useHttpClient =()=>{
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const activeHttpRequests=useRef([]);
    const sendRequest  = useCallback(async (url , method='GET', body=null,headers={})=>
    {
        setIsLoading(true);
        const httpAbortctrl = new AbortController();
        activeHttpRequests.current.push(httpAbortctrl);
        try{
          const response = await fetch(url,{
              method,body,headers,signal:httpAbortctrl.signal});
          const responseData = await response.json();
          activeHttpRequests.current = activeHttpRequests.current.filter(reqCtrl=>reqCtrl!==httpAbortctrl);
          if(!response.ok)
          {
              throw new Error(responseData.message);
          }
          setIsLoading(false);
          return responseData;
        }catch(err)
        {
            setIsLoading(false);
            setError(err.message);
            throw err;
        }
    
    },[]);

    const ClearError =()=>
    {
        setError(null);
    }
    useEffect (()=>
    {
        return()=>{
            activeHttpRequests.current.forEach(abortctrl=>abortctrl.abort());
        }
    },[]);
  return {isLoading,error,sendRequest,ClearError};
};