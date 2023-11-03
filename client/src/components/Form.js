import React, { useState,useEffect} from 'react'
import {NavLink, useNavigate,Link} from 'react-router-dom'

import post1 from "./Images/Temp 1.png"
import post2 from "./Images/Temp 2.png"
import post3 from "./Images/Temp 3.png"
import post4 from "./Images/Temp 4.png"

 

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

const Form = () => {

    const navigate = useNavigate();


  const [inputValue, setInputValue] = useState(null); 
  const [clicked, setClicked] = useState(false);

  const handleInputChange1 = () => { 
    setInputValue('1'); 

    // setInputValue() 

  };
  
  const handleInputChange2 = () => {
    setInputValue('2'); 
    
  };

  const handleInputChange3 = () => {
    setInputValue('3');  
    
  };

  const handleInputChange4 = () => {
    setInputValue('4');  
  };
  
  const reload=()=>{
    if(inputValue!=null){
      navigate('/form2')
    }
  }

  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(inputValue))
    reload()

}, [inputValue]);
    
  return (
    <>
    <div className='frm1'>
     
   <div className="wrapper1">
        <div className="template">
            <div >
            <img src={post1} alt="logo" name='1'  onClick={handleInputChange1}></img>
            <Link to="\form2"></Link>
            </div>

            <div>
            <img src={post2} alt="logo" name='2'  onClick={handleInputChange2}></img>
            </div>

            <div>
            <img src={post3} alt="logo" name='3' onClick={handleInputChange3}></img>
            </div>

            <div>
            <img src={post4} alt="logo" name='4' onClick={handleInputChange4}></img>
            </div>
        </div>
        
        </div> 

        
         </div>

         
        
    </>
  )
}

export default Form
