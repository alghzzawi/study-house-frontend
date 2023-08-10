'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image"

import ModalComponent from "./Modal";
import RoomsMap from 'public/assets/RoomsMap.png'

export default function RoomsTable() {

    const [showModal, setShowModal] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(false);

    const [roomsObj, setRoomsObj] = useState([]);
    useEffect(() => {
        const url = "https://study-house-backend-production.up.railway.app/api/v1/reservation_Room/rooms/";
        axios.get(url).then((result) => {
            setRoomsObj(result.data);
        });
    }, []);

    const handleAreaClick = (room_number) => {
        const filteredRooms = roomsObj.filter(room => room.room_number === room_number)
        setSelectedRoom(filteredRooms)
        toggleModal()
    };
    const toggleModal = () => {
        setShowModal((prevState) => !prevState);
    };
    return (
        <section className="bg-[#F2F2F2] py-16 px-4 md:px-8 lg:px-16 xl:px-24 2xl:px-32">
            <h2 className="text-3xl font-bold mb-8">The Group Study Rooms and Capacities</h2>

            <div className="flex flex-col md:flex-row ">
                <div className="w-full md:w-1/2 md:pr-8">
                    <table className="table-auto w-full">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Capacity</th>
                                <th className="px-4 py-2">Room Number</th>
                            </tr>
                        </thead>
                        <tbody className="border rounded">

                            {roomsObj.map((room, index) => (
                                <tr key={index}>
                                    <td className="text-center border  px-4 py-2">{room.capacity}</td>
                                    <td className="text-center border  px-4 py-2">{room.room_number}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="w-full md:w-1/2 md:pl-8 mt-8 md:mt-0">
                    <Image
                        src={RoomsMap}
                        alt="Room"
                        className="w-full h-auto rounded-lg"
                        width={500}
                        height={300}
                        useMap="#workmap"
                    />
                    <map name="workmap" className="hover:cursor-pointer">
                        <area shape="rect" coords="145,0,280,55" alt="A1" onClick={() => handleAreaClick("A1")} />
                        <area shape="rect" coords="110,90,160,140" alt="A3" onClick={() => handleAreaClick("A3")} />
                        <area shape="rect" coords="170,90,220,140" alt="A7" onClick={() => handleAreaClick("A7")} />
                        <area shape="rect" coords="110,150,160,200" alt="A8" onClick={() => handleAreaClick("A8")} />
                        <area shape="rect" coords="170,150,220,200" alt="A8" onClick={() => handleAreaClick("A8")} />
                        <area shape="rect" coords="360,100,530,200" alt="A2" onClick={() => handleAreaClick("A2")} />
                        <area shape="rect" coords="40,320,125,500" alt="A4" onClick={() => handleAreaClick("A4")} />
                        <area shape="rect" coords="140,320,210,500" alt="A5" onClick={() => handleAreaClick("A5")} />
                        <area shape="rect" coords="220,320,300,500" alt="A6" onClick={() => handleAreaClick("A6")} />
                    </map>
                </div>
            </div>
        
            {showModal && selectedRoom[0] ?  (
                <ModalComponent
                    room_id={selectedRoom[0].id}
                    room_number={selectedRoom[0].room_number}
                    image1={selectedRoom[0].image1}
                    image2={selectedRoom[0].image2}
                    image3={selectedRoom[0].image3}
                    description={selectedRoom[0].description}
                    pricePerHoure={selectedRoom[0].pricePerHoure}
                    toggleModal={toggleModal}
                />
            ) : (null)}
        </section>
    );
}
