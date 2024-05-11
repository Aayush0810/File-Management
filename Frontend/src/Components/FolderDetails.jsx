import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import CreateFile from "./CreateFile";
import axios from "axios";
import { BACKEND_URL } from "../config";
import Files from "./Files";

const FolderDetails = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { folderId, folderName: urlFolderName } = useParams();
  const folderName = decodeURIComponent(urlFolderName);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/dashboard/folder/${folderId}/files`,
          {
            withCredentials: true,
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setFiles(response.data.files);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  if (loading) {
    return <h1>Loading...</h1>;
  }
  const handleFilesCreated = (newFiles) => {
    setFiles((prevFiles) => [...prevFiles, newFiles]);
  };
  const handleFilesDeleted = (id) => {
    setFiles(prev => prev.filter(folder => folder._id !== id));
  };
  return (
    <div>
      <CreateFile
        id={folderId}
        handleFilesCreated={handleFilesCreated}
        folderName={folderName}
      />
      <div className="flex flex-col mx-auto w-3/4">
        {files.map((file) => (
          <div key={file._id}>
            <Files file={file} onFileDeleted={handleFilesDeleted}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FolderDetails;