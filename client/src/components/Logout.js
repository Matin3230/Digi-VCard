import React, { useContext,useEffect } from 'react'
import { useNavigate } from 'react-router-dom' 
import { UserContext } from '../App';

const Logout = () => {
    
    const { state, dispatch } = useContext(UserContext);
    
    // PROMISES

    const navigate = useNavigate();
    useEffect(() => { 
        fetch('/logout', {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        }).then((res) => { 
            dispatch({type:"USER",payload:false})
            navigate('/signin')
              if (!res.status === 200) {
                 const error = new Error(res.error);
                throw error;
                }
        }).catch((err) => {
            console.log(err)
        })
    });

  return (
    < > 
          
    </>
  )
}

export default Logout
