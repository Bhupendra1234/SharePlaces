import React,{useRef, useState,useEffect} from 'react';
import './imageupload.css';
import Button from '../Button/Button';
const Imageupload  =(props)=>
{
     const filepickerRef = useRef();
     const [IsValid,SetIsValid] = useState(false);
     const [file ,setfile] = useState();
     const [PreviewUrl,setpreviewUrl] = useState();

      useEffect(()=>{
                if(!file)
                {   return;
                }
                const fileReader = new FileReader();
                fileReader.onload=()=>{
                    setpreviewUrl(fileReader.result);
                };
                fileReader.readAsDataURL(file);
      },[file]);
     const pickhandler=(event)=>
     {  
          let Pickfile;
          let FileisValid =IsValid;
        if(event.target.files&&event.target.files.length===1)
        {
             Pickfile = event.target.files[0];
             setfile(Pickfile);
             SetIsValid(true)
             FileisValid=true;
        }
        else{
            SetIsValid(false);
            FileisValid=false;
        }
        props.onInput(props.id,Pickfile,FileisValid);  
     }
     const pickimage =()=>{
            filepickerRef.current.click();
     }
        return(
            <div className="form-control"> 
            <input type="file"  id={props.id} style={{display:'none'}} ref={filepickerRef}
            accept =".jpg,png,jpeg"   onChange={pickhandler}/>
            <div className={`image-upload ${props.center && 'center'}`}>
                <div className="image-upload__preview">
                 { PreviewUrl &&  <img src={PreviewUrl} alt="Preview" />}
                 {!PreviewUrl && <p> Please Pick A image</p>}
                </div>

                <Button type="button" onClick={pickimage}>PICK IMAGE</Button>
                 </div>
        {!IsValid&& <p>{props.errorText}</p> }
           </div>
        );
};

export default Imageupload; 