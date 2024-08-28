import React, { useEffect, useState } from "react";
import AssistantImageUpload from "./AssistantImgUpload";
import AssistantChat from "./AssistantChat";
import AssistantSidebar from "./AssistantSidebar";
import axios from "axios";
import {
  useActiveThreadIdStore,
  useAssistantDataStore,
  useAssistantIdStore,
  useThreadMsgArr,
} from "./AssistantZustandStore";
import { useLinkedInUserContext } from "../../../../context/linkedInUserContext";
import { assistantDetailsById } from "../../function/LinkedInFunctions";

const Assistant = () => {
  const { setMessageArray } = useThreadMsgArr();

  const { userData } = useLinkedInUserContext();
  const { setActiveThreadId } = useActiveThreadIdStore();
  const { activeAssistantId, setActiveAssistantId } = useAssistantIdStore();
  const { setAssistantFilesArray } = useAssistantDataStore();

  const handleFetchThread = async (threadIdParam) => {
    const res = await axios.post(
      `${process.env.REACT_APP_SERVERURL}/openai/fetch-messages`,
      {
        threadIdParam,
      }
    );

    // updating the messgaes array
    setMessageArray(res.data.messages.reverse());
  };

  const handleFetchAssistantDetails = async (activeAssistantId) => {
    const res = await assistantDetailsById(activeAssistantId);
    setAssistantFilesArray(res);
  };

  useEffect(() => {
    handleFetchAssistantDetails(activeAssistantId);
  }, [activeAssistantId]);

  // DEFAULT ASSISTANT and THREAD SELECTION
  useEffect(() => {
    setActiveAssistantId(userData?.userModels?.assistants[0]?.assistantId);
    setActiveThreadId(
      userData?.userModels?.assistants[0]?.threads[0]?.threadId
    );
  }, [userData]);

  return (
    <div>
      <div className="container flex justify-center w-full h-screen overflow-auto pt-14 bg-linkedInBase">
        {/* LEFT SECTION */}
        {/* MIDDLE SECTION */}
        <aside className="flex flex-col w-1/4 gap-5 px-10 py-8 text-left border-r border-gray-300">
          <AssistantSidebar />
        </aside>
        {/* RIGHT SECTION */}
        <main className="relative flex flex-col items-center w-3/4 px-10">
          <AssistantChat handleFetchThread={handleFetchThread} />
        </main>
      </div>
    </div>
  );
};

export default Assistant;
