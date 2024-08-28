import React from "react";
import { AiOutlineSend } from "react-icons/ai";
import AssistantImageUpload from "./AssistantImgUpload";

const AssistantWrite = ({
  inputValue,
  setInputValue,
  setisInputTextAvailable,
  aiRecommendation,
  scrollToBottom,
  approvedGroup,
}) => {
  return (
    <div className="relative flex justify-center w-full h-max">
      <div
        className="flex items-center w-full max-w-screen-lg gap-2 p-5 bg-white rounded-md bottom-2 "
        // className="flex items-start gap-2 px-8"
      >
        <textarea
          className="flex-grow"
          // className="w-full p-4 rounded-lg min-h-max drop-shadow-md"
          placeholder="Select template or type a message ..."
          // value={inputValue}
          // onChange={(e) => {
          //   setInputValue(e.target.value);
          //   setisInputTextAvailable(true);
          // }}
        />
        <AssistantImageUpload />
        <button className="flex items-center justify-center gap-5 px-10 py-3 transition-all duration-300 rounded-md bg-triklDarkAccentBlue/30 w-max hover:bg-triklDarkAccentBlue/70">
          Ask
          <AiOutlineSend className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default AssistantWrite;
