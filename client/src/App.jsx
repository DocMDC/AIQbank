import React from 'react'
import { Routes, Route, Link } from "react-router-dom"
import PublicLayout from "./components/PublicLayout"
import Home from "./pages/Home"
import About from "./pages/About"
import Purchase from "./pages/Purchase"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Privacy from "./pages/Privacy"
import PrivateLayout from "./components/PrivateLayout"
import Dashboard from "./pages/Dashboard"
import MyExams from "./pages/MyExams"
import NewExam from "./pages/NewExam"
import Account from "./pages/Account"
import RequireAuth from "./components/RequireAuth"

const ROLES = {
  "admin": 94768,
  "teacher": 42805,
  "user": 19840
}

export default function App() {
  return (
    <div className="font-serif">
      <Routes>
        <Route to="/" element={<PublicLayout/>}>
          {/* public routes */}
          <Route index element={<Home/>}/>
          <Route path="about" element={<About/>}/>
          <Route path="purchase" element={<Purchase/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="register" element={<Register/>}/>
          <Route path="privacy" element={<Privacy/>}/>
        </Route>

          {/* protected routes */}
        <Route path="dashboard" element={<PrivateLayout/>}>
          <Route index element={<Dashboard/>}/>
          
          {/* testing auth routes */}
          <Route element={<RequireAuth allowedRoles={[ROLES.user, ROLES.admin, ROLES.teacher]} />}>
            <Route path="my-exams" element={<MyExams/>}/>
          </Route>
          
          <Route path="new-exam" element={<NewExam/>}/>
          <Route path="account" element={<Account/>}/>
        </Route>

      </Routes>
    </div>
  )
}
