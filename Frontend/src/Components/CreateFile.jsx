import React, { useState } from "react";
import axios from "axios";
import { Loader } from "./Loader";

const CreateFile = ({id, handleFilesCreated, folderName}) => {
  const [file, setFile] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const folderId = id;  

  const uploadFile = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file[0]); 
      formData.append('folderId', folderId); 
      formData.append('folderName', folderName); 
      setLoading(true);
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/dashboard/uploadFile`,
          formData, 
          {
            withCredentials: true,
            headers: {
              Authorization: `${localStorage.getItem("token")}`,
              'Content-Type': 'multipart/form-data' 
            },
          }
        );
        handleFilesCreated(response.data.file);
        setLoading(false);
        alert("File uploaded successfully");
      } catch (err) {
        setLoading(false);
        alert("Failed to upload file");
      }
    } else {
      setLoading(false);
      alert("Please select a file first.");
    }
  };

  if (loading) {
    return <div className="min-h-screen flex justify-center align-middle"><Loader/></div>;
  }

  return (
    <div className="flex flex-col py-3 w-full">
      <div className="w-[50%] flex flex-col  mx-auto ">
      <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" onChange={(e) => setFile(e.target.files)}></input>
      <button onClick={uploadFile} className="bg-black text-white p-2 rounded-xl w-[50%] mx-auto mt-3">Upload File</button> 
      </div>
    </div>
  );
};

export default CreateFile;


