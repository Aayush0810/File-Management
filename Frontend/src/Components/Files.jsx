import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

const Files = ({ file, onFileDeleted }) => {
  const [filename, setFilename] = useState(file.name);
  const id = file._id;
  const handleRename = async () => {
    const newName = prompt("Enter the new file name.");
    const response = await axios.put(
      `${BACKEND_URL}/dashBoard/renameFile`,
      { newName, id },
      {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      }
    );
    setFilename(response.data.newFileName.name);
  };
  const displayName = filename.split(".")[0]
  const handleDelete = async () => {
    const id = file._id;
    const name = file.name;
    try {
      await axios.delete(`${BACKEND_URL}/dashBoard/delete/${id}`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      onFileDeleted(id);
      alert(`File "${name}" is deleted`);
    } catch (err) {
      alert(err.response);
    }
  };
  return (
    <div className="bg-black text-white p-3 rounded-xl mt-4 flex justify-between items-center">
      <Link to={`/file/${file._id}`} className="flex-1">
        {displayName}
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

export default Files;
