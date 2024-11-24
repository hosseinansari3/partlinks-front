import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./SellCarSuccess.css";
import axios from "axios";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
    ...theme.applyStyles("dark", {
      backgroundColor: theme.palette.grey[800],
    }),
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#1a90ff",
    ...theme.applyStyles("dark", {
      backgroundColor: "#308fe8",
    }),
  },
}));

function SellCarSuccess() {
  const authToken = localStorage.getItem("authToken");

  const location = useLocation();
  console.log("token", location.state.sellingToken);

  const [selectedImgs, setSelectedImgs] = useState([]);
  const [uploadedImgs, setUploadedImgs] = useState([]);
  const [images, setImages] = useState([]);

  const [imgUploadPrc, setImgUploadPrc] = useState(0);

  const deleteImg = (index) => {
    setImages((previews) => {
      const newArray = [...previews];
      newArray.splice(index, 1);
      return newArray;
    });
    setSelectedImgs((selected) => {
      const newArray = [...selected];
      newArray.splice(index, 1);
      return newArray;
    });
  };

  useEffect(() => {
    console.log("previws", images);
  }, [images]);

  useEffect(() => {
    let imgsPreviewUrls = [];

    if (selectedImgs.length > 0) {
      for (let i = 0; i < selectedImgs.length; i++) {
        imgsPreviewUrls.push({
          previewUrl: URL.createObjectURL(selectedImgs[i]),
          uploaded: false,
        });
      }

      setImages(imgsPreviewUrls);
    }
  }, [selectedImgs]);

  /*
  useEffect(() => {
    console.log("selectedImgs", selectedImgs);
    const selected = [];
    [...selectedImgs].forEach((img, index) => {
      selected.push({ file: img, status: "uploading" });
    });
    handleImgUpload();
  }, [selectedImgs]);

  */

  useEffect(() => {
    console.log("images", images);
    const uploaded = [];

    images.forEach((item, index) => {
      if (item.uploaded) {
        uploaded.push(item);
        const prc = (uploaded.length / selectedImgs.length) * 100;
        setImgUploadPrc(prc);
      }
    });
  }, [images]);

  useEffect(() => {
    console.log("imgUploadPrc", imgUploadPrc);
  }, [imgUploadPrc]);

  const formData = new FormData(); // Create a FormData object
  formData.append("selling_token", location?.state?.sellingToken);

  const handleImgUpload = async () => {
    selectedImgs.length > 0 &&
      [...selectedImgs]?.forEach(async (img, index) => {
        formData.append("file", img);

        let progressPrc = 0;
        const myUploadProgress = (myFileId) => (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          progressPrc = progress;
        };
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authToken}`,
          },
          onUploadProgress: myUploadProgress(img.name),
        };

        try {
          const response = await axios.post(
            "https://partlinks.com.au/api/v1/member/selling/image_upload",
            formData,
            config
          );

          console.log("imgFile", img);

          console.log("imgUploadResponse", response);
          if (response.data.done) {
            setImages((previews) => {
              const newArray = [...previews];
              newArray[index].uploaded = true;
              return newArray;
            });
          }
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
        {selectedImgs.length > 0 ? (
          <div className="d-flex">
            {images?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="img-thumb border border-secondary m-3 p-3"
                >
                  <img src={item.previewUrl} />
                  <div>
                    {item.uploaded && "uploded"}
                    <i onClick={() => deleteImg(index)} class="bx bx-x"></i>
                  </div>
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
        <button className="">
          <label for="carImages">select</label>
        </button>
        <button onClick={handleImgUpload} className="">
          <span>start uploading</span>
        </button>
        <span>{imgUploadPrc}</span>
        <BorderLinearProgress variant="determinate" value={imgUploadPrc} />
      </div>
    </div>
  );
}

export default SellCarSuccess;
