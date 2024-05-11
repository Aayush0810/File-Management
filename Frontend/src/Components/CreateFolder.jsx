import React, { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

const CreateFolder = ({ onFolderCreated }) => {
  const [currentPath, setCurrentPath] = useState("");

  const handleCreateFolder = async () => {
    const folderName = prompt("Enter the name of the new folder:");
    if (folderName) {
      try {
        const response = await axios.post(
          `${BACKEND_URL}/dashBoard/uploadFolder`,
          { name: folderName, parentPath: currentPath },
          {
            headers: {
              Authorization: `${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );
        onFolderCreated(response.data.newFolder);
      } catch (error) {
        console.error("Error creating folder:", error);
      }
    }
  };
  return (
    <div className="w-full">
      <button onClick={handleCreateFolder} className="flex mx-auto bg-black text-white rounded-xl px-20 py-2 mt-4">Create Folder</button>
    </div>
  );
};

export default CreateFolder;
