import React,{useContext} from 'react';
import {VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH}  from '../../Shared/Util/validators';
import Input from '../../Shared/FromElements/Input/Input';
import './NewPlaces.css';
import Button from '../../Shared/FromElements/Button/Button';  
import {useFrom} from '../../Shared/Hook/form-hook';
import {useHttpClient} from '../../Shared/Hook/http-hook';
import {AuthContext} from '../../Shared/Context/context';
import ErrorModal from '../../Shared/Components/UIElements/Loading/ErrorModal';
import LaodingSpinner from '../../Shared/Components/UIElements/Loading/LoadingSpinner';
import {useHistory} from  'react-router-dom';
import Imageupload from '../../Shared/FromElements/image/imageUpload';
  const NewPlace = () => {
    const auth = useContext(AuthContext);
    const {isLoading,error,sendRequest,ClearError}= useHttpClient();
    const [formState,inputHandler] = useFrom(
       {
          title: {
            value: '',
            IsValid: false
          },
          description: {
            value: '',
            IsValid: false
          },
          address: {
              value: '',
              IsValid: false
            },
            image:{
              value:null,
              IsValid:false
            }
        }
      ,false);
   const history = useHistory();
    const placeSubmitHandler =  async event => {
      event.preventDefault();
      try{
        const formdata = new FormData();
        formdata.append('title',formState.inputs.title.value);
        formdata.append('description',formState.inputs.description.value);
        formdata.append('address',formState.inputs.address.value);
        formdata.append('image',formState.inputs.image.value);
       await  sendRequest('http://localhost:5000/api/places','POST',formdata,{
        Authorization: 'Bearer ' + auth.token
       }
    ); history.push('/');
   }
    catch(err){}
  };
  
    return (
      <React.Fragment>
        <ErrorModal error={error}  onClear={ClearError} />
      <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LaodingSpinner asOverlay />}
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (at least 5 characters)."
          onInput={inputHandler}
        />
        <Input
          id="address"
          element="input"
          label="Address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address."
          onInput={inputHandler}
        />
        <Imageupload id="image"
        onInput={inputHandler}
        errorText="Please provide an image"
         />
        <Button type="submit" disabled={!formState.IsValid}>
          ADD PLACE
        </Button>
      </form>
      </React.Fragment>
    );
  };
  
  export default NewPlace;