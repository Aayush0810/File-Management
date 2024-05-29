import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import CreateFile from "./CreateFile";
import axios from "axios";
import Files from "./Files";
import { Loader } from "./Loader";

const FolderDetails = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { folderId, folderName: urlFolderName } = useParams();
  const folderName = decodeURIComponent(urlFolderName);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/dashboard/folder/${folderId}/files`,
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
    return <div className="min-h-screen flex justify-center align-middle"><Loader/></div>;
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
