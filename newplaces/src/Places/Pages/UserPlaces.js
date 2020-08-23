import React,{useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import PlaceList from '../Components/PlaceList';
import {useHttpClient} from '../../Shared/Hook/http-hook';
import ErrorModal from '../../Shared/Components/UIElements/Loading/ErrorModal';
import LoadingSpinner from '../../Shared/Components/UIElements/Loading/LoadingSpinner';

const UserPlaces = () => {
  const userId = useParams().userId;
  const [loadedplaces,setloadedplaces]  = useState();
  const  {isLoading,error,sendRequest,ClearError}= useHttpClient();
  useEffect(()=>
  {
         const fetchPlaces = async()=>{
           try{
                const responsedata= await sendRequest(`http://localhost:5000/api/places/user/${userId}`);
                setloadedplaces(responsedata.places);
           }catch(err)
           {
           };
          }
           fetchPlaces();
  },[sendRequest,userId]);
  
  const PlaceDeleteHander=(deletePlaceId)=>
  {
    setloadedplaces(prevPlaces=>prevPlaces.filter(place=>place.id!==deletePlaceId));
  }
  return  <React.Fragment>
    <ErrorModal error={error} onClear={ClearError}/>
    {isLoading &&( <div className="center"> <LoadingSpinner asOverlay /></div>)}
     {!isLoading &&loadedplaces&& <PlaceList  items={loadedplaces} onDeletePlace={PlaceDeleteHander} />}
        </React.Fragment>
};

export default UserPlaces;
