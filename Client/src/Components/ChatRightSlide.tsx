import { IoMdSettings } from "react-icons/io";
import { userAuth } from "../Context/AuthContext"
import { FaRobot } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import { MdOutlineClear } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { SlArrowUpCircle } from "react-icons/sl";
import { CgAttachment } from "react-icons/cg";
import ChatBox from "./ChatBox";
import { getAllChat, getChatResponse } from "../api/AuthMange";
import toast from "react-hot-toast";

type UserMessage = {
    role: "user" | "assistant",
    content: string,
}

function ChatRightSlide({ setMessage, message }: any) {
    const { firstLetter, activeUser, logout, isAuthenticated }: any = userAuth();
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const navigate = useNavigate();
    const inputRef = useRef<HTMLInputElement | null>(null);
    console.log(message)

    const section = [
        { id: 1, title: "SmartTalk", icon: FaRobot, path: "/" },
        { id: 2, title: "Settings", icon: IoMdSettings, path: "" },
    ]


    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login")
        } catch (error) {
            console.log(error || "Error occured")
        }
    }

    const getBotResponse = () => {
        if (activeUser && activeUser.userId) {
            getAllChat()
                .then((res) => {
                    setMessage([...res.userChat]);
                }).catch(err => console.log(err))
        }
    }

    const handlesumbmit = async () => {
        const content = inputRef.current?.value as string;
        console.log(prompt)
        if (!prompt) {
            return toast.error("Type something ...");
        }
        // Clear the input field
        if (inputRef && inputRef?.current) {
            inputRef.current.value = "";
        }
        // Add the user's message to the state
        const userMessage: UserMessage = { role: "user", content };
        console.log(userMessage);
        setMessage((prev:any) => [...prev , userMessage]);
        // Fetch bot response from the server
        const getMessage = await getChatResponse(content);
        // Add the bot's message to the state
        const botMessage: UserMessage = { role: "assistant", content: getMessage.content };
        setMessage([...botMessage.content]);
        getBotResponse();
    }

    useEffect(() => {
        getBotResponse();
    }, [activeUser, isAuthenticated])
    return (
        <div className="w-full h-[100%] ">
            <div className=" w-full flex items-end justify-end">
                <div className="w-full flex justify-start items-start">
                    <h1 className="font-extrabold text-3xl text text-[#0ea5e9] sm:ml-6 ml-2">SmartTalk</h1>
                </div>
                <div className={`avatar cursor-pointer mr-2 ${openMenu ? 'text-3' : ''}`}
                    onClick={() => setOpenMenu(!openMenu)}
                >
                    {openMenu ? <MdOutlineClear /> : `${firstLetter}`}
                </div>
            </div>
            {/* {Menu} */}
            <div className=" z-10 absolute top-16 right-[0.8%]">
                {
                    openMenu ? <div className=" w-[20rem] sm:h-[27vh] h-[27vh] bg-[#2F2F2F] rounded-lg p-4">
                        {
                            section.map((curr, i) => (
                                <div key={i} className='flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-[#424242]'
                                    onClick={() => navigate(curr.path)}
                                >
                                    <curr.icon className='w-5 h-5 text-white' />
                                    <span className='text-[#CBCBCB] font-semibold'>{curr.title}</span>
                                </div>
                            ))
                        }
                        <div className='flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-[#424242] font-semibold text-[#CBCBCB]'
                            onClick={handleLogout}
                        >
                            <FiLogOut className="w-5 h-5 text-white" />
                            Logout
                        </div>
                        <hr className="mt-4" />

                        <div className=" p-2 flex items-center">
                            <div className="avatar">
                                {firstLetter}
                            </div>
                            <div className="flex flex-col ml-2">
                                <p className="font-semibold text-[#CBCBCB] text-[17px]"> {activeUser?.userName}</p>
                                <p className="text-gray-400 text-[14px]"> {activeUser?.email}</p>
                            </div>
                        </div>
                    </div> : ""
                }
            </div>

            <div className="w-full sm:h-[70vh] h-[72vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent sm:mt-12 mt-4  sm:px-4 px-0 ">
                {
                message && message.map((chat: any, index: number) => (
                        <ChatBox chat={chat.content} role={chat.role} key={index} />
                    ))
                }
            </div>
            {/* {Input} */}
            <div className="w-full sm:p-6 p-2 sm:mt-0 mt-10">
                <div className="relative bg-[#2F2F2F] w-full p-1 outline-none rounded-lg text-[16px]">
                    <CgAttachment className="absolute top-5 left-3 text-[25px] cursor-pointer hover:text-gray-500 transition-all"

                    />
                    <input type="text" placeholder="Type here ..." autoComplete="off" name="inputText" className="bg-[#2F2F2F] sm:w-[97%] w-[92%]  px-10 py-4 outline-none rounded-lg text-[16px]"
                        ref={inputRef}
                    />
                    <SlArrowUpCircle className="absolute top-4 right-6 text-[34px] cursor-pointer hover:text-gray-500 transition-all"
                        onClick={handlesumbmit}
                    />
                </div>
            </div>
        </div>
    )
}

export default ChatRightSlide
