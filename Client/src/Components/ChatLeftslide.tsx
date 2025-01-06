import { IoSearch } from "react-icons/io5"
import { FaRobot } from "react-icons/fa";
import { CiGrid41 } from "react-icons/ci";
import { MdOutlineClear , MdNotes  } from "react-icons/md";
import { userAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
function ChatLeftslide({onDeleteChat}:any) {
    const { firstLetter }: any = userAuth();
    const navigate = useNavigate()
    const section = [
        { id: 1, title: "SmartTalk", icon: FaRobot, path: "/" },
        { id: 2, title: "Explore", icon: CiGrid41, path: "" },
    ]

    return (
        <div className='w-full h-[100%]  rounded-lg p-2'>
            <div className='flex gap-2 items-center justify-end'>
                <IoSearch className='w-5 h-5 cursor-pointer text-gray-500 hover:text-gray-600' />
                <MdNotes  className='w-6 h-6 cursor-pointer text-gray-500 hover:text-gray-600' />
            </div>

            <div className="w-full p-4">
                {
                    section.map(item => (
                        <div key={item.id} className='flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-[#102530]'
                        onClick={() => navigate(item.path)}
                        >
                            <item.icon className='w-5 h-5 text-white' />
                            <span className='text-slate-300 font-extrabold'>{item.title}</span>
                        </div>
                    ))
                }
            </div>

            <div className="w-full h-[50%] bg-[#0D1C24] rounded-lg p-4">
                <div className="flex flex-col items-center justify-center p-2">
                    <div className="avatar">
                        {firstLetter}

                    </div>
                    <p className="mt-2 text-[#ADBBC3] text-[14px]">You are talking to a chatBot.</p>
                </div>

                <div className="max-w-[100%] p-4">
                    <p className=" text-[#bac8d1] text-[18px] font-medium">You can ask some question releted to Knowledge, Business, Advice, Education, etc. But avoid sharping persnol information.</p>
                </div>

                <button
                    className="w-full inline-flex  items-center justify-center gap-2 rounded bg-[#0a8fcd] px-8 py-3 text-white  mt-6 hover:bg-[#0b6e9c] transition-all"
                onClick={onDeleteChat}
                >
                    <span className="text-sm font-medium"> Clear Conversation </span>
                    <MdOutlineClear  className="w-5  h-5 "/>
        
                </button>

            </div>
        </div>

    )
}

export default ChatLeftslide
