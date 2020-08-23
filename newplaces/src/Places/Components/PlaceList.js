import React from 'react';
import './PlaceList.css';
import PlaceItem from './PlaceItem';
import Card from '../../Shared/Components/UIElements/Card/Card';
import Button from '../../Shared/FromElements/Button/Button';
const PlaceList =(props)=>
{
   if(props.items.length===0)
   {
       return <div className="place-list center">
           <Card>
                <h2>No Places found. Maybe Create one?</h2>
                <Button to="/places/new">Share Place</Button>
           </Card>
       </div>
   }
   return <ul className="place-list">
       {props.items.map(place=>(<PlaceItem
        key ={place.id}
        id={place.id} 
       image={place.image}
       title ={place.title}
        description ={place.description}
       address={place.address}
        creator={place.creator}
       coordinate={place.location}
        onDelete={props.onDeletePlace}/>))}
   </ul>;
};
export default PlaceList;