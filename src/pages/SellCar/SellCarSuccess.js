import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./SellCarSuccess.css";
import axios from "axios";

function SellCarSuccess() {
  const authToken = localStorage.getItem("authToken");

  const location = useLocation();
  console.log("token", location.state.sellingToken);

  const [selectedImgs, setSelectedImgs] = useState([]);
  const [uploadedImgs, setUploadedImgs] = useState([]);

  useEffect(() => {
    console.log("selectedImgs", selectedImgs);
    const selected = [];
    [...selectedImgs].forEach((img, index) => {
      selected.push({ file: img, status: "uploading" });
    });
    handleImgUpload();
  }, [selectedImgs]);

  const formData = new FormData(); // Create a FormData object
  formData.append("selling_token", location?.state?.sellingToken);

  const handleImgUpload = async () => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${authToken}`,
      },
    };
    selectedImgs.length > 0 &&
      [...selectedImgs]?.forEach(async (img, index) => {
        formData.append("file", img);

        try {
          const response = await axios.post(
            "https://partlinks.com.au/api/v1/member/selling/image_upload",
            formData,
            config
          );

          console.log("imgFile", img);

          console.log("imgUploadResponse", response);
        } catch (error) {
          console.log("Error", error);
        }
      });
  };

  return (
    <div className="container">
      <h3>
        {" "}
        Great, your inquiry has been submitted, we'll get back to you shortly
      </h3>
      <h4>please upload your car image for best result</h4>

      <div className="image-upload border border-primary mx-auto my-4">
        <label for="carImages" className="w-100 h-100">
          {selectedImgs.length > 0 ? (
            <div className="d-flex">
              {[...selectedImgs]?.map((img) => {
                return (
                  <div className="img-thumb border border-secondary m-3 p-3">
                    <span>Uploading...</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="w-100 h-100 d-flex justify-content-center align-items-center">
              <span>please upload photos of your car</span>
            </div>
          )}
          <input
            onChange={(e) => setSelectedImgs(e.target.files)}
            className="d-none"
            id="carImages"
            type="file"
            accept="image/*"
            multiple
          />
        </label>
      </div>
    </div>
  );
}

export default SellCarSuccess;
