import { Link } from "react-router-dom"
import { IoCreateOutline } from "react-icons/io5";
import { useState } from "react";
import { userAuth } from "../Context/AuthContext";
import Header from "../Components/Header";
// import axios from 'axios'
// import toast from "react-hot-toast";
const Signup = () => {

  const auth = userAuth();
  const [registerData, setRegisterData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  })

  const handleChange = (e: any) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value })

  }

  const handleSubmit = async (e:any) => {
    e.preventDefault()
    try {
      await auth?.signup(registerData.firstname , registerData.lastname , registerData.email, registerData.password)
      setRegisterData({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
      })
    } catch (e) {
      console.log(e || "Error Occured")
    }
  }

  return (
    <div>
      <Header/>
      <section className="bg-transperent">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <section className=" bg-[url('https://img.freepik.com/free-photo/fun-3d-robot-winning_183364-120229.jpg')] relative flex h-38 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6 bg-cover bg-center">
          </section>

          <main
            className="flex flex-col items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-10 lg:py-12 xl:col-span-6"
          >
            <h1 className="text-4xl font-extrabold sm:mb-10 mb-4 sm:mt-2 mt-16 text-white text-center">Register</h1>
            <div className="max-w-xl lg:max-w-3xl">
              <form 
              onSubmit={handleSubmit}
              className="mt-8 grid grid-cols-6 gap-6">

                <div className="col-span-6 sm:col-span-3">

                  <label htmlFor="firstName" className="block text-sm font-medium text-white">
                    First Name
                  </label>

                  <input
                    type="text"
                    id="FirstName"
                    name="firstname"
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border-gray-200 p-2 outline-none bg-white text-sm text-black shadow-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="lastName" className="block text-sm font-medium text-white">
                    Last Name
                  </label>

                  <input
                    type="text"
                    id="LastName"
                    name="lastname"
                    onChange={handleChange}
                    className="mt-1 p-2 outline-none w-full rounded-md border-gray-200 bg-white text-sm text-black shadow-sm"
                  />
                </div>

                <div className="col-span-6">
                  <label htmlFor="email" className="block text-sm font-medium text-white"> Email </label>

                  <input
                    type="email"
                    id="Email"
                    name="email"
                    onChange={handleChange}
                    className="mt-1 p-2 outline-none w-full rounded-md border-gray-200 bg-white text-sm text-black shadow-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="password" className="block text-sm font-medium text-white"> Password </label>

                  <input
                    type="password"
                    id="Password"
                    name="password"
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md p-2 outline-none border-gray-200 bg-white text-sm text-black shadow-sm"
                  />
                </div>

                <div className="col-span-6">
                  <p className="text-sm text-gray-500">
                    By creating an account, you agree to our
                    <a href="#" className="text-gray-700 underline"> terms and conditions </a>
                    and
                    <a href="#" className="text-gray-700 underline">privacy policy</a>.
                  </p>
                </div>

                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <button
                    className="flex gap-2 shrink-0 rounded-md  bg-teal-600 px-12 py-3 text-sm font-medium  transition hover:bg-teal-700 text-black focus:outline-none focus:ring "
                    
                  >
                    Create an account
                    <IoCreateOutline className="w-5 h-4" />
                  </button>

                  <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                    Already have an account?
                    <Link to="/login" className="text-gray-700 underline"> Log in</Link>.
                  </p>
                </div>
              </form>
            </div>
          </main>
        </div>
      </section>
    </div>
  )
}

export default Signup
