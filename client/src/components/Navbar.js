import React, {useContext,useEffect } from 'react'
// import 'boostrap/dist/css/boostrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';
import './styles.css'
import logo from './Images/NAVLOGO1.png'
import { UserContext } from '../App';

const Navbar = () => {
    const {state,dispatch} = useContext(UserContext);

  const RednderMenu = () => {
    if (state)
    {
      return(
      <>
        <li className="nav-item">
        <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
        </li> 
        <li className="nav-item">
        <NavLink className="nav-link" to="/form">Form</NavLink>
        </li>
        <li className="nav-item">
        <NavLink className="nav-link" to="/about">About</NavLink>
        </li>
        <li className="nav-item">
        <NavLink className="nav-link" to="/contact">Contact</NavLink>
        </li>
                   
        <li className="nav-item">
        <NavLink className="nav-link" to="/logout">Logout</NavLink>
        </li> 
        </> 
      )

  
    }

    else
    {
      return(
       <>
        <li className="nav-item">
        <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
        </li> 
        <li className="nav-item">
        <NavLink className="nav-link" to="/about">About</NavLink>
        </li>
        <li className="nav-item">
        <NavLink className="nav-link" to="/contact">Contact</NavLink>
        </li>
         
        <li className="nav-item">
        <NavLink className="nav-link" to="/signin">Login</NavLink>
        </li>
        <li className="nav-item">
        <NavLink className="nav-link" to="/signup">Register</NavLink>
        </li> 
                   
         
        </>
      )
    }
  }

  useEffect(() => {
    RednderMenu();
  },[])
    
  return (
    <>
          <nav className="navbar navbar-expand-lg  "> 
              <img src={ logo} className='nav-logo' alt="logo"/>
                <NavLink className="navbar-brand" href="#"></NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav nav-mar "  >
                    
                    <RednderMenu/>
                </ul>
                
                </div> 
          </nav>
           
      
    </>
  )
}

export default Navbar
