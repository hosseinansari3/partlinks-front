import React, { useEffect } from "react";
import "./About.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAboutData } from "../../Redux/aboutDataSlice";

function About() {
  const dispatch = useDispatch();
  const { aboutData, status, error } = useSelector((state) => state.aboutData);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAboutData()); // Fetch data on component mount
    }
    console.log("aboutData", aboutData);
  }, [status, dispatch]);

  return (
    <div>
      <div
        style={{
          "--dynamic-bg": `url(https://partlinks.com.au/${aboutData?.result?.primary_image_url})`,
        }}
        class="page-banner-area"
      >
        <div class="d-table">
          <div class="d-table-cell">
            <div class="container">
              <div class="page-banner-content">
                <h2>About Us</h2>
                <ul>
                  <li>
                    <a href="index.html">Home</a>
                  </li>
                  <li>About Us</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" p-4 py-5">
        <h1 className="mb-2 text-center">{aboutData?.result?.title}</h1>
        <p className="px-5 text-justify">{aboutData?.result?.description}</p>
      </div>
      <section class="story-area pb-100 pt-4">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-6 col-md-6">
              <div
                style={{
                  "--story-img": `url(https://partlinks.com.au/${aboutData?.result?.other_image_url_list[0]})`,
                }}
                class="story-image"
              >
                <a
                  href="https://www.youtube.com/watch?v=BVMsRltq2yU"
                  class="video-btn popup-youtube"
                >
                  <i class="bx bx-play-circle"></i>
                </a>
              </div>
            </div>

            <div class="col-lg-6 col-md-6">
              <div class="story-content">
                <h3>Our Story</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Quis ipsum suspendisse ultrices gravida. Risus commodo viverra
                  maecenas accumsan lacus vel facilisis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="mission-area pb-100">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-6 col-md-6">
              <div class="mission-content">
                <h3>Our Mission</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Quis ipsum suspendisse ultrices gravida. Risus commodo viverra
                  maecenas accumsan lacus vel facilisis.
                </p>

                <ul class="mission-list">
                  <li>
                    <i class="bx bx-check"></i>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </li>
                  <li>
                    <i class="bx bx-check"></i>
                    Sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </li>
                  <li>
                    <i class="bx bx-check"></i>
                    Quis ipsum suspendisse ultrices gravida.
                  </li>
                  <li>
                    <i class="bx bx-check"></i>
                    Risus commodo viverra maecenas accumsan lacus vel facilisis.
                  </li>
                </ul>
              </div>
            </div>

            <div class="col-lg-6 col-md-6">
              <div
                style={{
                  "--mission-img": `url(https://partlinks.com.au/${aboutData?.result?.other_image_url_list[1]})`,
                }}
                class="mission-image"
              ></div>
            </div>
          </div>
        </div>
      </section>
      <section class="vision-area pb-100">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-6 col-md-6">
              <div
                style={{
                  "--vision-img": `url(https://partlinks.com.au/${aboutData?.result?.other_image_url_list[2]})`,
                }}
                class="vision-image"
              ></div>
            </div>

            <div class="col-lg-6 col-md-6">
              <div class="vision-content">
                <h3>Our Vision</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Quis ipsum suspendisse ultrices gravida. Risus commodo viverra
                  maecenas accumsan lacus vel facilisis.
                </p>

                <ul class="vision-list">
                  <li>
                    <i class="bx bx-check"></i>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </li>
                  <li>
                    <i class="bx bx-check"></i>
                    Sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </li>
                  <li>
                    <i class="bx bx-check"></i>
                    Quis ipsum suspendisse ultrices gravida.
                  </li>
                  <li>
                    <i class="bx bx-check"></i>
                    Risus commodo viverra maecenas accumsan lacus vel facilisis.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <h5 className="text-center">Partlinks on social media</h5>
      <div className="d-flex justify-content-center align-items-center mb-4">
        {aboutData?.result?.social_media_list?.map((item) => {
          return (
            <div className="px-2">
              <a href={item.company_url} target="_blank">
                <img
                  className="social-icon"
                  src={`https://partlinks.com.au/${item.icon}`}
                />
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default About;
