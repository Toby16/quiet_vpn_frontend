/* eslint-disable no-unused-vars */
import axios from 'axios';
import { Ghost, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react"
import { useRef } from 'react';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import { useAuth } from '../components/AuthProvider.jsx';
import axiosInstance from '../axios.jsx';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/

const SignUpPage = () => {
  const aRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();
  const { signup } = useAuth()

  const [awaitingResponse, setAwaitingResponse] = useState(false)

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false)
  const [userFocus, setUserFocus] = useState(false)

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user])

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email])

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd])

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd, matchPwd])



  // const navigate = useNavigate();
  const submitForm = async () => {
    // if button enabled with JS hack
    const test1 = USER_REGEX.test(user);
    const test2 = PWD_REGEX.test(pwd);
    if (!test1 || !test2) {
      setErrMsg("Invalid Entry");
      return;
    }


    const signupData = {
      email: email,
      username: user,
      password: pwd,
    }

    console.log(signupData)

    try {
      setAwaitingResponse(true)
      await signup(signupData, "/")
      setAwaitingResponse(false)
    } catch (error) {
      setAwaitingResponse(false)
      if (!error?.message) {
        setErrMsg("No server response")
      } else if (error.response?.status === 400) {
        setErrMsg('Account already exists')
      } else {
        setErrMsg("Registration Failed")
      }
      errRef.current.focus();
    }
    return
  }

  return (
    <div className="min-h-screen bg-bg_100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Ghost className="w-12 h-12 text-indigo-600" onClick={() => {
            // navigate("/home")
            setEmail("alfredvachila@gmail.com");
            setUser("Valentine")
            setPwd("@Plantains123")
          }} />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-text_100">
          GhostRoute VPN
        </h2>
        <p className="mt-2 text-center text-sm text-text_200">
          Secure. Fast. Private.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="py-8 px-4 sm:rounded-lg sm:px-10">
          <div aria-live="assertive" ref={errRef} className={errMsg ? `rounded-md mb-3 font-bold bg-white text-red-500 py-2 px-3 border-red-500 border` : ``}>
            {errMsg}
          </div>
          <form className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text_200">
                Email address
              </label>
              <div className="mt-1">
                <input
                  // onChange={}
                  id="email"
                  name="email"
                  type="email"
                  required
                  aria-invalid={validEmail ? "false" : "true"}
                  aria-describedby="emailnote"
                  onChange={(event) => setEmail(event.target.value)}
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <p id="emailnote" className={emailFocus && email && !validEmail ? "bg-bg_300 text-text_100 py-3 px-4 rounded-md leading-tight" : "hidden"}>
                <Info />
                Not a valid email address
              </p>
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-text_200">
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  ref={aRef}
                  required
                  aria-invalid={validName ? "false" : "true"}
                  aria-describedby="uidnote"
                  onChange={(event) => setUser(event.target.value)}
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                  className=" appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <p id="uidnote" className={userFocus && user && !validName ? "bg-bg_300 text-text_100 py-3 px-4 rounded-md leading-tight" : "hidden"}>
                <Info />
                4 to 24 characters.<br />
                Must begin with a letter.<br />
                Letters, numbers, underscores, hyphens allowed.
              </p>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-text_200">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  aria-invalid={validPwd ? "false" : "true"}
                  aria-describedby="pwdnote"
                  onChange={(event) => setPwd(event.target.value)}
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <p id="pwdnote" className={pwdFocus && !validPwd ? "bg-bg_300 text-text_100 py-3 px-4 rounded-md leading-tight" : "hidden"}>
                <Info />
                8 to 24 characters.<br />
                Must include uppercase and lowercase letters, a number and a special character.<br />
                Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
              </p>
            </div>


            <div>
              <button
                type="submit"
                disabled={!validName || !validPwd || !validEmail ? true : false}
                className="w-full flex justify-center h-11 flex-center px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-text_200 bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:brightness-75 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={(e) => {
                  e.preventDefault();
                  submitForm();
                }}
              >
                {
                  awaitingResponse ?
                    <LoadingSpinner />
                    :
                    "Sign up"
                }
              </button>
            </div>
          </form>

          <div className='mt-10 flex flex-center '>
            <span className='text-text_200'>Already have an account? </span>
            <a href='/login' onClick={(e) => { e.preventDefault(); navigate("/login") }} className='text-indigo-600 underline'>Log In</a>
          </div>
        </div>
      </div>
    </div>
  )
};


export default SignUpPage;