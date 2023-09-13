import React from 'react'
import { Routes, Route, Link } from "react-router-dom"
import PublicLayout from "./components/PublicLayout"
import Home from "./pages/public/Home"
import About from "./pages/public/About"
import Purchase from "./pages/public/Purchase"
import Login from "./pages/public/Login"
import Register from "./pages/public/Register"
import Privacy from "./pages/public/Privacy"
import Missing from "./pages/public/Missing"
import UserLayout from "./components/UserLayout"
import StudentDashboard from "./pages/student/StudentDashboard"
import StudentExams from "./pages/student/StudentExams"
import StudentAccount from "./pages/student/StudentAccount"
import RequireAuth from "./components/RequireAuth"
import Unauthorized from "./pages/Unauthorized"
import TeacherLayout from "./components//TeacherLayout"
import TeacherDashboard from "./pages/teacher/TeacherDashboard"
import TeacherExams from "./pages/teacher/TeacherExams"
import TeacherNewExam from "./pages/teacher/TeacherNewExam"
import TeacherStudents from "./pages/teacher/TeacherStudents"
import TeacherAccount from "./pages/teacher/TeacherAccount"
import PersistLogin from "./components/PersistLogin"
import AdminLayout from "./components/AdminLayout"
import AdminDashboard from "./pages/admins/AdminDashboard"
import AllStudents from "./pages/admins/AllStudents"
import MyTeachers from "./pages/admins/MyTeachers"
import AdminAccount from "./pages/admins/AdminAccount"
import ArchitectLayout from "./components/ArchitectLayout"
import ArchitectDashboard from "./pages/architect/ArchitectDashboard"
import AllUsers from "./pages/architect/AllUsers"
import ResetPassword from "./pages/public/ResetPassword"
import ForgotPassword from "./pages/public/ForgotPassword"

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
          <Route path="dashboard" element={<UserLayout/>}>
            <Route element={<RequireAuth allowedRoles={[ROLES.user, ROLES.admin, ROLES.teacher, ROLES.architect]} />}>
              <Route index element={<StudentDashboard/>}/>
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.user, ROLES.admin, ROLES.teacher, ROLES.architect]} />}>
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
              <Route path="exams" element={<TeacherExams/>}/>
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.admin, ROLES.teacher, ROLES.architect]} />}>
              <Route path="new-exam" element={<TeacherNewExam/>}/>
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.admin, ROLES.teacher, ROLES.architect]} />}>
              <Route path="students" element={<TeacherStudents/>}/>
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.admin, ROLES.teacher, ROLES.architect]} />}>
              <Route path="account" element={<TeacherAccount/>}/>
            </Route>
          </Route>

          {/* admin-specific prviate routes */}
          <Route path="admin-dashboard" element={<AdminLayout/>}>
            <Route element={<RequireAuth allowedRoles={[ROLES.admin, ROLES.architect]} />}>
              <Route index element={<AdminDashboard/>}/>
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.admin, ROLES.architect]} />}>
              <Route path="teachers" element={<MyTeachers/>}/>
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.admin, ROLES.architect]} />}>
              <Route path="all-students" element={<AllStudents/>}/>
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.admin, ROLES.architect]} />}>
              <Route path="account" element={<AdminAccount/>}/>
            </Route>
          </Route>

          {/* architect-specific prviate routes */}
          <Route path="architect" element={<ArchitectLayout/>}>
            <Route element={<RequireAuth allowedRoles={[ROLES.architect]} />}>
              <Route index element={<ArchitectDashboard/>}/>
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.architect]} />}>
              <Route path="all-users" element={<AllUsers/>}/>
            </Route>
          </Route>

        </Route>

        <Route path="*" element={<Missing />} />
      </Routes>
    </div>
  )
}
