import React, { useState,useRef,useEffect} from 'react'
// import { Validator } from 'react';
import validator from 'validator'
import Draggable from 'react-draggable';

import html2canvas from 'html2canvas'; 

import post1 from "./Images/1.png"
import QRCode from "qrcode.react";
import post2 from "./Images/2.png"
import post3 from "./Images/3.png"
import post4 from "./Images/4.png" 
import Logo from "./Images/Logo1.png"

import {NavLink, useNavigate} from 'react-router-dom'

const getLocalItems = () => {
  // For Getting Item from LocalStorage

  let list = localStorage.getItem('lists');
  
  if (list)
  {
      return JSON.parse(list);    
  }
  else
  {
      return [];
  }
}


const Form2 = (props) => {

    const navigate = useNavigate();

 

    const [bname, setBname] = useState('Brand_Name');
    const [oname, setOname] = useState('Owner');
    const [phone, setPhone] = useState('1234567890');
    const [email, setEmail] = useState('Email');
    const [address, setAddress] = useState('Address');
    const [desc, setDesc] = useState('Short Description of the Company');
 
    const [qrValue, setQrValue] = useState("https://example.com");
    
    const[bImg,setBimg]=useState(null);
    
    const[style,setStyle]=useState(getLocalItems);
 
 
    
    
    const [card, setCard] = useState({template_id:style, owner_name:oname, company_name:bname,desc:desc,c_address:address,  c_phone: phone, c_email: email,c_qrcode:qrValue});
   
     

    const handleInput1 = (e) => {
      setBname(e.target.value);
      setCard({...card,company_name:bname})


    } 
    
    const handleInput2 = (e) => {
      setOname(e.target.value);
      setCard({...card,owner_name:oname})
      
    }
    
    const handleInput3 = (e) => {
      setPhone(e.target.value);
      setCard({...card,c_phone:phone})
      
    
    }

    
    const handleInput4 = (e) => {

      const inputEmail = e.target.value;

      setEmail(inputEmail);

      setCard({...card,c_email:inputEmail})


    
      
    }
    
    const handleInput5 = (e) => {
      setAddress(e.target.value);
      setCard({...card,c_address:address})
      
    }
    
    const handleInput6 = (e) => {
      setDesc(e.target.value);
      setCard({...card,desc:desc})
    }
    
    
    



    const userFormPage = async () => {  
       
      if(style==='1')
      {  
        setBimg(post1);
      }
      else if(style==='2'){
        setBimg(post2);
      }
      else if(style==='3'){
        setBimg(post3);
      }
      else{
        setBimg(post4);
      }

 
    }

   


  const [selectedFile, setSelectedFile] = useState(Logo);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(URL.createObjectURL(e.target.files[0]));
    }
};

      
  
    useEffect(() => {
      userFormPage(); 
    },[])

    
   
    const fileInputRef = useRef(null);
 

    
    const handleFileChange =  (event) => {
      event.preventDefault();
      const file = event.target.files[0];
      // Handle the selected file here
      console.log('Selected file:', file);
    };


    const handleDownload = async(event) => {
      event.preventDefault(); // Prevents form submission
      const element = document.getElementById('divToDownload');

 

      if(!validator.isEmail(email) ) 
      {
        alert('Please Enter Valid Email');
      } 
      
     else if(!validator.isMobilePhone(phone)){
        alert('Please Enter Valid Phone');
      }
      else
      {

      html2canvas(element).then((canvas) => {
        const link = document.createElement('a');
        link.download = 'downloaded-div.png';
        link.href = canvas.toDataURL();
        link.click();
      });


      const {template_id, owner_name, company_name,desc,c_address,  c_phone, c_email,c_qrcode} =card;
      console.log(card);
      
      try {
      const res = await fetch("/download", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
            template_id, owner_name, company_name,desc,c_address,  c_phone, c_email,c_qrcode
          })
        });
        // console.log(card);
        const data = await res.json();
        // window.alert(d0);
      
      if (!data)
      {
          window.alert("TEMPLATE NOT SAVED SUCCESSFULLY");
          
      }
      else
      {
          window.alert("TEMPLATE SAVED SUCCESSFULLY");
          navigate('/form2');
      }
      
    }
    catch (e)
    {
      console.log(e);
    }
  }
    };


    


   
    

    
    

    
  return (
    <>

  
    <div className='frm '>

     
    <div className="wrapper temp-form">
       
        <form method="POST" className="form-right temp-form-right">
            <h2 className="text-uppercase">Registration form</h2>
            <div className="row">
                <div className="col-sm-6 mb-3 linformation"> 
                    <i className="fa-solid fa-city licon"></i>
                    <input type="text" name="bname" id="bname" className="input-field"placeholder='Buisness/Company Name'   value={bname}
                              onChange={handleInput1}/>
                </div> 
          </div>
            <div className="row">
                <div className="col-sm-6 mb-3 linformation"> 
                    <i className="fa-solid fa-user licon"></i>
                    <input type="text" name="oname" id="oname" className="input-field" placeholder='Your Name'   value={oname}
                              onChange={handleInput2}/>
                </div> 
          </div>
          <div className="row">
                <div className="col-sm-6 mb-3 linformation"> 
                    <i className="fa-solid fa-pen-to-square licon"></i>
                    
                    <input type="text" name="description" id="disc" className="input-field" placeholder='Short Description'   value={desc}
                              onChange={handleInput6}/>
                </div> 
          </div>
          <div className="row">
                <div className="col-sm-6 mb-3 linformation"> 
                    <i className="fa-solid fa-location-dot licon"></i>
                    
                    <input type="text" name="address" id="address" className="input-field" placeholder='Address'   value={address}
                              onChange={handleInput5}/>
                </div> 
          </div>
          <div className="row">
              <div className="col-sm-6 mb-3 linformation"> 
                  <i className="fa-solid fa-envelope licon"></i>
                              <input type="email" name="email" id="email" className="input-field" placeholder='Your Email' value={email}
                              onChange={handleInput4} />
                              
                </div> 
          </div>
          <div className="row">
                <div className="col-sm-6 mb-3 linformation"> 
                    <i className="fa-solid fa-phone licon"></i>
                    <input type="text" name="phone" id="phone" className="input-field" placeholder='Mobile Number'   value={phone}
                              onChange={handleInput3} maxLength="10" minLength="10"/>
                </div> 
            </div>
            <div className="row">
                <div className="col-sm-6 mb-3 linformation"> 
                    <i className="fa-solid fa-qrcode licon"></i>
                    <input
            type="text"  className="input-field"
            value={qrValue}
            onChange={(e) => {setQrValue(e.target.value); setCard({...card,c_qrcode:e.target.value})}}
          />

          </div> 
          </div>

            <div className="form-field">
            
              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />

                {/* <button className='register' onClick={handleButtonClick}>Select Logo</button> */}
                
        

                  <input  className='register'  type="file" accept="image/*" onChange={handleImageChange} />
                  {selectedFile && (
                    <div
                      className="register"
                      style={{
                        width: "15px",
                        height: "155px",
                        border: "1px solid black", 

                      }}
                    >
                  
                  </div>
                )}

            </div>
                
            </div>
            
            <input type="submit" value="Download" className="btn-download" onClick={handleDownload} name="signup"/>

           

        </form>


        <div id= "divToDownload" className='dblock' >
       
       
       
          <div  className='form-Left preview  '>
            
            <img src={bImg} alt="logo" ></img>

            <div className='header'>
                
              <Draggable>
                <div className={'logo'+style}>
                  <img src={selectedFile} alt={"company-logo"+style}  ></img>
                </div>
                </Draggable>

                <Draggable>
                <div className={'overlay-text'+style}> 
                  <h2 className={'pname'+style} >{oname}</h2>
                </div>
                </Draggable>
                
                <Draggable>
                <div className={'overlay'+style}> 
                  <h1 className={'pcname'+style}  >{bname}</h1>
                </div>
                </Draggable>
                  
                <Draggable>
                <div className={'pdesc'+style}>
                  <p className={'pdinfo'+style}> {desc}
                  </p>
                </div>
                </Draggable>


                <Draggable>
                <div className={"pinfo"+style}>
                    <div className={"pinformation"+style}>
                      <i className={"fa-solid fa-phone pcicon"+style}></i>
                      <p>{phone}</p>
                    </div>
                    
                    <div className={"pinformation"+style}> 
                      <i className={"fa-solid fa-envelope pcicon"+style}></i> 
                      <p>{email}</p>
                    </div>
                    
                    <div className={"pinformation"+style}>
                      <i className={" fa-solid fa-location-dot pcicon"+style}></i>
                      <p>{address}</p>
                    </div>
                </div>

                </Draggable>
                  <Draggable>
                <div className={"qrInfo"+style}>
                <QRCode className='qr' size={80} value={qrValue} />

                </div>
                  </Draggable>

            <div >

          
          </div>

        </div>
            
            
      </div>
    </div>











        </div>
         </div>
    </>
  )
}

export default Form2
