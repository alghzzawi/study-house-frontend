import React, { useState } from "react";
import ModalComponent from "./Modal";

export default function RoomCard({ room_id, room_number, image1, image2, image3, description, pricePerHoure, capacity }) {
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal((prevState) => !prevState);
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
                    onClick={toggleModal}
                    className="py-2 px-4 rounded-md bg-[#A6A6A6] text-[#404040] px-6 py-3 rounded-lg font-bold hover:bg-[#D2D7D9] hover:text-[#A6A6A6] text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors duration-200"
                >
                    Reservation Request
                </button>
            </div>

            {showModal && (
                <ModalComponent
                    room_id={room_id}
                    room_number={room_number}
                    image1={image1}
                    image2={image2}
                    image3={image3}
                    description={description}
                    pricePerHoure={pricePerHoure}
                    toggleModal={toggleModal}
                />
            )}
        </div>
    );
}