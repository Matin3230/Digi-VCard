import React,{useEffect,useState} from 'react'

const Contact = () => {

  const [userData, setUserData] = useState([{ name: '', email: '', phone: '', message: '' }]);

  const userContact = async () => {
    try {
      const res = await fetch('/getData', {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      });

      
      const data = await res.json();
      setUserData({ ...userData, name: data.name, email: data.email, phone: data.phone });
      
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
    userContact();
  },[])

  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({...userData,[name]:value})
    console.log(userData)
  }

  // SENDING DATA TO BACKEND

  const contactForm = async(e) => {
    e.preventDefault();

    const { name, email, phone, message } = userData;
    try {
      
    
      const res = await fetch("/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name, email, phone, message
        })
      });

      const data = await res.json();

      if (!data) {
        window.alert("MESSAGE NOT SENT");
      }
      else {
        window.alert("MESSAGE SENT SUCCESSFULLY");
        setUserData({ ...userData, message: "" })
      }
    }
    catch (e)
    {
      console.log(e);
    }
    
  }

  return (
    < >
      <section id="contact" className="services">
 
    <div className="ccontainer" data-aos="zoom-in-up" data-aos-delay="100">
      <span className="big-circle"></span>
      <img className="square" alt="" />
      <div className="form">
        <div className="contact-info" data-aos="fade-right" data-aos-delay="400">
          <h3 className="title">Let's get in touch</h3>
          <p className="text">We'd love to hear from you!</p>

          <div className="info">
                <div className="information">
              <i className="fa-solid fa-phone cicon"></i>
              <p>7666878546</p>
            </div>
                <div className="information"> 
                  <i className="fa-solid fa-envelope cicon"></i> 
              <p>shaikhmatin3230@gmail.com</p>
            </div>
            <div className="information">
              <i className=" fa-solid fa-location-dot cicon"></i>
              <p>Kondhwa, Pune, India</p>
            </div>
          </div>

          {/* <div className="social-media">
            <p>Connect with us :</p>
            <div className="social-icons" data-aos="flip-up" data-aos-delay="700">
              <a href="#">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div> */}
        </div>

        <div className="contact-form">
          <span className="circle one"></span>
          <span className="circle two"></span>

          <form method="POST" name="contact"   data-aos="fade-left" data-aos-delay="400">
            <h3 className="title">Contact us</h3>
            <div className="input-container">
              <input type="text" name="name"  className="input"
                 value={userData.name} onChange={handleInputs} placeholder="Username" required />
            </div>
            <div className="input-container">
              <input type="email" name="email" placeholder="Email" className="input" pattern="[a-z0-9]{5,}@gmail.com$"
                title="example@gmail.com" value={userData.email} onChange={handleInputs} required />
            </div>
            <div className="input-container">
              <input type="number" name="phone" placeholder="Phone no" className="input" maxLength="10" value={userData.phone} onChange={handleInputs} pattern="[0-9]{10}$" />
            </div>
            <div className="input-container textarea">
              <textarea name="message" placeholder="message" className="input" value={userData.message} onChange={handleInputs} required></textarea>
            </div>
            <input type="submit" value="Send Message" className="btn" onClick={contactForm} />
          </form>
        </div>
      </div>
    </div>
  </section>
 
    </>
  )
}

export default Contact
