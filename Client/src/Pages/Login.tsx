import { Link } from "react-router-dom"
import { IoIosLogIn } from "react-icons/io";
import { useState } from "react";
import { userAuth } from "../Context/AuthContext";
import Header from "../Components/Header";

function Login() {
  const auth = userAuth();
  const [loginData , setLoginData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e:any) => {
    setLoginData({...loginData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      await auth?.login(loginData.email , loginData.password)
    } catch (error) {
      console.log(error || "Error Occured")
    }
  }
  return (
    <>
    <Header/>
        <section className="bg-transperent">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <section className=" bg-[url('https://img.freepik.com/free-photo/fun-3d-robot-winning_183364-120229.jpg')] relative flex h-38 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6 bg-cover bg-center">
          </section>

          <main
            className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
          >
            <div className="max-w-xl lg:max-w-3xl">
              <form 
              onSubmit={handleSubmit}
              className="sm:mt-2 mt-20 grid grid-cols-3 gap-6">
                <div className="col-span-6 sm:col-span-5">
                <h1 className="text-4xl font-extrabold mb-10 text-white text-center">Login</h1>
                  <label htmlFor="Email" className="block text-sm font-medium text-white"> Email </label>

                  <input
                    type="email"
                    id="Email"
                    name="email"
                    onChange={handleChange}
                    className="mt-1 p-2 outline-none w-full rounded-md border-gray-200 bg-white text-sm text-black shadow-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-5">
                  <label htmlFor="Password" className="block text-sm font-medium text-white"> Password </label>

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
                    className=" shrink-0 rounded-md  bg-teal-600 px-12 py-3 text-sm font-medium  transition hover:bg-teal-700 text-black focus:outline-none focus:ring flex gap-2"
                  >
                    Login Account
                    <IoIosLogIn className="w-5 h-5 "/>
                  </button>

                  <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                    Create New Account?
                    <Link to="/signup" className="text-gray-700 underline"> Sign up</Link>.
                  </p>
                </div>
              </form>
            </div>
          </main>
        </div>
      </section>
      </>
  )
}

export default Login
