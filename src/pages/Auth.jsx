import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { set, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getUser, logoutUser } from '../store/action/userAction'


const Auth = () => {

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const userData = JSON.parse(localStorage.getItem("loggedInUser"))

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  async function submitHandler(data) {
    try {

      const loginRes = await toast.promise(
        axios.post("https://movieshelf-backend.onrender.com/auth/login", data, { withCredentials: true }),
        {
          pending: "Logging in...",
          success: "Login successful!",
          error: "Login failed!",
        }
      );

      await dispatch(getUser());
  
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  }

  const logoutHandler = () => {
    dispatch(logoutUser())
    toast.warn("User logged out!")
    navigate("/")
  }



  return (
    <div>

      {
        userData ? 
        <div className='h-screen w-full flex flex-col gap-6 justify-center items-center'>
         <div className="UserCard flex flex-col items-center border-1 border-[var(--card-border)] rounded py-4 px-6 bg-[var(--card-bg)]">
          <img className='w-15' src="/images/check.png" alt="" />
          <h2 className='font-bold font-mvt text-2xl'>User Logged in</h2>

          <div className="text mt-5 leading-none text-center">

          <h2 className='font-semibold text-lg text-[var(--special-color)]'>{userData.fullname}</h2>
          <p className='opacity-75'>{userData.username}</p>
          </div>

         </div>
          <button onClick={logoutHandler} className='px-4 py-2 bg-[var(--special-color)] rounded font-semibold'>Logout</button>

        </div> 
        :
        <div className='pb-26'>
        <img className='w-[80%] mx-auto mt-15' src="/images/login.png" alt="" />

<div className="heading px-4 tracking-tight">
  <h2 className='font-mvt text-5xl '>Login</h2>
  <p className='text-[var(--special-color)] mt-1'>Please sign in to continue</p>
</div>

<form onSubmit={handleSubmit(submitHandler)} className='px-4 mt-5 flex flex-col gap-2'>

<div className='username bg-[var(--card-bg)] px-4 py-3 rounded-full flex items-center gap-4'>
<i className="ri-user-line opacity-75 text-xl"></i>
<input {...register("username", {required : "Username is required."})} className="text-lg border-none outline-none" type="text" placeholder='username'/>
</div>
<small className='mx-auto text-[var(--special-color)]'>{errors?.username?.message}</small>

<div className='password bg-[var(--card-bg)] px-4 py-3 rounded-full flex items-center gap-4'>
<i className="ri-lock-password-line opacity-75 text-xl"></i>
<input {...register("password", {required : "Password is required."})} className="text-lg border-none outline-none" type="password" placeholder='password'/>
</div>
<small className='mx-auto text-[var(--special-color)]'>{errors?.password?.message}</small>

<button className='bg-[var(--special-color)] w-full px-4 py-3 rounded-full font-semibold text-xl' type='submit'>Sign in</button>
</form>

<Link to={"/register"}><p className='px-4 w-full text-center mt-2 text-sm'><span className='opacity-50'>Don't have account?</span> <span className='text-[var(--special-color)]'>Sign up</span></p></Link>
        </div>
      }

       

    </div>
  )
}

export default Auth
