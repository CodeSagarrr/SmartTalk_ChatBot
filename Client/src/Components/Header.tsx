import { Link, useNavigate } from "react-router-dom"
import '../App.css'
import { userAuth } from "../Context/AuthContext"
function Header() {
  const navigate = useNavigate()
  const { isAuthenticated, logout, activeUser , firstLetter}: any = userAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login")
      window.location.href = "/login"
    } catch (error) {
      console.log(error || "Error occured")
    }
  }

  return (
    <div>
      <header className="bg-transparent py-2">

        <div className="mx-auto flex justify-between lg:justify-between  h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-4 ">
          <Link className=" text-[#0ea5e9] flex sm:flex-row flex-col sm:gap-2 gap-1 items-center" to="/">
            <img src={"/ChatBot.webp"} alt="ChatBot" width={50} className="sm:block hidden" />
            <span className="font-extrabold text-2xl text">SmartTalk</span>
          </Link>

          <div className="flex  items-center justify-between md:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex gap-4 items-center">

                <div>
                  <Link to={"/login"}
                    className="block rounded-md bg-[#0ea5e9] sm:px-5 px-4 py-2.5 text-sm font-medium text-black transition hover:bg-[#0396da] "
                  >
                    Login
                  </Link>
                </div>

                {
              activeUser?.userId &&  activeUser ? <div className="avatar">
                    {firstLetter}
                  </div> : <div ></div>
                }

                <div>
                  {
                    isAuthenticated ? <button
                      className=" rounded-md bg-gray-900 hover:bg-gray-950 transition-all sm:px-5 px-4 py-2.5 text-sm  text-white sm:block "
                      onClick={handleLogout}
                    >
                      Logout
                    </button> :<Link to={"/signup"}
                      className=" rounded-md bg-gray-900 hover:bg-gray-950 transition-all px-5 sm:py-2.5 py-3  text-sm  text-white sm:block"
                    >
                      Register
                    </Link>
                  }
                </div>

              </div>


            </div>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Header


