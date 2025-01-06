import { Link, useNavigate } from "react-router-dom"
import { userAuth } from "../Context/AuthContext.tsx"
import { MdStart } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Components/Header.tsx";

function Home() {
  const navigate = useNavigate();
  // @ts-ignore
  const [userToken, setUserToken] = useState("");
  const { isAuthenticated, setIsAuthenticated }: any = userAuth();



  const getData = async () => {
    try {
      const response = await axios.get('/api/user/verify');
      if (response.status !== 200) {
        navigate("/login")
      }
      navigate("/")
      setUserToken(response.data)
      setIsAuthenticated(true)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        window.location.href = '/login';
      }
    }
  }


  useEffect(() => {
    getData()
  }, [])
  return (
    <>
    <Header/>
    <div>
      <section className="bg-transperent text-white">
        <div className="mx-auto w-full px-4 py-24 flex flex-col lg:h-[90vh] lg:items-center">
          <div className="mx-auto  text-center ">
            <img src="/ChatBot.webp" alt="ChatBot" className="my-4 w-60 text-2 mx-auto" />
            <h1
              className="bg-gradient-to-r  from-green-300 via-blue-500 to-purple-600 bg-clip-text text-2xl font-extrabold text-transparent sm:text-4xl"
            >
              Welcome to SmartTalk

              <span className="sm:block mt-2"> Your AI-Powered Chat Companion</span>
            </h1>

            <div className="sm:mt-8 mt-6 w-full flex flex-col flex-wrap justify-center gap-4">
              {
                isAuthenticated ? <>
                  <Link
                    className="flex gap-2 rounded mx-auto bg-[#0ea5e9] px-20 py-3 text-sm font-medium text-white hover:bg-[#0a7eb4] hover:text-white  focus:ring active:text-opacity-75 sm:w-[40%] transition-all"
                    to="/chat"
                  >
                    Go To Chat
                    <MdStart className="w-5 h-5" />
                  </Link>
                </> : <>
                  <Link
                    className="flex gap-2 rounded mx-auto bg-[#0ea5e9] px-20 py-3 text-sm font-medium text-black hover:bg-[#0f9fe1] hover:text-black  focus:ring active:text-opacity-75 sm:w-[40%] transition-all"
                    to="/login"
                  >
                    Get Started
                    <MdStart className="w-5 h-5" />
                  </Link>
                </>
              }
            </div>
            {/* <div>
              <img src="https://img.freepik.com/premium-photo/chatbot-conversation-assistant-3d-render-style-ai-generated-illustration_145713-8335.jpg" alt="Image" className="w-[98%] h-[94%] my-16 rounded-lg text-2 bg-center" />
            </div> */}
          </div>
        </div>
      </section>

    </div>
    </>
  )
}

export default Home
// https://img.freepik.com/premium-photo/chatbot-conv ersation-assistant-3d-render-style-ai-generated-illustration_145713-8335.jpg