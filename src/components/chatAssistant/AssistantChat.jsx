import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  useActiveThreadIdStore,
  useAssistantIdStore,
  useThreadMsgArr,
} from "./AssistantZustandStore";
import { PropagateLoader } from "react-spinners";
import { AiOutlineSend } from "react-icons/ai";
import ReactMarkdown from "react-markdown";

const AssistantChat = ({ handleFetchThread }) => {
  // state
  const [message, setMessage] = useState("");
  const [isResponseLoading, setIsResponseLoading] = useState(false);

  // zustand
  const { messageArray } = useThreadMsgArr();
  const { activeThreadId } = useActiveThreadIdStore();
  const { activeAssistantId } = useAssistantIdStore();

  // CREATING A FUNCTION TO SCROLL CHAT AREA TO BOTTOM
  const scrollContainerRef = useRef(null);
  const scrollToBottom = () => {
    const scrollHeight = scrollContainerRef.current.scrollHeight;
    scrollContainerRef.current.scrollTo({
      top: scrollHeight,
      behavior: "smooth",
    });
  };

  function LinkRenderer(props) {
    return (
      <a
        href={props.href}
        target="_blank"
        rel="noreferrer"
        className="text-triklAccentBlue"
      >
        {props.children}
      </a>
    );
  }

  // //get assistant instructions to pass with the request //
  const sendMessage = async () => {
    setIsResponseLoading(true);
    scrollToBottom();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVERURL}/openai/assitant-chat`,
        {
          userQuestion: message,
          assistant: {
            assistantId: activeAssistantId,
            threadId: activeThreadId,
          },
        },
        {
          withCredentials: true,
        }
      );

      // FETCH LATEST THREAD WITH UPDATED MESSAGES
      await handleFetchThread(activeThreadId);

      // SETTING USER MESSAGE IN THE TEXTAREA AS BLANK
      setMessage("");
      setIsResponseLoading(false);
    } catch (error) {
      setIsResponseLoading(false);
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    handleFetchThread(activeThreadId);
  }, [activeThreadId]);

  return (
    <section
      className="relative w-full h-full"
      style={{
        overflowY: "auto",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <main
        ref={scrollContainerRef}
        className={`pt-24 pb-10 overflow-scroll h-4/5 flex flex-col gap-4 text-left text-base`}
      >
        {messageArray?.map((msg, index) =>
          msg?.role === "user" ? (
            <div
              key={index}
              className="flex items-start justify-start p-4 pr-20 rounded-md bg-white/50"
            >
              <div className="w-16 font-semibold">User</div>

              <div className="w-5/6 px-8 border-l">
                {msg.messageText?.split("\n").map((line, index) => (
                  <p className="mb-2" key={index}>
                    <ReactMarkdown components={{ a: LinkRenderer }}>
                      {line}
                    </ReactMarkdown>
                  </p>
                ))}
              </div>
            </div>
          ) : (
            <div
              key={index}
              className="flex items-start justify-start p-4 pr-20"
            >
              <div className="w-16 font-semibold">TRIKL</div>
              <div className="w-5/6 px-8 border-l">
                {msg.messageText?.split("\n").map((line, index) => (
                  <p className="mb-2" key={index}>
                    <ReactMarkdown components={{ a: LinkRenderer }}>
                      {line}
                    </ReactMarkdown>
                  </p>
                ))}
              </div>
            </div>
          )
        )}
      </main>

      {/* sending message section */}
      <aside className="absolute flex w-full gap-5 p-4 bg-white rounded-md shadow-md bottom-10">
        <textarea
          type="text"
          value={message}
          disabled={isResponseLoading}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here"
          className="flex items-center w-full max-w-screen-lg gap-2 bottom-2 focus:outline-none focus:border-0"
        />
        <button
          className="overflow-hidden flex items-center justify-center gap-5 px-10 py-3 transition-all duration-300 rounded-md h-14 bg-[#c8f1ff] w-max hover:bg-triklDarkAccentBlue/70"
          disabled={isResponseLoading}
          onClick={sendMessage}
        >
          {isResponseLoading ? (
            <PropagateLoader size={5} color="#ffffff" />
          ) : (
            <AiOutlineSend size={25} />
          )}
        </button>
      </aside>
    </section>
  );
};

export default AssistantChat;
