import {useCallback,useReducer} from 'react';
const formReducer = (state, action) => {
    switch (action.type) {
      case 'INPUT_CHANGE':
        let formIsValid = true;
        for (const inputId in state.inputs) {
            if(!state.inputs[inputId])
               continue;
          if (inputId === action.inputId) {
            formIsValid = formIsValid && action.IsValid;
          } else {
            formIsValid = formIsValid && state.inputs[inputId].IsValid;
          }
        }
        return {
          ...state,
          inputs: {
            ...state.inputs,
            [action.inputId]: { value: action.value, IsValid: action.IsValid }
          },
          IsValid: formIsValid
        };
       case 'SET_DATA':
         return{
            inputs: action.inputs,
            IsValid:action.formValidity
         };
      default:
        return state;
    }
  };
 

 export const useFrom = (inititalinputs,initialFormvalidity)=>{
    const [formState,dispatch] = useReducer(formReducer,{
        inputs:inititalinputs,
        IsValid:initialFormvalidity
    });

const inputHandler = useCallback((id, value, IsValid) => {
    dispatch({
      type: 'INPUT_CHANGE',
      value: value,
      IsValid: IsValid,
      inputId: id
    });
  }, []);

  const setFormData = useCallback((inputData,formValidity)=>
  {
      dispatch(
        {
          type:'SET_DATA',
          inputs:inputData,
          formIsValid:formValidity
        });
  },[]);
  
return [formState,inputHandler,setFormData];
};
