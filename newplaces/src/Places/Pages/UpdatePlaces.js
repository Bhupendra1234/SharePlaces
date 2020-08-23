import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Button from '../../Shared/FromElements/Button/Button';
import {VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from '../../Shared/Util/validators';
import Input from '../../Shared/FromElements/Input/Input';
import './NewPlaces.css';
import {useFrom} from '../../Shared/Hook/form-hook';
import Card from '../../Shared/Components/UIElements/Card/Card';
import {useHttpClient} from '../../Shared/Hook/http-hook';
import ErrorModal from '../../Shared/Components/UIElements/Loading/ErrorModal';
import LoadingSpinner from '../../Shared/Components/UIElements/Loading/LoadingSpinner';
import { AuthContext } from '../../Shared/Context/context';
const UpdatePlace =()=>
{
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, ClearError } = useHttpClient();
    const [loadedPlace, setLoadedPlace] = useState();
    const placeId = useParams().placeId;
    const history = useHistory();
     const [formState,inputHandler,setFormData]=useFrom(
         {
                title:
                {
                    value:'',
                    IsValid:false
                } ,
                description:
                {
                    value:'',
                    IsValid:false
                }
         },false
     );
     
  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/places/${placeId}`
        );
        setLoadedPlace(responseData.place);
        setFormData(
          {
            title: {
              value: responseData.place.title,
              isValid: true
            },
            description: {
              value: responseData.place.description,
              isValid: true
            }
          },
          true
        );

      } catch (err) {}
    };
    fetchPlace();
  }, [sendRequest, placeId, setFormData]);

        if(isLoading)
        {
        return(<div className="center">
            <LoadingSpinner />
        </div>);
        }
        if(!loadedPlace&&!error)
        {
            return(<div className="center">
                <Card>
                <h2>Could Not find Place!</h2>
                </Card>  
            </div>);
        }

        const placeSubmitHandler = async event => {
            event.preventDefault();
            try {
              await sendRequest(
                `http://localhost:5000/api/places/${placeId}`,
                'PATCH',
                JSON.stringify({
                  title: formState.inputs.title.value,
                  description: formState.inputs.description.value
                }),
                {
                  'Content-Type': 'application/json',
                  Authorization: 'Bearer ' + auth.token
                }
              );
              history.push('/' + auth.userId + '/places');
            } catch (err) {}
          };
        return <React.Fragment>
        <ErrorModal error={error} onClear={ClearError} />
        {!isLoading && loadedPlace && (
          <form className="place-form" onSubmit={placeSubmitHandler}>
            <Input
              id="title"
              element="input"
              type="text"
              label="Title"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid title."
              onInput={inputHandler}
              initialValue={loadedPlace.title}
              initialValid={true}
            />
            <Input
              id="description"
              element="textarea"
              label="Description"
              validators={[VALIDATOR_MINLENGTH(5)]}
              errorText="Please enter a valid description (min. 5 characters)."
              onInput={inputHandler}
              initialValue={loadedPlace.description}
              initialValid={true}
            />
            <Button type="submit" disabled={!formState.IsValid}>
              UPDATE PLACE
            </Button>
          </form>
        )}
      </React.Fragment>
};
export default UpdatePlace;