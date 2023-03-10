import React, { useState, useContext } from 'react'
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import { CartContext } from '../CartContext'
import CartProduct from './CartProduct'
import { SearchBar } from './index'
import { Link } from 'react-router-dom'
import { RiAccountCircleFill } from 'react-icons/ri'
import { CgClose } from 'react-icons/cg'
import {
  FaCcAmex,
  FaCcVisa,
  FaCcMastercard,
  FaCcApplePay,
  FaGooglePay
} from 'react-icons/fa'
import {
  BsFillCartFill,
  BsInstagram,
  BsFacebook,
  BsYoutube
} from 'react-icons/bs'
import logo from '../assets/Logo.png'

const Navbar = () => {
  const [show, setShow] = useState(false)
  const [showCheckOut, setShowCheckOut] = useState(false)
  const cart = useContext(CartContext)
  const handleClose = () => setShow(false)
  const handleCheckOutClose = () => setShowCheckOut(false)
  const handleShow = () => setShow(true)
  const handleCheckOutShow = () => setShowCheckOut(true)

  const productCount = cart.items.reduce(
    (sum, product) => sum + product.quantity,
    0
  )

  return (
    <>
      <nav className=''>
        <div className='my-5 mx-5'>
          <div className='flex justify-center items-center'>
            <Link to='/' className='pr-3'>
              <img src={logo} alt='logo' className='w-48 h-auto' />
            </Link>
            <div className='relative w-2/4'>
              <SearchBar />
            </div>
            <Link to='/login'>
              <RiAccountCircleFill className='mx-2 text-primary-color w-10 h-10' />
            </Link>
            <Link className='relative ml-2 sm:ml-0' onClick={handleShow}>
              <span className='absolute top-0 right-0 font-bold px-1 bg-slate-900 text-white rounded-full'>
                {productCount}
              </span>
              <BsFillCartFill className='text-primary-color w-10 h-10' />
            </Link>
          </div>
        </div>

        <div className='navbar-links bg-primary-color text-white text-lg'>
          <div className='container flex flex-wrap justify-between mx-auto  py-5'>
            <div className='pages flex flex-wrap'>
              <Link className='p-2 sm:p-3 font-bold' to='/'>
                Home
              </Link>
              <Link className='p-2 sm:p-3 font-bold' to='/about'>
                About
              </Link>
              <Link className='p-2 sm:p-3 font-bold' to='/products'>
                Products
              </Link>
              <Link className='p-2 sm:p-3 font-bold' to='/location'>
                Location
              </Link>
              <Link className='p-2 sm:p-3 font-bold' to='/contact-us'>
                Contact Us
              </Link>
            </div>
            <div className='social-links flex '>
              <Link
                to='https://www.youtube.com/channel/UCq5X6cgj2ydu64zWluEDsLw'
                target='_blank'
              >
                <BsYoutube className='w-10 h-10 sm:w-11 sm:h-11 px-3 ' />
              </Link>
              <Link
                to='https://www.facebook.com/animehouse.co.nz'
                target='_blank'
              >
                <BsFacebook className='w-10 h-10 sm:w-11 sm:h-11 px-3 ' />
              </Link>
              <Link
                to='https://www.instagram.com/animehousenz/'
                target='_blank'
              >
                <BsInstagram className='w-10 h-10 sm:w-11 sm:h-11 px-3 ' />
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <div
        className={`fixed inset-0 w-full h-full z-10 ${
          show ? '' : 'invisible'
        }`}
      >
        <div
          className={`absolute inset-0 w-full h-full bg-gray-500 duration-500 ease-out transition-all ${
            show ? 'opacity-50' : 'opacity-0'
          }`}
          onClick={handleClose}
        ></div>
        <div
          className={`cart absolute xl:w-1/3 md:w-2/3 sm:w-2/3 w-full h-full bg-gray-200 right-0 top-0 duration-500 ease-out transition-all overflow-y-scroll ${
            show ? '' : 'translate-x-full'
          }`}
        >
          <div className='cart-title flex justify-between px-5 py-10 bg-primary-color text-white'>
            {' '}
            <h1 className='text-3xl font-extrabold'>Shopping Cart</h1>
            <button onClick={handleClose}>
              <CgClose className='font-extrabold text-3xl' />
            </button>
          </div>
          <div className='cart-body'>
            {productCount > 0 ? (
              <div className='p-10'>
                <h3 className='text-2xl font-bold text-slate-900 mb-5'>
                  Items in your Cart:
                </h3>
                {cart.items.map((currentProduct, index) => (
                  <CartProduct
                    currentProduct={currentProduct}
                    key={index}
                    handleClose={handleClose}
                  />
                ))}
                <div className='flex justify-between text-lg font-bold text-gray-900 mt-10'>
                  <p>Subtotal</p>
                  <p>${cart.getTotalCost().toFixed(2)}</p>
                </div>
                <p className='mt-0.5 text-sm text-gray-500'>
                  Shipping and taxes calculated at checkout.
                </p>
                <div className='mt-6'>
                  <a
                    className='flex items-center justify-center rounded-md border border-transparent bg-primary-color px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-red-700 cursor-pointer'
                    onClick={handleCheckOutShow}
                  >
                    Checkout
                  </a>
                </div>
              </div>
            ) : (
              <h1 className='text-2xl font-bold text-slate-900 mb-5 text-center m-10'>
                There are no items in your cart
              </h1>
            )}
          </div>
        </div>
      </div>
      <div
        className={`fixed inset-0 w-full h-full z-10 ${
          showCheckOut ? '' : 'invisible'
        }`}
      >
        <div
          className={`absolute inset-0 w-full h-full bg-gray-600 duration-500 ease-out transition-all ${
            showCheckOut ? 'opacity-50' : 'opacity-0'
          }`}
          onClick={handleCheckOutClose}
        ></div>
        <div
          className={`cart absolute sm:w-1/3 w-full h-2/4 bg-gray-200 right-0 top-0 left-0 bottom-0 m-auto duration-500 ease-out transition-all overflow-y-scroll rounded-lg p-10 ${
            showCheckOut ? '' : 'translate-y-full'
          }`}
        >
          <div className=''>
            <PayPalScriptProvider>
              <PayPalButtons />
            </PayPalScriptProvider>
            <button className='text-primary-color underline'>
              Ship to the billing Address
            </button>{' '}
            <br />
            <button className='text-primary-color underline'>
              Pick up at the Anime House Megastore
            </button>
            <div className='payment-icons flex justify-center mt-10 items-center'>
              <FaCcAmex className='w-14 h-14 p-3 text-blue-500' />
              <FaCcVisa className='w-14 h-14 p-3 text-blue-800' />
              <FaCcMastercard className='w-14 h-14 p-3 text-red-600' />
              <FaCcApplePay className='w-14 h-14 p-3 text-slate-600' />
              <FaGooglePay className='w-14 h-14 p-3 text-slate-800' />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
