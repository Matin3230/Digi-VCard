import React,{useEffect,useState} from 'react'
import "./styles.css"
const Home = () => {

  const [userName, setUserName] = useState([{ name: '' }]);
  const [show, setShow] = useState(false);

  const userHomePage = async () => {
    try {
      const res = await fetch('/getData', {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      });

      
      const data = await res.json();
      setUserName({ name: data.name });
      setShow(true);
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    userHomePage();
  },[])


  return (
    <>
      <div className='containerh'>
        <div className='homediv'>

        <h3>{show ? 'Welcome to Digi-VCard': 'We Are MERN Developers'}</h3>
          {/* <p>WELCOME TO DIGI-VCARD</p> */}
          <h1>{ userName.name}</h1>
        </div>
      </div>
    </>
  )
}

export default Home
