import React, { useState } from "react";
import {
  ChartBarIcon,
  ChatIcon,
  DownloadIcon,
  HeartIcon,
  ShareIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";

const AllImage = ({ photos, userData }) => {
  // Create state to manage hovering for each image
  const [hoverStates, setHoverStates] = useState({});

  const handleMouseOver = (id) => {
    setHoverStates((prevStates) => ({
      ...prevStates,
      [id]: true,
    }));
  };

  const handleMouseOut = (id) => {
    setHoverStates((prevStates) => ({
      ...prevStates,
      [id]: false,
    }));
  };

  const renderPhotos = () => {
    return photos.map((photo) => {
      return (
        <div key={photo._id} className="shadow-md rounded-md h-72 m-5" onMouseOver={() => handleMouseOver(_id)}
        onMouseOut={() => handleMouseOut(_id)}>
          <img
            className="w-full h-full object-cover"
            src={`http://localhost:5000/uploads/${photo}`}
            alt="grid_image"
          />
          <p>User ID: {photo.userId}</p>
          {hoverStates[_id] && (
            <div className="flex justify-between text-gray-500 p-2 ">
              <HeartIcon className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100" />
              <ChatIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
              <DownloadIcon className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100" />
              <ShareIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <>
      <div className="grid grid-cols-5 min-h-screen  ">
        {renderPhotos()}
      </div>
    </>
  );
};

export default AllImage;
