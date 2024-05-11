import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

const Folder = ({ folder,  onFolderDeleted}) => {
  const [foldername, setFoldername] = useState(folder.name);
  const id = folder._id;
  const handleRename = async () => {
    const newName = prompt("Enter the new folder name.");
    if (!newName) {
      setFoldername(foldername);
    }
    const response = await axios.put(
      `${BACKEND_URL}/dashBoard/folderRename`,
      { newName, id },
      {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      }
    );
    setFoldername(response.data.folder.name);
  };

  const handleDelete = async () => {
    const id = folder._id;
    const  name  = folder.name;
    try {
      await axios.delete(
        `${BACKEND_URL}/dashBoard/delete/${id}`,
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      onFolderDeleted(id); 
      alert(`Folder "${name}" is deleted`);
    } catch (err) {
      alert(err.response);
    }
  };

  return (
    <div className="bg-black text-white p-3 rounded-xl mt-4 flex justify-between items-center">
      <Link
        to={`/folder/${folder._id}/${encodeURIComponent(folder.name)}`}
        className="flex-1"
      >
        {foldername}
      </Link>
      <span
        className="text-sm text-slate-500 cursor-pointer ml-4"
        onClick={handleRename}
      >
        Rename
      </span>
      <span
        className="text-sm text-slate-500 cursor-pointer ml-4"
        onClick={handleDelete}
      >
        Delete
      </span>
    </div>
  );
};

export default Folder;
