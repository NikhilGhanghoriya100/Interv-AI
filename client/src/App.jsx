import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import InterviewPage from './pages/InterviewPage'
import History from './pages/History'
import InterviewReport from './pages/InterviewReport'
import { useEffect } from 'react'
import axios from "axios";
import { useDispatch } from 'react-redux'
import { setUserData } from "./redux/userSlice";
import Pricing from "./pages/Pricing";


export const ServerUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:8000"

function App() {

  const dispatch = useDispatch()

  useEffect(()=>{
    const getUser = async () =>{
      try {
        const result = await axios.get(ServerUrl + "/api/user/current-user", {withCredentials:true})
        console.log("Current user:", result.data);

        dispatch(setUserData(result.data));

      } catch (error) {
        console.log(error)
      }
    }
    getUser()
  },[dispatch])

  return (
     <Routes>
        <Route path ='/' element={<Home/>}/>
        <Route path ='/auth' element={<Auth/>}/>
        <Route path ='/interview' element={<InterviewPage/>}/>
        <Route path ='/history' element={<History/>}/>
        <Route path ='/interview/report/:id' element={<InterviewReport/>}/>
        <Route path ='/pricing' element={<Pricing/>}/>
    </Routes>
  )
}
 
export default App;

