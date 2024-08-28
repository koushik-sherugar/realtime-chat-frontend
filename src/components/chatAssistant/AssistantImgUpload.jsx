import React, { useRef, useState } from "react";
import { ImAttachment } from "react-icons/im";

// import { MdDelete, MdUploadFile } from "react-icons/md";
// import { BsCloudUpload } from "react-icons/bs";
// import {
//   useFinalContentStore,
//   useCreatedImages,
//   useSelectedImgStore,
// } from "../../ZustandStores/LinkedInZustandStore";
// import { useLinkedInUserContext } from "../../../../context/linkedInUserContext";
// import {
//   uploadImageToCloudinary,
//   storeGeneratedOrUploadedImg,
// } from "../../function/LinkedInFunctions";
// const AssistantImageUpload = () => {
//   // ZUSTAND
//   const { finalContent, setFinalContent } = useFinalContentStore();
//   const { imageSelection, setImageSelection } = useSelectedImgStore();
//   const { userImagesArray, setUserImagesArray } = useCreatedImages();

//   // CONTEXT
//   let { userData } = useLinkedInUserContext();
//   const [uploadProgress, setUploadProgress] = useState(0);

//   // LOCAL STATE HANDLERS
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [isDragOver, setIsDragOver] = useState(false); // New state

//   const userId = userData?.userId;
//   const dropRef = useRef(null);

//   const handleImageChange = async (event) => {
//     const file = event.target.files[0];
//     setSelectedImage(file);
//     await handleImageUpload(file);
//   };

//   const handleImageRemove = () => {
//     setSelectedImage(null);
//     setFinalContent({
//       ...finalContent,
//       finalMediaUrl: "",
//     });
//   };

//   // UPLOAD PROGRESS
//   const onUploadProgress = (progress) => {
//     setUploadProgress(progress);
//   };

//   const handleImageUpload = async (file) => {
//     try {
//       const imageBuffer = await file.arrayBuffer();
//       const imageUrl = await uploadImageToCloudinary(
//         imageBuffer,
//         onUploadProgress
//       );
//       setUploadProgress(100);
//       setFinalContent({
//         ...finalContent,
//         finalMediaUrl: imageUrl,
//       });

//       // setImagesArray([
//       //   { imageData: imageUrl, imagePrompt: "" },
//       //   ...imagesArray,
//       // ]);

//       // --------------------------- Storing Uploaded ImgURL & UserId ----------------------------------------

//       const imgURL = imageUrl;
//       const userInput = "";
//       const userId = userData.userId;
//       const imgType = "uploads";

//       await storeGeneratedOrUploadedImg(
//         userId,
//         userInput,
//         imgURL,
//         imgType,
//         setUserImagesArray
//       );
//     } catch (error) {
//       // Handle error
//       console.error("Error uploading image:", error);
//     }
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//     setIsDragOver(true);
//   };

//   const handleDragEnter = (e) => {
//     e.preventDefault();
//     setIsDragOver(true);
//   };

//   const handleDragLeave = (e) => {
//     e.preventDefault();
//     setIsDragOver(false);
//   };

//   const handleDrop = async (e) => {
//     e.preventDefault();
//     setIsDragOver(false);
//     const file = e.dataTransfer.files[0];
//     setSelectedImage(file);
//     await handleImageUpload(file);
//     // setFinalContent.finalMediaUrl(file)
//   };

//   return (
//     <main className="flex flex-col items-start w-full gap-5 pt-10">
//       <div className="block text-sm font-medium text-gray-700">Files</div>

//       {/* {uploadedImage && (
//         <img
//           className="border-4 rounded-lg h-1/3 border-triklAccentBlue"
//           src={uploadedImage}
//           alt={`Image ${uploadedImage}`}
//         />
//       )} */}

//       {/* image upload */}
//       <section
//         className={`flex relative flex-col items-center justify-center w-full h-32 border rounded-lg cursor-pointer ${
//           isDragOver
//             ? "border-blue-500 bg-blue-200"
//             : "border-gray-300 bg-transparent"
//         } hover:bg-white`}
//       >
//         {selectedImage ? (
//           <>
//             <MdUploadFile className="w-4 h-4 text-triklAccentBlue" />

//             <div className="px-16 py-4 text-base font-spaceGrotesk">
//               {selectedImage.name}
//             </div>
//             <div className="text-xs font-inter">
//               size:{" "}
//               {selectedImage.size / 1024 < 1024
//                 ? `${Math.round(selectedImage.size / 1024)} KB`
//                 : `${(selectedImage.size / 1024 / 1024).toFixed(2)} MB`}
//             </div>
//             <button
//               className="absolute top-0 pt-10 text-2xl text-gray-400 right-10 hover:text-red-500"
//               onClick={handleImageRemove}
//             >
//               <MdDelete />
//             </button>
//           </>
//         ) : (
//           <>
//             <label
//               className={`flex flex-col items-center justify-center w-full h-64 border rounded-lg cursor-pointer ${
//                 isDragOver
//                   ? "border-blue-500 bg-blue-100"
//                   : "border-gray-300 bg-transparent"
//               } hover:bg-white`}
//               ref={dropRef}
//               onDragOver={handleDragOver}
//               onDragEnter={handleDragEnter}
//               onDragLeave={handleDragLeave}
//               onDrop={handleDrop}
//               htmlFor="dropzone-file"
//             >
//               <div className="flex flex-col items-center justify-center gap-3">
//                 <div className="text-xl">
//                   <BsCloudUpload />
//                 </div>
//                 <p className="text-lg font-spaceGrotesk">
//                   <span className="font-semibold">Click to upload</span> or drag
//                   and drop
//                 </p>
//                 <p className="text-xs font-inter">Pdf or txt only</p>
//               </div>
//               <input
//                 id="dropzone-file"
//                 type="file"
//                 className="hidden"
//                 onChange={handleImageChange}
//                 accept="image/*"
//               />
//             </label>
//           </>
//         )}
//         {/* upload button */}
//         <div className={`w-full${selectedImage ? "" : "hidden"}`}>
//           {selectedImage && (
//             <div className="flex flex-col items-center w-full gap-5 pt-4">
//               {/* <button
//                 className="object-center px-4 py-2 font-semibold border rounded-lg text-triklAccentBlue w-fit border-triklAccentBlue disabled:text-gray-300 disabled:border-gray-300"
//                 onClick={handleImageUpload}
//                 disabled={
//                   uploadProgress > 0 && uploadProgress < 100 ? true : false
//                 }
//               >
//                 Upload
//               </button> */}
//               <ProgressBar uploadProgress={uploadProgress} />
//             </div>
//           )}
//         </div>
//       </section>
//     </main>
//   );
// };

// export default AssistantImageUpload;

// const ProgressBar = ({ uploadProgress }) => {
//   return (
//     uploadProgress > 0 &&
//     uploadProgress < 100 && (
//       <div className="relative flex flex-col w-full px-10 pt-3 border-t border-gray-300">
//         <div className="inline-block px-2 py-1 text-xs font-semibold uppercase rounded-full text-triklAccentBlue bg-triklAccentBlue-200">
//           Uploading...
//         </div>

//         <div className="flex w-full text-right">
//           <span className="inline-block text-xs font-semibold text-triklAccentBlue">
//             {uploadProgress}%
//           </span>
//         </div>

//         <div className="flex h-2 mb-4 overflow-hidden text-xs rounded bg-triklAccentBlue-200">
//           <div
//             style={{ width: `${uploadProgress}%` }}
//             className="flex flex-col justify-center text-center text-white shadow-none whitespace-nowrap bg-triklAccentBlue"
//           ></div>
//         </div>
//       </div>
//     )
//   );
// };

const AssistantImgUpload = () => {
  return (
    <button className="flex items-center h-full px-4">
      <ImAttachment />
    </button>
  );
};

export default AssistantImgUpload;
