import "./App.css";
import { Signup } from "./Pages/Signup";
import { Signin } from "./Pages/Signin";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "./Pages/Dashboard";
import Navbar from "./Components/Navbar";
import FolderDetails from "./Components/FolderDetails";
import FileDetails from "./Components/FileDetails";

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/folder/:folderId/:folderName" element={<FolderDetails />} />
        <Route path="/file/:fileId" element={<FileDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
