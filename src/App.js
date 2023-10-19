import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const cloudName = "dxiybrrpf";
  const uploadPreset = "pfb57dmg";

  const [fileUpload, setFileUpload] = useState();
  const [selectFloder, setSelectFolder] = useState("IceCream");

  const handleFileChange = (e) => {
    setFileUpload(e.target.files[0]);
  };

  const handleFolderChange = (e) => {
    setSelectFolder(e.target.value);
  };

  const HandleOnsubmit = async (e) => {
    e.preventDefault();
    if (!fileUpload) {
      alert();
      return;
    }
    const formData = new FormData();
    formData.append("file", fileUpload);
    formData.append("upload_preset", uploadPreset);
    formData.append("folder", selectFloder);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dxiybrrpf/image/upload`,
        formData
      );
      console.log("Upload successful:", response.data);
      alert("Upload successful!");
    } catch (error) {
      console.error("Error uploading image:", error);
      if (error.response) {
        console.error("Cloudinary error response:", error.response.data);
      }
      alert("Upload failed. Please try again.");
    }
  };
  return (
    <section className="App">
      <h2>Cloudinary Upload</h2>
      <div className="formCard">
        <form className="form" onSubmit={HandleOnsubmit}>
          <select
            name="ImageFolder"
            className="select-folder"
            onChange={handleFolderChange}
          >
            <option value="IceCream" className="folders">
              IceCream
            </option>
            <option value="Cakes" className="folders">
              Cakes
            </option>
          </select>
          <input
            type="file"
            accept="image/*"
            style={{ width: "10rem" }}
            onChange={handleFileChange}
            // hidden
          />
          <button type="submit" className="btn">
            Upload
          </button>
        </form>
      </div>
    </section>
  );
}

export default App;
