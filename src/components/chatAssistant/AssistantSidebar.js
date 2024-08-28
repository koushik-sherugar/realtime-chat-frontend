import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoMdAttach } from "react-icons/io";
import { useLinkedInUserContext } from "../../../../context/linkedInUserContext";
import {
  useActiveThreadIdStore,
  useAssistantDataStore,
  useAssistantIdStore,
} from "./AssistantZustandStore";
import { LoadingSpinner } from "../../../components/widgets/LoadingSpinner";
import { assistantDetailsById } from "../../function/LinkedInFunctions";
const AssistantSidebar = () => {
  const { userData } = useLinkedInUserContext();
  const { activeThreadId, setActiveThreadId } = useActiveThreadIdStore();
  const { activeAssistantId, setActiveAssistantId } = useAssistantIdStore();

  //  handle assistant change and update it in zustandstore
  const handleChange = (e) => {
    setActiveAssistantId(e.target.value);
  };

  return (
    <div>
      <h1 className="text-xl font-semibold">
        {userData?.userName}'s AI Assitant
      </h1>

      <section>
        <label
          htmlFor="simple-dropdown"
          className="block pt-5 text-sm font-medium text-gray-700"
        >
          Assistant
        </label>
        <select
          id="simple-dropdown"
          onChange={handleChange}
          className="block w-full px-4 py-2 mt-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
        >
          {userData?.userModels.assistants.map((assistant, key) => {
            return (
              <option key={key} value={assistant.assistantId}>
                {assistant.assistantName}
              </option>
            );
          })}
        </select>

        <section className="py-2">
          {userData?.userModels.assistants
            .filter((assistant) => assistant.assistantId === activeAssistantId)
            .map((assistant, index) => {
              return (
                <div className="flex flex-col gap-2" key={index}>
                  {assistant.threads.map((each, anotherIndex) => (
                    <button
                      key={anotherIndex}
                      className={`p-2 text-xs border border-gray-300 text-gray-700 rounded-md ${
                        activeThreadId === each.threadId
                          ? "bg-triklDarkAccentBlue/20"
                          : "bg-transparent"
                      }`}
                      onClick={() => setActiveThreadId(each.threadId)}
                    >
                      {each.threadName}
                    </button>
                  ))}
                </div>
              );
            })}
        </section>
      </section>
      {/* File upload section */}
      <FileSection />
    </div>
  );
};

export default AssistantSidebar;

const FileSection = () => {
  // Zustand
  const { assistantFilesArray } = useAssistantDataStore();
  const { activeAssistantId } = useAssistantIdStore();
  const { setAssistantFilesArray } = useAssistantDataStore();

  // STATES
  const [file, setFile] = useState(null);
  const [isloading, setIsLoading] = useState(false);

  // upload the file to assistant
  const handleUploadToAssistant = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("assistantId", activeAssistantId);
    formData.append("existingFilesArray", assistantFilesArray);

    try {
      await axios.post(
        `${process.env.REACT_APP_SERVERURL}/openai/assitant-file-upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const assistantFiles = await assistantDetailsById(activeAssistantId);
      setAssistantFilesArray(assistantFiles);
      setFile(null);
      setIsLoading(false);
    } catch (error) {
      console.error("Error uploading file:", error);
      setIsLoading(false);
    }
  };

  // trigger upload when file is selected
  useEffect(() => {
    if (file) {
      handleUploadToAssistant();
    }
  }, [file]);

  return (
    <div className="flex flex-col my-2 ">
      <section className="flex items-center justify-between pb-2 border-b-2 border-gray-200">
        <p className="text-sm font-semibold text-gray-700 ">Files</p>
        {/* file upload */}
        <div className="flex items-center justify-center">
          <input
            id="fileInput"
            type="file"
            accept=".pdf, .txt"
            className="hidden"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
            disabled={isloading}
          />
          {/* custom icon for file upload */}
          <label
            for="fileInput"
            className="flex items-center font-semibold text-gray-600 hover:text-blue-600 "
          >
            <IoMdAttach className="text-lg" />
            ADD
          </label>
        </div>
      </section>

      {/* display the files */}
      <div className="pt-4 ">
        {isloading ? (
          <LoadingSpinner />
        ) : (
          <>
            {assistantFilesArray?.map((eachFile, index) => {
              return (
                <div key={index} className="flex">
                  <p className="p-1 m-1 text-xs text-gray-500 bg-gray-100 border rounded-md">
                    {eachFile.slice(0, 16)}
                  </p>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};
