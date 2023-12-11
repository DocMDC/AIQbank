import React from 'react'
import { Routes, Route, Link } from "react-router-dom"
import PublicLayout from "./components/PublicLayout"
import Home from "./pages/Home"
import About from "./pages/About"
import Purchase from "./pages//Purchase"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Privacy from "./pages/Privacy"
import Missing from "./pages/Missing"
import StudentLayout from "./components/StudentLayout"
import StudentDashboard from "./pages/student/StudentDashboard"
import StudentExams from "./pages/student/StudentExams"
import StudentCreateExam from "./pages/student/StudentCreateExam"
import StudentAccount from "./pages/student/StudentAccount"
import RequireAuth from "./components/RequireAuth"
import Unauthorized from "./pages/Unauthorized"
import TeacherLayout from "./components/TeacherLayout"
import TeacherDashboard from "./pages/teacher/TeacherDashboard"
import TeacherMyExams from "./pages/teacher/TeacherMyExams"
import TeacherCreateExam from "./pages/teacher/TeacherCreateExam"
import TeacherStudents from "./pages/teacher/TeacherStudents"
import TeacherAccount from "./pages/teacher/TeacherAccount"
import TeacherDocuments from "./pages/teacher/TeacherDocuments"
import PersistLogin from "./components/PersistLogin"
import ResetPassword from "./pages/ResetPassword"
import ForgotPassword from "./pages/ForgotPassword"

const ROLES = {
  "architect": 9498281420294,
  "admin": 94768,
  "teacher": 42805,
  "user": 19840
}

export default function App() {
  return (
    <div className="font-serif">
      <Routes>
          {/* public routes */}
        <Route to="/" element={<PublicLayout/>}>
          <Route index element={<Home/>}/>
          <Route path="about" element={<About/>}/>
          <Route path="purchase" element={<Purchase/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="register" element={<Register/>}/>
          <Route path="privacy" element={<Privacy/>}/>
          <Route path="reset/:id" element={<ResetPassword/>}/>
          <Route path="forgot-password" element={<ForgotPassword/>}/>
        </Route>

          {/* student-specific private routes */}
        <Route element={<PersistLogin />}>
          <Route path="dashboard" element={<StudentLayout/>}>
            <Route element={<RequireAuth allowedRoles={[ROLES.user, ROLES.admin, ROLES.teacher, ROLES.architect]} />}>
              <Route index element={<StudentDashboard/>}/>
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.user, ROLES.admin, ROLES.teacher, ROLES.architect]} />}>
              <Route path="create-exam" element={<StudentCreateExam/>}/>
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.admin, ROLES.teacher, ROLES.architect]} />}>
              <Route path="my-exams" element={<StudentExams/>}/>
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.user, ROLES.admin, ROLES.teacher, ROLES.architect]} />}>
              <Route path="account" element={<StudentAccount/>}/>
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.user, ROLES.admin, ROLES.teacher, ROLES.architect]} />}>
              <Route path="unauthorized" element={<Unauthorized/>}/>
            </Route>
          </Route>

            {/* teacher-specific private routes */}
          <Route path="teacher-dashboard" element={<TeacherLayout/>}>
            <Route element={<RequireAuth allowedRoles={[ROLES.admin, ROLES.teacher, ROLES.architect]} />}>
              <Route index element={<TeacherDashboard/>}/>
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.admin, ROLES.teacher, ROLES.architect]} />}>
              <Route path="my-exams" element={<TeacherMyExams/>}/>
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.admin, ROLES.teacher, ROLES.architect]} />}>
              <Route path="create-exam" element={<TeacherCreateExam/>}/>
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.admin, ROLES.teacher, ROLES.architect]} />}>
              <Route path="documents" element={<TeacherDocuments/>}/>
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.admin, ROLES.teacher, ROLES.architect]} />}>
              <Route path="students" element={<TeacherStudents/>}/>
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.admin, ROLES.teacher, ROLES.architect]} />}>
              <Route path="account" element={<TeacherAccount/>}/>
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<Missing />} />
      </Routes>
    </div>
  )
}
