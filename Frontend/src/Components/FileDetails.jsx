import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const FileDetails = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { fileId } = useParams();
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  useEffect(() => {
    const fetchFileDetails = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/dashBoard/file/${fileId}`,
          {
            headers: {
              Authorization: `${localStorage.getItem("token")}`,
            },
            withCredentials: true,
          }
        );
        setFile(response.data.file);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching file details:", error);
        setLoading(false);
      }
    };

    fetchFileDetails();
  }, [fileId]);

  if (loading) {
    return <h1>Loading file details...</h1>;
  }

  if (!file) {
    return <h1>File not found</h1>;
  }
  const displayName = file.name.split(".")[0];
  return (
    <div>
      <h1 className="text-2xl font-bold flex mt-3 justify-center">{displayName}</h1>
      {file.fileType === "pdf" && ( 
        <div
          style={{
            height: "600px",
            width: "80%",
            display: "flex",
            margin: "auto",
            marginBottom: "5rem",
            marginTop: "2rem",
          }}
        >
          <Worker
            workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
          >
            <Viewer
              fileUrl={file.path}
            />
          </Worker>
        </div>
      )}
      {file.fileType !== "pdf" && (
        <img
          src={file.path}
          alt={file.name}
          style={{
            height: "100%",
            width: "80%",
            display: "flex",
            margin: "auto",
            marginBottom: "5rem",
            marginTop: "2rem",
          }}
        />
      )}
    </div>
  );
};

export default FileDetails;
