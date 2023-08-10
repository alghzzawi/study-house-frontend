"use client"

import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from "../countexts/auth";

export default function AddRoomTable() {
  const { refresh, is_staff, tokens_refresh, tokens_access } = useContext(AuthContext);
  const [accessString, setAccessString] = useState(null);
  const [image1, setImage1] = useState(null)
  const [image2, setImage2] = useState(null)
  const [image3, setImage3] = useState(null)
  const [roomName, setRoomName] = useState()
  const [description, setDescription] = useState()
  const [capacity, setCapacity] = useState()

  const [pricePerHoure, setPricePerHoure] = useState()

  const [is_staffBoolean, setIs_staffBoolean] = useState(false)


  useEffect(() => {
    if (refresh) {
      setAccessString(tokens_access)
      refresh(tokens_refresh);
    }

  }, [refresh, tokens_refresh, tokens_access]);

  useEffect(() => {
    const convertToBoolean = (value) => value === "true";

    const updateStateBasedOnContext = () => {
      if (typeof is_staff === "string") {
        setIs_staffBoolean(convertToBoolean(is_staff));
      } else if (typeof is_staff === "boolean") {
        setIs_staffBoolean(is_staff);
      } else {
        setIs_staffBoolean(false);
      }
    };

    updateStateBasedOnContext();

    let isStaffSubscription;

    if (is_staff !== null && is_staff !== undefined && is_staff.onUpdate) {
      isStaffSubscription = is_staff.onUpdate((value) => {
        setIs_staffBoolean(convertToBoolean(value));
      });
    }


    return () => {
      if (isStaffSubscription) {
        isStaffSubscription.unsubscribe();
      }
    };
  }, [is_staff]);


  function addImage1Handler(e) {
    setImage1(e.target.files[0]);
  }
  function addImage2Handler(e) {
    setImage2(e.target.files[0]);
  }
  function addImage3Handler(e) {
    setImage3(e.target.files[0]);
  }
  function addRoomName(e) {
    setRoomName(e.target.value);
  }
  function addDescription(e) {
    setDescription(e.target.value);
  }
  function addCapacity(e) {
    setCapacity(e.target.value);
  }
  function addPricePerHoure(e) {
    setPricePerHoure(e.target.value);
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = "https://study-house-backend-production.up.railway.app/api/v1/reservation_Room/rooms/create_room/";
    const config = {
      headers: {
        Authorization: `Bearer ${accessString}`,
      },
    };

    const formData = new FormData();
    formData.append("room_number", roomName)
    formData.append("image1", image1)
    formData.append("image2", image2)
    formData.append("image3", image3)
    formData.append("description", description)
    formData.append("capacity", capacity)
    formData.append("pricePerHoure", pricePerHoure)

    await axios.post(url, formData, config)
      .then((result) => {
        Swal.fire({
          icon: 'success',
          title: 'Room Added',
          text: 'The room has been successfully added.',
        });
        // window.location.reload();

      })
      .catch((error) => {
        console.log(error)
        if (refresh) {
          setAccessString(tokens_access)
          refresh(tokens_refresh);
        }
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while adding the room. Please try again.',
        });
        // window.location.reload();
      });
  };
  return (
    <>
      <div className="bg-[#F2F2F2] container mx-auto py-8 px-4 md:px-8 lg:px-16 xl:px-24 2xl:px-32">
        {is_staffBoolean &&
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Add New Room</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="image1" className="block font-medium mb-2">Image 1:</label>
                <input type="file" id="image1" onChange={addImage1Handler} className="py-2 px-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="mb-4">
                <label htmlFor="image2" className="block font-medium mb-2">Image 2:</label>
                <input type="file" id="image2" onChange={addImage2Handler} className="py-2 px-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="mb-4">
                <label htmlFor="image3" className="block font-medium mb-2">Image 3:</label>
                <input type="file" id="image3" onChange={addImage3Handler} className="py-2 px-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="mb-4">
                <label htmlFor="roomName" className="block font-medium mb-2">Room Name:</label>
                <input type="text" id="roomName" onChange={addRoomName} className="py-2 px-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block font-medium mb-2">Description:</label>
                <input type="text" id="description" onChange={addDescription} className="py-2 px-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="mb-4">
                <label htmlFor="capacity" className="block font-medium mb-2">capacity:</label>
                <input type="text" id="capacity" onChange={addCapacity} className="py-2 px-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="mb-4">
                <label htmlFor="pricePerHoure" className="block font-medium mb-2">Price Per Hour:</label>
                <input type="number" id="pricePerHoure" onChange={addPricePerHoure} className="py-2 px-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="mt-4">
                <button
                  type="submit"
                  className="flex justify-center rounded-md bg-[#A6A6A6] text-[#404040] px-6 py-3 rounded-lg font-bold hover:bg-[#D2D7D9] hover:text-[#A6A6A6] text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-52 md:w-50"
                >
                  Add New Room
                </button>
              </div>
            </div>
          </form>
        }
      </div>
    </>
  );
}