import React, { useState} from 'react'
import {NavLink, useNavigate} from 'react-router-dom'

import validator from 'validator'
const SignUp = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState({ name: "", email: "", phone: "", work: "", password: "", cpassword: "" });

    let name, value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;
        
        setUser({...user,[name]:value})
        // console.log(user);
        
    } 
    
    const postData =  async(e) => {
        e.preventDefault();
        const { name, email, phone, work, password, cpassword } = user;
        
        if(!validator.isEmail(email) ) 
      {
        alert('Please Enter Valid Email');
      } 
      
     else if(!validator.isMobilePhone(phone)){
        alert('Please Enter Valid Phone');
      }
      else{

      
        const res = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, phone, work, password, cpassword
            })
        });
        
        const data = await res.json();
        
        if (data.status === 422 || !data)
        {
            window.alert("INVALID REGISTRATION");
            
        }
        else
        {
            window.alert(" REGISTRATION SUCCESSFULL");
            navigate('/signin');
        }
    }
    }

    
  return (
    <>
      <div className='frm'>

     
   <div className="wrapper">
        <div className="form-left">
            <h2 className="text-uppercase">information</h2>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et molestie ac feugiat sed. Diam volutpat commodo.
            </p>
            <p className="text">
                <span>Sub Head:</span>
                Vitae auctor eu augudsf ut. Malesuada nunc vel risus commodo viverra. Praesent elementum facilisis leo vel.
            </p>
            <div className="form-field">
            <NavLink className="nav"to="/signin">Already Have Account?</NavLink>    
            </div>
        </div>
        <form method="POST" className="form-right">
            <h2 className="text-uppercase">Registration form</h2>
            <div className="row">
                <div className="col-sm-6 mb-3 linformation"> 
                    <i className="fa-solid fa-user licon"></i>
                    <input type="text" name="name" id="name" className="input-field"placeholder='Your Name'   value={user.name}
                              onChange={handleInputs}/>
                </div> 
          </div>
          <div className="row">
              <div className="col-sm-6 mb-3 linformation"> 
                  <i className="fa-solid fa-envelope licon"></i>
                              <input type="email" name="email" id="email" className="input-field" placeholder='Your Email'  value={user.email}
                              onChange={handleInputs} />
                </div> 
          </div>
          <div className="row">
                <div className="col-sm-6 mb-3 linformation"> 
                    <i className="fa-solid fa-phone licon"></i>
                    <input type="number" name="phone" id="phone" className="input-field"placeholder='Mobile Number'   value={user.phone}
                              onChange={handleInputs} />
                </div> 
            </div>
            <div className="row">
                <div className="col-sm-6 mb-3 linformation"> 
                <i className="fa-solid fa-briefcase licon"></i>
                <input type="text" className="input-field" name="work" id="work" placeholder='Your Profession'   value={user.work}
                              onChange={handleInputs}/>
                          </div> 
            </div>
            <div className="row">
                <div className="col-sm-6 mb-3 linformation">  
                <i className="fa-solid fa-lock licon"></i>
                    <input type="password" name="password" id="password" className="input-field" placeholder='Password'  value={user.password}
                              onChange={handleInputs}/>
                </div>
          </div>
          <div className="row">

                <div className="col-sm-6 mb-3 linformation"> 
                    <i className="fa-solid fa-lock licon"></i>
                    <input type="password" name="cpassword" id="cpassword" className="input-field" placeholder='Confirm Password'   value={user.cpassword}
                              onChange={handleInputs}/>
                </div>
          </div> 
            <div className="form-field">
                <input type="submit" value="Register" className="register" onClick={postData} name="signup"/>
            </div>
        </form>
        </div>
         </div>
    </>
  )
}

export default SignUp
