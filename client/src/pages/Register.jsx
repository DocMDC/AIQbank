import React, {useState, useRef, useEffect} from "react"
import { Link, useNavigate } from "react-router-dom"
import { useRegisterMutation } from "../redux/api/apiSlice"

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export default function Register() {
    const [registerUser, {isLoading} ] = useRegisterMutation()
    const navigate = useNavigate()
    
    const [registerForm, setRegisterForm] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    })

    const emailRef = useRef()
    const errRef = useRef()

    const [validEmail, setValidEmail] = useState(false)
    const [emailFocus, setEmailFocus] = useState(false)

    const [pwdFocus, setPwdFocus] = useState(false)
    const [validPwd, setValidPwd] = useState(false)

    const [validMatch, setValidMatch] = useState(false)
    const [confirmPwdFocus, setConfirmPwdFocus] = useState(false)

    const [errMsg, setErrMsg] = useState('')    

    useEffect(() => {
        emailRef.current.focus()
    }, [])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(registerForm.email))
    }, [registerForm.email])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(registerForm.password))
        setValidMatch(registerForm.password === registerForm.confirmPassword)
    }, [registerForm.password, registerForm.confirmPassword])
    
    useEffect(() => {
        setErrMsg('')
    }, [registerForm.email, registerForm.password, registerForm.confirmPassword])

    function updateRegisterForm(e) {
        const {name, value} = e.target
        setRegisterForm(prev => {
            return ({
                ...prev,
                [name]: value
            })
        })
    }

    async function submitRegisterForm(e) {
        e.preventDefault()
        const emailIsValid = EMAIL_REGEX.test(registerForm.email)
        const passwordIsValid = PWD_REGEX.test(registerForm.password)

        if (!emailIsValid || !passwordIsValid) {
            setErrMsg("Invalid Entry")
            return
        }
        
        try {
            await registerUser ({ 
                email: registerForm.email.toLowerCase(),
                password: registerForm.password
            }).unwrap()

            setRegisterForm({
                email: "",
                password: "",
                confirmPassword: ""
            })

            navigate("/dashboard")

        } catch (err) {
            if (err.status === 400) {
                // client error
                setErrMsg("Registration failed")
            } else if (err.status === 409) {
                // email already registered
                setErrMsg(err.data.message)
            } else {
                setErrMsg("Server failed. Please try again.")
            }
        }
    }

    return (
        <div className="below-header-height flex items-center justify-center">
            <div className="min-h-[625px] w-[325px] bg-secondary border-primary border rounded-md px-4 relative">
                <h1 className="text-center text-2xl border-b border-alternative pb-6 mt-6">Register</h1>
                <p ref={errRef} className={errMsg ? "pt-2 text-center text-red-500 absolute text-sm w-[294px]" : "hidden"}>{errMsg}</p>
                <form className="flex flex-col  relative" onSubmit={submitRegisterForm}>
                    <label htmlFor="email" className="mt-12">Email<span className="text-red-600">*</span></label>
                    <input
                        type="email"
                        id="email"
                        ref={emailRef}
                        name="email"
                        value={registerForm.email}
                        onChange={updateRegisterForm}
                        required
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                        className={emailFocus && registerForm.email.length > 0 && !validEmail ? "border border-gray-300 bg-secondary h-10 mt-2  px-2" : " border border-gray-300 bg-secondary h-10 mt-2  px-2 mb-6"}
                    />
                    <p className={emailFocus && registerForm.email.length > 0 && !validEmail ? "text-xs text-red-600 mt-2 mb-2" : "hidden"}>Must use valid email address.</p>
                    <label htmlFor="password">Password<span className="text-red-600">*</span></label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={registerForm.password}
                        onChange={updateRegisterForm}
                        required
                        className={pwdFocus && !validPwd ? "border border-gray-300 bg-secondary h-10 mt-2 px-2" : "border border-gray-300 bg-secondary h-10 mt-2 px-2 mb-6"}
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                    />
                    <p className={pwdFocus && !validPwd ? "text-red-600 text-xs mt-2 mb-2" : "hidden"}>8 to 24 characters. Must include uppercase and lowercase letters, a number, and a special character. 
                    <br />
                    Allowed special characters: ! @ # $ % 
                    </p>
                    <label htmlFor="confirmPassword">Confirm Password<span className="text-red-600">*</span></label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={registerForm.confirmPassword}
                        onChange={updateRegisterForm}
                        required
                        onFocus={() => setConfirmPwdFocus(true)}
                        onBlur={() => setConfirmPwdFocus(false)}
                        className={confirmPwdFocus && !validMatch ? "border border-gray-300 bg-secondary h-10 mt-2  px-2" : "border border-gray-300 bg-secondary h-10 mt-2  px-2 mb-6"}
                    />
                    <p className={confirmPwdFocus && !validMatch ? "text-red-600 text-xs mt-2 mb-2" : "hidden"}>Must match the first password input field.</p>
                    <h6 className="text-[12px] mb-6">Already a user? <span className="text-primary cursor-pointer hover:text-highlight"><Link to="/login">Login here.</Link></span></h6>
                    <h6 className="text-[12px] mb-8">By clicking submit, I acknowledge receipt of the DeepMindQbank, inc. 
                    <Link to='/privacy'>
                        <span className="text-primary cursor-pointer hover:text-highlight"> privacy policy</span>
                    </Link>
                    .</h6>

                    <button className={!validEmail || !validPwd || !validMatch ? "mx-auto w-56 flex items-center justify-center bg-gray-200 rounded-2xl h-12 p-2 text-black" : "primary-btn"} disabled={!validEmail || !validPwd || !validMatch ? true : false}>Submit</button>
                </form>
            </div>
        </div>
    )
}

