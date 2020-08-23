import React,{useState, useContext} from 'react';
import './PlaceItem.css';
import Card from '../../Shared/Components/UIElements/Card/Card';
import Button from '../../Shared/FromElements/Button/Button';
import Modal from '../../Shared/Components/UIElements/Modal/Modal';
import Map from '../../Shared/Components/UIElements/Map/Map';
import {AuthContext} from '../../Shared/Context/context';
import {useHttpClient} from '../../Shared/Hook/http-hook';
import ErrorModal from '../../Shared/Components/UIElements/Loading/ErrorModal';
import LoadingSpinner from '../../Shared/Components/UIElements/Loading/LoadingSpinner';
const PlaceItem =props =>
{
      const auth = useContext(AuthContext);
      const {isLoading,error,sendRequest,ClearError}= useHttpClient();
   const [Showmap, setShowmap] = useState(false);
   const [showConfirmModal,setShowconfirmModal] = useState(false);
   const openhandler=()=>setShowmap(true);
   const closehandler=()=>setShowmap(false);
   const ShowDeleteWarning=()=>
   {
     setShowconfirmModal(true);
   };
   const CancelDeleteWarning=()=>
   {
     setShowconfirmModal(false);
   };
   const ConfirmDeleteWarning= async()=>
   {
    setShowconfirmModal(false);
    try{
       await sendRequest(`http://localhost:5000/api/places/${props.id}` ,
       'DELETE',null,{
        Authorization: 'Bearer ' + auth.token
       });
       props.onDelete(props.id);
    }
    catch(err){}
   };

   return ( 
     <React.Fragment>
       <ErrorModal error={error}  onClear={ClearError} />
   <Modal  show={Showmap} onCancel={oncancel} header={props.address} contentClass="place-item__modal-content"
     footerClass="place-item__modal-actions"
     footer={<Button onClick={closehandler}>CLOSE</Button>}>
       <div className="map-container">
        <Map center={props.coordinate} zoom={16}/>
       </div>
     </Modal>
     <Modal
     show={showConfirmModal}
     onCancel={CancelDeleteWarning}
      header="Are you sure?" 
      footerClass="place-item__modal-actions" 
      footer={
       <React.Fragment>
         <Button inverse onClick={CancelDeleteWarning}>CANCEL</Button>
         <Button danger onClick={ConfirmDeleteWarning}>DELETE</Button>
       </React.Fragment>
     }>
       <p> Do you want to proceed and delete this place? Please Note that it can`t be undone there after.</p>
     </Modal>
   <li  className="place-item">
      <Card className="place-item__content">
        {isLoading && <LoadingSpinner asOverlay />}
      <div className="place-item__image">
          <img src={ `http://localhost:5000/${props.image}`}   alt={props.title}/>
          </div> 
          <div className="place-item__info">
              <h2>{props.title}</h2>
              <h3>{props.address}</h3>
              <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
                <Button inverse onClick={openhandler}>View on Map </Button>
               { auth.userId===props.creator &&
            <Button to ={`/places/${props.id}`}>Edit</Button>} 
         { auth.userId===props.creator &&  <Button danger onClick={ShowDeleteWarning}>Delete</Button>}
          </div>
          </Card>
        </li>
        </React.Fragment>);
       
};
export default PlaceItem;