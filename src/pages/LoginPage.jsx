/* eslint-disable no-unused-vars */
import axiosInstance from '../axios.jsx';
import { Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react"
import { useRef } from 'react';

const LoginPage = () => {
  const errRef = useRef();
  const navigate = useNavigate();

  const [pwd, setPwd] = useState('');
  const [email, setEmail] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setErrMsg('');
  }, [email, pwd])



  // const navigate = useNavigate();
  const submitForm = async () => {
    const loginData = {
      email: email,
      password: pwd,
    }
    console .log(loginData)
    // let servers = await axiosInstance.get("/server/get_all_servers")
    // console.log(servers)
    // return
    try {
      const response = await axiosInstance.post("/account/login", JSON.stringify(loginData), {
        headers: {'Content-Type': 'application/json'},
        withCredentials: true
      })
      console.log(response)
      setEmail('')
      setPwd('')
    } catch (error) {
      if(!error?.message){
        setErrMsg("No server response")
      } else if (errMsg.response?.status === 409) {
        // setErrMsg('Username Taken')
      } else {
        setErrMsg("Login Failed")
      }
      errRef.current.focus();
    }
    return
  }

  return (
    <div className="min-h-screen bg-bg_100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Shield className="w-12 h-12 text-indigo-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-text_100">
          QuietVPN
        </h2>
        <p className="mt-2 text-center text-sm text-text_200">
          Secure. Fast. Private.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="py-8 px-4 sm:rounded-lg sm:px-10">
          <div aria-live="assertive" ref={errRef} className={errMsg? `rounded-md mb-3 font-bold bg-white text-red-500 py-2 px-3 border-red-500 border` : ``}>
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
                  autoComplete="off"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
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
                  value={pwd}
                  onChange={(event) => setPwd(event.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>


            <div>
              <button
                type="submit"
                disabled={!pwd || !email ? true : false}
              className="w-full flex justify-center h-11 flex-center px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-text_200 bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:brightness-75 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={(e) => {
                  e.preventDefault();
                  // navigate("/home");
                  submitForm();
                }}
              >
                Log In
              </button>
            </div>
          </form>

          <div className='mt-10 flex flex-center '>
            <span className='text-text_200'>{"Don't have an acocunt?"} </span>
            <a href='' onClick={()=>navigate("/signup")} className='text-indigo-600 underline'>Sign Up</a>
          </div>
        </div>
      </div>
    </div>
  )
};


export default LoginPage;