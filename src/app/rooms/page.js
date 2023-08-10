'use client'

import React, { useState, useEffect } from "react";
import axios from "axios";

import RoomCard from "./RoomCard"

import Header from "../components/Header";
import Footer from '../components/Footer'
import RoomsTable from "../startBooking/RoomsTable";



export default function Rooms() {

    const [roomsObj, setRoomsObj] = useState([])

    const url = "https://study-house-backend-production.up.railway.app/api/v1/reservation_Room/rooms/";

    useEffect(() => {
        axios.get(url).then((result) => {
            setRoomsObj(result.data);
        })
    }, [])

    return (
        <main className="bg-[#F2F2F2] h-[100%]">
            <Header />
            <p className="text-lg md:text-xl lg:text-2xl text-[#595352] px-6 py-8">
                The Learning & Business Center provides quiet places for students to sit, work, or read. During finals week of fall, winter and spring quarters, the building is open 24 hours a day, providing a safe environment to study and free snacks to keep energy levels up.
            </p>
            <h1 className="text-2xl md:text-xl lg:text-4xl text-gray-700 px-6 py-8">
                Pricing & Room Plans
            </h1>
            {roomsObj.map((room) => (
                <RoomCard
                    key={room.id}
                    room_id={room.id}
                    room_number={room.room_number}
                    image1={room.image1}
                    image2={room.image2}
                    image3={room.image3}
                    description={room.description}
                    capacity={room.capacity}
                    pricePerHoure={room.pricePerHoure}
                />
            ))}
            <RoomsTable/>
            <Footer />

        </main>
    )
}
