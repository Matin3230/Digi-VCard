import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom' 
import { UserContext } from '../App';


const SignIn = () => {

  const {state,dispatch} = useContext(UserContext);

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const loginUser = async(e) => {
    e.preventDefault();

    const res = await fetch('/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email, password
      })
      
    });

     const data = await res.json();
        
    if (res.status === 400 || !data)
    {
      window.alert("INVALID CREDENTIALS");
    }
    else
    {
      dispatch({type:"USER",payload:true})
      window.alert("LOGIN SUCCESSFULL");
      navigate('/');
      
    }
    

  }
  return (
    < >
     < div className='frm'>
      <div className="wrapper login">
        <form method='POST' className="form-right">
            <h2 className="text-uppercase">Login</h2>
            
          <div className="row">
              <div className="col-sm-6 mb-3 linformation">  
                 <i className="fa-solid fa-envelope licon"></i>
                    <input type="email" name="email" id="email" className="input-field" placeholder='Your Email' autoComplete='off' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </div> 
          </div> 
            <div className="row"> 
              <div className="col-sm-6 mb-3"> 
                <div className="col-sm-6 mb-3 linformation">  
                <i className="fa-solid fa-lock licon"></i>
                    <input type="password" name="password" id="password" className="input-field" placeholder='Password' autoComplete='off' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                </div>
          </div> 
            <div className="form-field">
              <input type="submit" value="Login" className="register" name="signin" onClick={loginUser} />
            </div>
        </form>
        <div className="form-left">
            <h2 className="text-uppercase">information</h2>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et molestie ac feugiat sed. Diam volutpat commodo.
            </p> 
            <div className="form-field">
            <NavLink className="nav"to="/signup">Create an Account?</NavLink>    
            </div>
        </div>
        
        </div>
      </div>
    </>
  )
}

export default SignIn
