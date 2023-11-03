import React, { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom' 
import post from "./Images/Profile-removebg-preview.png"
import "./styles.css"

const About = () => {

  const navigate = useNavigate();
  const [userData, setUserData] = useState([{'name':'','email':'','phone':'','work':''}]);

  const callAboutPage = async() => {
    try {
      const res = await fetch('/about', {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type":"application/json"
        },
        credentials:"include"
      });

      
      const data = await res.json();
      setUserData(data); 
      
      if (!res.status === 200)
      {
        const error = new Error(res.error);
        throw error;
        }
    }
    catch (err) {
      console.log(err);
      navigate('/signin');
    }
}

  useEffect(() => {
    callAboutPage();
  })

  return (
    <>
       < div className='abt'>
      <div className="wrapper login">
        <form className="form-right"  method='GET'>
            <img src={post} alt="logo"></img>
            
           
            
        </form>
          <div className="form-left"> 
              <div className='row'>
               <h2 className='aname'>{userData.name}</h2>
              </div>
              
              <div className='row'>
              <p className='arole'> { userData.work}</p>
              </div> 

              <div className='row'>
               <p className='arate'> Ranking 9/10</p>
            </div>  

            

            <hr></hr>
            
            <div className='row'>
                <h5>About</h5>
              <div className='col'>

                <div className='row'>
                <p> USER ID</p>
                </div> 

                <div className='row'>
                <p> Name</p>
                  </div>  
                  <div className='row'>
                <p> Email</p>
                </div> 

                <div className='row'>
                <p> Phone</p>
                  </div>   

                <div className='row'>
                <p> Proffesion</p>
                </div>  
              </div>

               <div className='col val'> 

                <div className='row'>
                <p > 123123123123</p>
                </div> 

                <div className='row'>
                  <p > { userData.name}</p>
                  </div>  
                  <div className='row'>
                <p >{ userData.email}</p>
                </div> 

                <div className='row'>
                <p >{ userData.phone}</p>
                </div>  
                
                  <div className='row'>
                <p > { userData.work}</p>
                </div> 
 
              </div>
            </div>
        </div>
        
        </div>
      </div>
    </>
  )
}

export default About
