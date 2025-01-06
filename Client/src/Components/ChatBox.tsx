import { useEffect, useRef } from "react";
import { userAuth } from "../Context/AuthContext";
import { FaRobot } from "react-icons/fa";
import CodeEditor from '@uiw/react-textarea-code-editor';
type UserMessage = {
  role: "user" | "assistant";
  chat: string;
};

const splitCodeBlock = (codeBlock: string) => {
  if (codeBlock?.includes("```")) {
    return codeBlock.split("```");
  }
  return [codeBlock];
};

const isBlockCode = (str: string) => {
  if (str?.includes("=") || str?.includes(";") || str?.includes("[") || str?.includes("]") || str?.includes("{") || str?.includes("}") || str?.includes("#") || str?.includes("//")) {
    return true
  }
  return false;
}

function ChatBox({ chat, role }: UserMessage) {
  const { firstLetter }: any = userAuth();
  const scroll = useRef<HTMLDivElement | null>(null);
  const message = splitCodeBlock(chat);

  useEffect(() => {
    scroll?.current?.scrollIntoView({ behavior: "smooth" });
  }, []);
  return (
    <>
      <div ref={scroll} >
        {role === 'assistant' ?
          <div className=" sm:w-[100%] w-full h-[6%]  my-2 p-4 flex flex-col justify-start  gap-4 rounded-lg ">
            <div className="avatarBot ">
              <FaRobot />
            </div>

            <div>
              {
                !message && (<p className="text-[18px] max-w-[90%] bg-gray-600 ">{chat}</p>)
              }
              {
                 message.length > 0 && message.map((block, i) => (
                  isBlockCode(block) ?
                    <div className="w-full" key={i} >
                      <CodeEditor key={i}
                        value={block}
                        language="js"
                        placeholder="Please enter JS code."
                        padding={15}
                        style={{
                          backgroundColor: "#161B22",
                          fontFamily: '"Work Sans", serif',
                          fontSize: "18px",
                          color: "#ffffff",
                          borderRadius: "10px",
                          overflowWrap: "break-word",
                          maxWidth: "100%",
                          margin: "10px 0"
                        }}
                      />
                    </div>

                    :
                    <p className="text-[18px] sm:max-w-[100%] max-w-[100%]">{block}</p>
                ))
              }
            </div>
          </div>
          :
          <div className="h-[6%]  my-2 p-4 flex  justify-end  rounded-lg gap-4">
            <p className="text-[16px] max-w-[60%] bg-[#303030] p-2 rounded-lg" >{chat}</p>
            <div className="avatar text-3">
              {firstLetter}
            </div>
          </div>}
      </div>
    </>
  );
}

export default ChatBox;
