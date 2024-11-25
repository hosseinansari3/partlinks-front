import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./SellCarSuccess.css";
import axios from "axios";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { toast } from "react-toastify";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 30,
  width: 150,
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
  console.log("token", location?.state?.sellingToken);

  const [selectedImgs, setSelectedImgs] = useState([]);
  const [uploadedImgs, setUploadedImgs] = useState([]);
  const [images, setImages] = useState([]);
  const [imgUploadPrc, setImgUploadPrc] = useState(0);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    console.log("loading", loading);
  }, [loading]);

  const formData = new FormData(); // Create a FormData object
  formData.append("selling_token", location?.state?.sellingToken);

  const handleImgUpload = async () => {
    if (selectedImgs.length > 0) {
      setLoading(true); // Start loading
      setImgUploadPrc(0);
      let uploadsInProgress = selectedImgs.length;
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
          response?.data?.error && toast.error(response?.data?.error?.message);
        } catch (error) {
          toast.error(error);
        } finally {
          // Decrement uploadsInProgress and update loading state
          uploadsInProgress -= 1;
          if (uploadsInProgress === 0) {
            setLoading(false); // End loading when all uploads are done
          }
        }
      });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center  flex-column flex-column-fluid">
      <div className="w-100 mw-400px mw-sm-500px mw-md-700px mw-lg-800px mt-20 p-5">
        <div className="w-100">
          <div className="row">
            <div className="col-sm-12 mb-20 text-center">
              <h3>
                {" "}
                Great, your inquiry has been submitted, we'll get back to you
                shortly
              </h3>
            </div>
            <div className="col-12">
              <h4>please upload your car image for best result</h4>
              <div className="position-relative w-100 border border-primary mx-auto my-4">
                <div className="image-upload w-100 ">
                  {selectedImgs.length > 0 ? (
                    <div className="d-flex row justify-content-center">
                      {images?.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="col-sm-6 col-md-4 col-lg-3 img-thumb border border-secondary m-3 pt-1"
                          >
                            <img
                              className="w-100 h-100 object-fit-contain"
                              src={item.previewUrl}
                            />
                            <div className="text-end">
                              {item.uploaded ? (
                                <i class="bx bx-check text-success"></i>
                              ) : (
                                <i
                                  onClick={() => deleteImg(index)}
                                  class="delete bx bx-x text-danger"
                                ></i>
                              )}
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
                </div>
                <div className="d-flex position-absolute bottom-0 mb-2 w-100 px-2 justify-content-between">
                  <div className="d-flex">
                    <input
                      onChange={(e) => setSelectedImgs(e.target.files)}
                      className="d-none"
                      id="carImages"
                      type="file"
                      accept="image/*"
                      multiple
                    />
                    <button className="btn btn-secondary">
                      <label className="upload-label" for="carImages">
                        select
                      </label>
                    </button>
                    <div className="position-relative d-flex justify-content-center align-items-center">
                      <button
                        onClick={() => {
                          handleImgUpload();
                        }}
                        className="btn btn-secondary ms-1 d-flex justify-content-center align-items-center"
                      >
                        <span className="z-3">start uploading</span>
                        <span
                          className={`${
                            loading ? "d-block" : "d-none"
                          } z-3 spinner-border spinner-border-sm align-middle ms-2`}
                        ></span>

                        <div
                          className="progress bg-success left-0 rounded h-100 position-absolute"
                          style={{ width: `${imgUploadPrc}%` }}
                        ></div>
                      </button>
                    </div>
                  </div>
                  {/*<div
                    className={` ${
                      imgUploadPrc ? "d-flex" : "d-none"
                    }  justify-content-center align-items-center`}
                  >
                    <BorderLinearProgress
                      variant="determinate"
                      value={imgUploadPrc}
                    />
                  </div>*/}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellCarSuccess;
