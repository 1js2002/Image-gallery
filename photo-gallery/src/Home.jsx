import React, { useEffect, useState } from "react";
import upload_img from "./assets/upload_img.png"
import gallery_img from "./assets/gallery_img.png"  
import { AiFillPlusCircle } from "react-icons/ai";

import AllImage from "./components/AllImage";
export default function Home() {

  const [userData, setUserData] = useState("");
  const [photos, setPhotos] = useState([]);
  const [updateUI, setUpdateUI] = useState("");

  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./sign-in";
  };
                                              // User Auth fetch
  useEffect(() => {
    fetch("http://localhost:5000/userData?userId=${userId}", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");

        setUserData(data.data);

        if (data.data == "token expired") {
          alert("Token expired login again");
          window.localStorage.clear();
          window.location.href = "./sign-in";
        }
      });
  }, []);

                                                      // getting photos from mongodb
  useEffect(() => {
    fetch("http://localhost:5000/api/get")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setPhotos(data);
      })
      .catch((error) => console.log("Error:", error));
  }, [updateUI]);
    //  function for taking file input and uploading it to mongodb
    const handleChange = (e) => {
      e.preventDefault();
    
      const formData = new FormData();
      formData.append("photo", e.target.files[0]);
      formData.append("userId", window.localStorage.getItem("userId"));
    
      fetch("http://localhost:5000/api/save", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          // No need to add 'Content-Type' header when using FormData
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setUpdateUI(data._id);
        })
        .catch((error) => console.log("Error:", error));
    };
  return (
    <div className="min-h-screen">
     <nav className="flex flex-col justify-center items-center text-2xl m-4">Image gallery of {userData?.fname}
      <span className="hover:text-blue-600 cursor-pointer" onClick={logOut}>log out</span>
     </nav>
      <div className="flex flex-col justify-center items-center ">
      <label className="button text-center " htmlFor="file_picker">
        <AiFillPlusCircle className="w-10 h-10 cursor-pointer ml-4 " />
        <span className="text-sm text-center  hover:text-blue-700 cursor-pointer">upload a photo</span>
        <input
          hidden
          type="file"
          name="file_picker"
          id="file_picker"
          onChange={(e) => handleChange(e)}
        />
        </label>
      </div>
      <AllImage photos={photos} userData={userData} />
    </div>
  );
}
