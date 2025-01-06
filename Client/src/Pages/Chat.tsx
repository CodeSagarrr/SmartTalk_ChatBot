import { useState } from 'react'
import '../App.css'
import ChatLeftslide from '../Components/ChatLeftslide'
import ChatRightSlide from '../Components/ChatRightSlide'
import { deleteChats } from '../api/AuthMange'
import toast from 'react-hot-toast'


type UserMessage = {
  role: "user" | "assistant",
  message: string,
}
function Chat() {
const [message, setMessage] = useState<UserMessage[]>()
 
const onDeleteChat = async() => {
  try {
    await deleteChats();
    setMessage([]);
    toast.success('Clear All Chats')
  } catch (error) {
    console.log(error || "Error Occured")
  }
}

  return (
    <div className='w-screen h-screen flex bg-[#05101c]'>
      {/* {Left Side} */}
      <div className='basis-[22%] border-r border-[#0EA5E9] p-2 sm:block hidden'>
        <ChatLeftslide onDeleteChat={onDeleteChat}/>
      </div>


      {/* {Right side} */}
      <div className='sm:basis-[78%] basis-[100%] p-4'>
        <ChatRightSlide setMessage={setMessage} message={message}/>
      </div>
    </div>
  )
}

export default Chat
