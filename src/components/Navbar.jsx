import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
    <div className='text-3xl flex justify-between w-full items-center px-6 py-2 fixed top-0 z-50'>
    <NavLink to={"/"} className={'logo-font cursor-pointer tracking-tighter italic font-bold text-sp-color xl:text-4xl xl:hidden'}>Movie<span className='font-thin'>Shelf</span></NavLink>


    {/* <NavLink className={'most-font'}>Home</NavLink>
    <NavLink className={'most-font'}>Wishlist</NavLink> */}
    </div>

    <div className='bg-transparent w-full h-20 rounded-t fixed top-[-5px] z-50 hidden xl:block px-12 text-xl'>
      <div className="linkContainer flex justify-between h-full items-center">
      <NavLink to={"/"} className={'logo-font cursor-pointer tracking-tighter italic font-bold text-sp-color xl:text-4xl'}>Movie<span className='font-thin'>Shelf</span></NavLink>
        <NavLink to={"/"} className={({isActive}) => isActive? "text-[var(--special-color)]": ""}>Home</NavLink>
        <NavLink to={"/movies"} className={({isActive}) => isActive? "text-[var(--special-color)]": ""}>Movies</NavLink>
        <NavLink to={"/wishlist"} className={({isActive}) => isActive? "text-[var(--special-color)]": ""}>Wishlist</NavLink>
        <NavLink to={"/auth"} className={({isActive}) => isActive? "text-[var(--special-color)]": ""}><i className="ri-user-line text-3xl"></i></NavLink>
      </div>
    </div>
    <div className='xl:hidden  bg-[#083046] w-full h-20 rounded-t fixed bottom-[-5px] z-50'>
      <div className="linkContainer flex justify-evenly h-full items-center">
        <NavLink to={"/"} className={({isActive}) => isActive? "text-[var(--special-color)]": ""}><i className="ri-home-2-line text-3xl"></i></NavLink>
        <NavLink to={"/movies"} className={({isActive}) => isActive? "text-[var(--special-color)]": ""}><i className="ri-film-line text-3xl"></i></NavLink>
        <NavLink to={"/wishlist"} className={({isActive}) => isActive? "text-[var(--special-color)]": ""}><i className="ri-bookmark-line text-3xl"></i></NavLink>
        <NavLink to={"/auth"} className={({isActive}) => isActive? "text-[var(--special-color)]": ""}><i className="ri-user-line text-3xl"></i></NavLink>
      </div>
    </div>
    </>
  )
}

export default Navbar
