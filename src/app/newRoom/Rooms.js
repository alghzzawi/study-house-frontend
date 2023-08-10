'use client'

import React, { useState, useEffect } from "react";
import axios from "axios";

import RoomCard from "./RoomCard"




export default function Rooms() {

    const [roomsObj, setRoomsObj] = useState([])

    const url = "https://study-house-backend-production.up.railway.app/api/v1/reservation_Room/rooms/";

    useEffect(() => {
        axios.get(url).then((result) => {
            setRoomsObj(result.data);
        })
    }, [])

    const handleRoomDelete = (deletedRoomId) => {
        // Remove the deleted room from the roomsObj array
        setRoomsObj(prevRooms => prevRooms.filter(room => room.id !== deletedRoomId));
      }

    return (
        <main className="bg-[#F2F2F2] h-[100%]">
            <h1 className="text-2xl md:text-xl lg:text-4xl text-gray-700 px-6 py-8">
                Pricing & Room Plans
            </h1>
            {roomsObj.map((room) => (
                <RoomCard
                    key={room.id}
                    room_id={room.id}
                    room_number={room.room_number}
                    image1={room.image1}
                    description={room.description}
                    capacity={room.capacity}
                    pricePerHoure={room.pricePerHoure}
                    onDelete={handleRoomDelete}
                />
            ))}

        </main>
    )
}
