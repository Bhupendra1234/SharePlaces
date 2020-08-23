import React,{useState, useContext} from 'react';
import './Auth.css';
import Card from '../../Shared/Components/UIElements/Card/Card';
import Input from '../../Shared/FromElements/Input/Input';
import Button from '../../Shared/FromElements/Button/Button';
import {useFrom} from '../../Shared/Hook/form-hook';
import {VALIDATOR_MINLENGTH,VALIDATOR_EMAIL, VALIDATOR_REQUIRE} from '../../Shared/Util/validators';
import {AuthContext} from '../../Shared/Context/context';
import LoadingSpinner from '../../Shared/Components/UIElements/Loading/LoadingSpinner';
import ErrorModal from '../../Shared/Components/UIElements/Loading/ErrorModal';
import {useHttpClient} from '../../Shared/Hook/http-hook';
import Imageupload from '../../Shared/FromElements/image/imageUpload';
const Auth=()=>{

    const auth = useContext(AuthContext);
   const  {isLoading,error,sendRequest,ClearError}= useHttpClient();
    const [formState,inputHandler,setFormData] = useFrom({
        email:{
            value:'',
            IsValid:false
        },
        password:{
            value:'',
            IsValid:false
        }
    },
    false);
    
    const [IsloginMode,SetIsloginmode] = useState(true);
    const SwitchModeHandler=()=>
    {       
            if(!IsloginMode)
            {
                setFormData({
                    ...formState.inputs,
                    name:undefined,
                    image:undefined
                },
                formState.inputs.email.IsValid && formState.inputs.password.IsValid)
            }
            else{
                setFormData({
                    ...formState.inputs,
                    name:{
                        value: '',
                        IsValid:false
                    },
                    image:{
                       value:null,
                       IsValid:false
                    }   
                },false);
            }
            SetIsloginmode(premode =>!premode);
    };
    const Submithandler =  async(event)=>
    {    event.preventDefault();

        if (IsloginMode) {
            try {
           const responsedata   =  await sendRequest('http://localhost:5000/api/users/login', 'POST',JSON.stringify({
                    email: formState.inputs.email.value,
                    password: formState.inputs.password.value
                  }), {
                    'Content-Type': 'application/json'
                  }
                );
                auth.login(responsedata.userId,responsedata.token);
              } catch (err){}
            }
         else {
          try {
            const formData = new FormData();
            formData.append('email',formState.inputs.email.value);
            formData.append('name',formState.inputs.name.value);
            formData.append('password',formState.inputs.password.value);
            formData.append('image',formState.inputs.image.value);
            const responsedata   =   await sendRequest('http://localhost:5000/api/users/signup',
                    'POST',
                    formData);
            auth.login(responsedata.userId,responsedata.token);
          } catch (err) {}
        }
      };
    return ( <React.Fragment><Card className="authentication">
        <ErrorModal error ={error}  onClear={ClearError}/>
        {  isLoading && <LoadingSpinner asOverlay /> }
        <h2>Login Required</h2>
        <form onSubmit={Submithandler}>
            {!IsloginMode && (<Input element="input"  id="name" type="text" 
             label="Your Name" validators={[VALIDATOR_REQUIRE()]}
             errorText="please enter a Valid name"
             onInput={inputHandler}
              />)}
       {!IsloginMode  && <Imageupload center  id ="image" onInput={inputHandler} /> }
        <Input id="email" element="input" type="email" 
         label="E-mail" validators={[VALIDATOR_EMAIL()]}
         errorText="Please enter a Valid email address."
         onInput={inputHandler}
         />
         <Input id="password" element="input" type="password" 
         label="Password" validators={[VALIDATOR_MINLENGTH(6)]}
         errorText="Please enter a Valid Password(atleast 6 charactor)."
         onInput={inputHandler}
         />
        <Button type="submit" disabled={!formState.IsValid}>
            {IsloginMode ? 'Login' : 'SignUp'}
            </Button> 
    </form>
<Button inverse onClick={SwitchModeHandler}> Switch to {IsloginMode ? 'SignUp' : 'Login'}</Button>
    </Card>
    </React.Fragment>);
};
export default Auth;