import React, { createContext, useReducer } from 'react'
import Navbar from './components/Navbar'
// import Home from './components/Home'
import Home from './components/Home'
import {Route, Routes} from 'react-router-dom'
import Contact from './components/Contact'
import About from './components/About'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Logout from './components/Logout'
import Form from './components/Form'
import Form2 from './components/Form2'
import ErrorPage from './components/ErrorPage'

import {initialState,reducer} from "../src/reducer/UseReducer"

export const UserContext = createContext();




const App = () => {
  
  const[state,dispatch]=useReducer(reducer,initialState)

  return (
    <>
      <UserContext.Provider value={{state,dispatch}}>

      
      <Navbar />   
 
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/form" element={<Form />} />
        <Route path="/form2" element={<Form2 />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/logout" element={<Logout />} />
        <Route path=":id" element={ <ErrorPage  />}> </Route>
        </Routes>
       
      </UserContext.Provider>
    </>
  )
}

export default App
