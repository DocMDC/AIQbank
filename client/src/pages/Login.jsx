import React, {useState, useEffect, useRef} from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useLoginMutation } from "../redux/api/apiSlice"
import { setAuth } from '../redux/slices/authSlice'
import { useDispatch } from 'react-redux'

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function Login() {
  const [loginUser] = useLoginMutation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: ""
  })
  const errRef = useRef()
  const emailRef = useRef()
  const [validEmail, setValidEmail] = useState(false)
  const [emailFocus, setEmailFocus] = useState(false)
  const [errMsg, setErrMsg] = useState('')

  useEffect(() => {
    emailRef.current.focus()
  }, [])

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(loginForm.email))
  }, [loginForm.email])

  useEffect(() => {
    setErrMsg('')
  }, [loginForm.email, loginForm.password])

  function updateLoginForm(e) {
    const {name, value} = e.target
    setLoginForm(prev => {
        return ({
            ...prev,
            [name]: value
        })
    })
  }

  async function submitLoginForm(e) {
    e.preventDefault()
    const emailIsValid = EMAIL_REGEX.test(loginForm.email)

    if (!emailIsValid) {
      setErrMsg("Invalid email")
      return
    }

    try {
      const response = await loginUser({
        email: loginForm.email.toLowerCase(),
        password: loginForm.password
      }).unwrap()

      const accessToken = response.accessToken
      const roles = response.roles
      dispatch(setAuth({
        email: loginForm.email,
        roles: roles,
        accessToken: accessToken
      }))

      console.log(accessToken)
      console.log(roles)
      //setAuth({ loginForm.email, roles, accessToken })
      setLoginForm({
        email: "",
        password: ""
      })

      navigate("/dashboard")
    } catch (err) {
      if (err.status === 400) {
        //client error
        setErrMsg("Registration failed")
      } else {
          setErrMsg("Server failed. Please try again.")
      }
    }
  }

  return (
    <div className="below-header-height flex items-center justify-center">
      <div className="min-h-[500px] w-[325px] bg-secondary border-primary border rounded-md px-4 relative">
        <h1 className="font-serif text-center text-2xl border-b border-alternative pb-6 mt-6">Login</h1>
        <p ref={errRef} className={errMsg ? "pt-2 text-center text-red-500 absolute text-sm w-[294px]" : "hidden"}>{errMsg}</p>
        <form className="flex flex-col font-serif relative" onSubmit={submitLoginForm}>

          <label htmlFor="email" className="mt-12">Email<span className="text-red-600">*</span></label>
          <input
            type="email"
            id="email"
            ref={emailRef}
            name="email"
            value={loginForm.email}
            onChange={updateLoginForm}
            required
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
            className={emailFocus && loginForm.email.length > 0 && !validEmail ? "border border-gray-300 bg-secondary h-10 mt-2 px-2" : "border border-gray-300 bg-secondary h-10 mt-2 px-2 mb-6"}
            />
            <p className={emailFocus && loginForm.email.length > 0 && !validEmail ? "text-xs text-red-600 mt-2 mb-2" : "hidden"}>Must use valid email address.</p>

          <label htmlFor="password">Password<span className="text-red-600">*</span></label>
          <input
              type="password"
              id="password"
              name="password"
              value={loginForm.password}
              onChange={updateLoginForm}
              required
              className="border border-gray-300 bg-secondary h-10 mt-2 px-2 mb-6"
          />

          <h6 className="text-[12px] mb-6">Not a user? <span className="text-primary cursor-pointer hover:text-highlight"><Link to="/register">Register here.</Link></span></h6>

          <button className={!validEmail || loginForm.password.length === 0 ? "mx-auto w-56 flex items-center justify-center bg-gray-200 rounded-2xl h-12 p-2 text-black" : "primary-btn"} disabled={!validEmail ? true : false}>Submit</button>
        </form>
      </div>
    </div>
  )
}
