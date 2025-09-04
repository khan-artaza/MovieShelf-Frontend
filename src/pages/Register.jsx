import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Register = () => {
  const {register, handleSubmit,  formState : {errors}} = useForm()
  const navigate = useNavigate()

  async function submitHandler(data){
    console.log(data);

    toast.promise(
     axios.post("https://movieshelf-backend.onrender.com/auth/register", data),
        {
          pending: "Registering user...",
          success: "Registration successful!",
          error: "Registration failed!",
        }
    )

    navigate("/auth")
    
  }

  return (
    <div className='overflow-x-hidden pb-26 xl:pb-0'>

        <img className='w-[75%] sm:w-[40%] xl:w-1/7 xl:mt-20 mx-auto mt-15' src="/images/register.png" alt="" />

        <div className="heading px-4 tracking-tight sm:text-center sm:px-8">
          <h2 className='font-mvt text-5xl '>Register</h2>
          <p className='text-[var(--special-color)] mt-1'>Please register to login</p>
        </div>

      <form onSubmit={handleSubmit(submitHandler)} className='px-4 sm:w-[70%] xl:w-1/4 sm:mx-auto mt-5 flex flex-col gap-2'>

        <div className='fullname bg-[var(--card-bg)] px-4 py-3 rounded-full flex items-center gap-4'>
        <input {...register("fullname", {required : "Fullname is required."})} className="text-lg border-none outline-none px-2" type="text" placeholder='fullname'/>
        </div>
        <small className='mx-auto text-[var(--special-color)]'>{errors?.fullname?.message}</small>

        <div className='username bg-[var(--card-bg)] px-4 py-3 rounded-full flex items-center gap-4'>
        <input {...register("username", {required : "Username is required."})} className="text-lg border-none outline-none px-2" type="text" placeholder='username'/>
        </div>
        <small className='mx-auto text-[var(--special-color)]'>{errors?.username?.message}</small>

        <div className='password bg-[var(--card-bg)] px-4 py-3 rounded-full flex items-center gap-4'>
        <input {...register("password", {required : "Password is required."})} className="text-lg border-none outline-none px-2" type="password" placeholder='password'/>
        </div>
        <small className='mx-auto text-[var(--special-color)]'>{errors?.password?.message}</small>


        <button className='bg-[var(--special-color)] w-full px-4 py-3 rounded-full font-semibold text-xl' type='submit'>Sign up</button>
      </form>

      <Link to={"/auth"}><p className='px-4 w-full text-center mt-2 text-sm'><span className='opacity-50'>Already have account?</span> <span className='text-[var(--special-color)]'>Sign in</span></p></Link>
      

    </div>
  )
}

export default Register
