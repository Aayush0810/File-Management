import axios from "axios";
import React, { useEffect, useState } from "react";
import Folder from "../Components/Folder";
import CreateFolder from "../Components/CreateFolder";
import { Loader } from "../Components/Loader";

export const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/dashboard`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        setFolders(response.data.userFolders);
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

  const handleFolderCreated = (newFolder) => {
    setFolders([...folders, newFolder]);
  };

  const handleFolderDeleted = (id) => {
    setFolders(prev => prev.filter(folder => folder._id !== id));
  };

  return (
    <>
     <CreateFolder onFolderCreated={handleFolderCreated}/>
      <div className="flex flex-col mx-auto w-3/4">
        {folders.map((folder) => (
          <div key={folder._id} className="flex flex-col mx-auto w-3/4">
            <Folder folder={folder} onFolderDeleted={handleFolderDeleted}/>
          </div>
        ))}
      </div>
    </>
  );
};
