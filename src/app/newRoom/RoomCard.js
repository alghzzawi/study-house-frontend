'use client'
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../countexts/auth";

export default function RoomCard({room_id, room_number, image1, description, pricePerHoure, capacity, onDelete }) {
  const { refresh, tokens_refresh, tokens_access} = useContext(AuthContext)
    
    
    const [accessString, setAccessString] = useState(null)

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [reservationToDelete, setReservationToDelete] = useState(null);
  
    useEffect(() => {
        if (refresh) {
          setAccessString(tokens_access);
          refresh(tokens_refresh);
        }
      }, [refresh, tokens_access, tokens_refresh]);
    

    const handleDeleteClick = (id) => {
        setReservationToDelete(id);
        setShowDeleteModal(true);
      };

      const handleConfirmDelete = async () => {
        setShowDeleteModal(false);
        if (reservationToDelete !== null) {
          try {
            await deleteHandler(reservationToDelete);
            setReservationToDelete(null);
          } catch (error) {
            console.log(error);
          }
        }
      };

      const deleteHandler = async (id) => {
        const url = `https://study-house-backend-production.up.railway.app/api/v1/reservation_Room/rooms/update_room/${id}`;
        const config = {
          headers: {
            Authorization: `Bearer ${accessString}`,
          },
        }
    
        try {
          await axios.delete(url, config);
          onDelete(room_id);
          if (refresh) {
            setAccessString(tokens_access)
            refresh(tokens_refresh);
          }
        } catch (error) {
          console.log(error);
        }
      };

      const handleCancelDelete = () => {
        setShowDeleteModal(false);
        setReservationToDelete(null);
      };

    return (
<div className="flex flex-col md:flex-row items-stretch shadow-md rounded-lg py-4 md:p-4">
      <div className="w-full md:w-1/2 md:order-1 md:pr-4">
        <img
          src={image1}
          alt={`Room ${room_number}`}
          className="w-full h-[17rem] rounded-lg object-cover"
        />
      </div>

      <div className="w-full md:w-1/2 md:order-2 md:pl-4 mt-4 md:mt-0 text-[#595352]">
        <h1 className="text-2xl font-bold mb-2">Room Name: {room_number}</h1>
        <h1 className="text-lg mb-4">Room Description: {description}</h1>
        <h1 className="text-lg mb-4">Room Capacity: {capacity} Person</h1>
        <h1 className="text-lg mb-2">
          Room Price Per Hour: {pricePerHoure}$
        </h1>
        <button
          onClick={() => handleDeleteClick(room_id)}
          className="bg-red-500 text-white px-4 py-2 rounded-md mt-4 self-start"
        >
          Delete
        </button>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-md flex flex-col items-center">
            <p className="mb-4">Are you sure you want to delete this reservation?</p>
            <div className="flex">
              <button
                onClick={handleConfirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
              >
                Yes
              </button>
              <button
                onClick={handleCancelDelete}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}