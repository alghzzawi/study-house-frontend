'use client'
import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import Modal from "react-modal";
import { AuthContext } from "../countexts/auth";
import Link from "next/link";
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function ModalComponent({ room_id, room_number, image1, image2, image3, description, pricePerHoure, toggleModal, capacity }) {
    const { tokens_refresh, tokens_access, refresh, userId } = useContext(AuthContext)

    const [accessString, setAccessString] = useState(null)

    const [startdatetime, setStartdatetime] = useState()
    const [enddatetime, setEnddatetime] = useState()

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        if (refresh) {
            setAccessString(tokens_access)
            refresh(tokens_refresh);
        }
    }, [refresh, tokens_refresh, tokens_access])


    async function create_reservations(e) {
        e.preventDefault();


        const url = 'https://study-house-backend-production.up.railway.app/api/v1/reservation_Room/reservations/create_reservations/'
        const obj = {
            "user_ID": Number(userId),
            "room_ID": room_id,
            "start_time": startdatetime,
            "end_time": enddatetime,
            "state_active": false
        }

        const config = {
            headers: {
                Authorization: `Bearer ${accessString}`,
            },
        };

        try {
            await axios.post(url, obj, config)
            Swal.fire({
                icon: 'success',
                title: ` reservation request send successfuly `,
                showConfirmButton: false,
                timer: 3000
            })
        } catch (error) {
            // console.log(error)
            Swal.fire({
                icon: 'error',
                title: `add start date and end date to send the reservation`,
                showConfirmButton: false,
                timer: 3000
            })
        }
    }

    function startdatetimeHandler(e) {
        setStartdatetime(e.target.value)
    }

    function enddatetimeHandler(e) {
        setEnddatetime(e.target.value)
    }

    return (
        <Modal
            isOpen={true}
            onRequestClose={toggleModal}
            ariaHideApp={false}
            className="fixed inset-0 flex justify-center items-center"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
            <div className="bg-white p-8 rounded-md max-w-xl">
                <h1 className="text-2xl font-bold mb-4">Room Name: {room_number}</h1>
                <div className="relative mb-4">
                    <img src={[image1, image2, image3][currentImageIndex]} alt={`Room ${room_number} Image ${currentImageIndex + 1}`} className="mb-4 rounded-md h-[15rem] w-[23rem]" />
                    <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
                        <button
                            onClick={() => setCurrentImageIndex((prevIndex) => Math.max(prevIndex - 1, 0))}
                            className="text-2xl bg-transparent hover:h-full  bg-gray-100  text-[#0D0D0D] p-2  rounded-full hover:bg-gray-200 transition-colors duration-200"
                        >
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </button>

                    </div>
                    <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
                        <button
                            onClick={() => setCurrentImageIndex((prevIndex) => Math.min(prevIndex + 1, 2))}
                            className="text-2xl bg-transparent hover:h-full  bg-gray-100  text-[#0D0D0D] p-2  rounded-full hover:bg-gray-200 transition-colors duration-200"
                        >
                            <FontAwesomeIcon icon={faArrowRight} />
                        </button>
                    </div>
                </div>

                <h1 className="mb-4">Room Description: {description}</h1>
                {tokens_access ? (
                    <form onSubmit={create_reservations} className="mb-4">
                        <label htmlFor="startdatetime" className="block mb-1 text-gray-600 font-semibold">Select a start date and time:</label>
                        <input
                            type="datetime-local"
                            id="startdatetime"
                            name="startdatetime"
                            onChange={startdatetimeHandler}
                            className="w-full py-2 px-4 mb-2 border rounded-md"
                        />
                        <label htmlFor="enddatetime" className="block mb-1 text-gray-600 font-semibold">Select an end date and time:</label>
                        <input
                            type="datetime-local"
                            id="enddatetime"
                            name="enddatetime"
                            onChange={enddatetimeHandler}
                            className="w-full py-2 px-4 mb-2 border rounded-md"
                        />
                        <div className="flex justify-space gap-5">
                            <button
                                type="submit"
                                className="py-2 px-4 rounded-md bg-[#A6A6A6] text-[#404040] px-6 py-3 rounded-lg font-bold hover:bg-[#D2D7D9] hover:text-[#A6A6A6] text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors duration-200"
                            >
                                Send Request
                            </button>
                            <p className="text-2xl font-bold">
                                Per/hor: <span className="text-2xl font-bold text-green-500">
                                    {pricePerHoure}$
                                </span>
                            </p>
                        </div>
                    </form>
                ) : (
                    <h1 className="mb-4">
                        You should <Link href="./login" className="text-blue-500">sign in</Link>
                    </h1>
                )}
                <button
                    onClick={toggleModal}
                    className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors duration-200"
                >
                    Close
                </button>
            </div>
        </Modal>
    );
}