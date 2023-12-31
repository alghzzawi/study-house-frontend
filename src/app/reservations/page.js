'use client'
import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from "../countexts/auth";
import Header from "../components/Header";
import Footer from '../components/Footer'


import axios from 'axios';

export default function Reservations() {

  const { refresh, tokens_refresh, tokens_access, is_employee, username } = useContext(AuthContext)

  const [accessString, setAccessString] = useState(null)

  const [booleanis_employee, setIs_employeeBoolean] = useState()

  const [updateAddNewReservations, setUpdateAddNewReservations] = useState([])

  const [startdatetime, setStartdatetime] = useState()
  const [enddatetime, setEnddatetime] = useState()

  const [userInfo, setUserInfo] = useState({})

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [reservationToDelete, setReservationToDelete] = useState(null);


  useEffect(() => {
    const convertToBoolean = (value) => value === "true";

    const updateStateBasedOnContext = () => {
      if (typeof is_employee === "string") {
        setIs_employeeBoolean(convertToBoolean(is_employee));
      } else if (typeof is_employee === "boolean") {
        setIs_employeeBoolean(is_employee);
      } else {
        setIs_employeeBoolean(false);
      }
    }

    updateStateBasedOnContext();

    let isEmployeeSubscription;

    if (is_employee !== null && is_employee !== undefined && is_employee.onUpdate) {
      isEmployeeSubscription = is_employee.onUpdate((value) => {
        setIs_employeeBoolean(convertToBoolean(value));
      });
    }

    return () => {
      if (isEmployeeSubscription) {
        isEmployeeSubscription.unsubscribe();
      }
    };
  }, [is_employee]);


  useEffect(() => {
    if (refresh) {
      setAccessString(tokens_access);
      refresh(tokens_refresh);
    }
  }, [refresh, tokens_access, tokens_refresh]);


  useEffect(() => {
    const fetchData = async () => {
      if (accessString) {
        const url_users = `https://study-house-backend-production.up.railway.app/api/v1/accounts/users/${username}`;
        const config = {
          headers: {
            Authorization: `Bearer ${accessString}`,
          },
        }

        const usersResult = await axios.get(url_users, config)
        setUserInfo(usersResult.data)

      }
    }
    fetchData()
  }, [accessString]);


  useEffect(() => {
    const fetchData = async () => {
      if (accessString) {
        const url_reservations = 'https://study-house-backend-production.up.railway.app/api/v1/reservation_Room/reservations/';
        const url_users = "https://study-house-backend-production.up.railway.app/api/v1/accounts/users/";
        const url_rooms = "https://study-house-backend-production.up.railway.app/api/v1/reservation_Room/rooms/";

        const config = {
          headers: {
            Authorization: `Bearer ${accessString}`,
          },
        };

        try {
          const [reservationsResult, usersResult, roomsResult] = await Promise.all([
            axios.get(url_reservations, config),
            axios.get(url_users, config),
            axios.get(url_rooms),
          ]);

          const reservationsData = reservationsResult.data;
          const usersData = usersResult.data;
          const roomsData = roomsResult.data;

          const addnewreservations = reservationsData.map((item) => {
            const matchingObject = roomsData.find((obj) => obj.id === item.room_ID);
            return matchingObject ? { ...item, room_number: matchingObject.room_number } : item;
          });

          const addPricePerHoure = addnewreservations.map((item) => {
            const matchingObject = roomsData.find((obj) => obj.id === item.room_ID);
            return matchingObject ? { ...item, pricePerHoure: matchingObject.pricePerHoure } : item;
          });

          const updateAddNewReservations = addPricePerHoure.map((item) => {
            const matchingObject = usersData.find((obj) => obj.id === item.user_ID);
            return matchingObject ? { ...item, username: matchingObject.username } : item;
          });
          setUpdateAddNewReservations(updateAddNewReservations);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchData();

  }, [accessString]);

  const deleteHandler = async (id) => {
    const url = `https://study-house-backend-production.up.railway.app/api/v1/reservation_Room/reservations/update_reservations/${id}`;
    const config = {
      headers: {
        Authorization: `Bearer ${accessString}`,
      },
    }

    try {
      await axios.delete(url, config);
      setUpdateAddNewReservations((prevReservations) =>
        prevReservations.filter((reservation) => reservation.id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (dateString) => {

    const hasTimePortion = dateString.includes("Z");
    if (hasTimePortion) {
      const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
        timeZone: 'UTC'
      };

      const hasTime = dateString.includes("T");

      const date = new Date(dateString);
      const formattedDate = date.toLocaleString('en-US', options);

      const amPm = formattedDate.slice(-2);
      const formattedTime = formattedDate.slice(0, -6);
      return hasTime ? `${formattedTime} ${amPm}` : `${formattedTime}`;
    
    } else {
    
      const date = new Date(dateString);

      // Extract date and time components
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');

      let hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, '0');

      // Convert hours to 12-hour format and append AM/PM
      let amPm = 'AM';
      if (hours >= 12) {
        amPm = 'PM';
        if (hours > 12) {
          hours -= 12;
        }
      }

      // Format the result
      const formattedDatetime = `${month}/${day}/${year}, ${hours}:${minutes} ${amPm}`;

      return formattedDatetime;
    }
  };


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

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setReservationToDelete(null);
  };


  function handleSubmit(e, user_ID, room_ID, state_active, id) {
    e.preventDefault();
    updateHandeler(user_ID, room_ID, state_active, id);
  }



  const updateHandeler = async (user_ID, room_ID, state_active, id) => {
    const url = `https://study-house-backend-production.up.railway.app/api/v1/reservation_Room/reservations/update_reservations/${id}`;

    const obj = {
      "user_ID": user_ID,
      "room_ID": room_ID,
      "start_time": startdatetime,
      "end_time": enddatetime,
      "state_active": state_active
    }


    const config = {
      headers: {
        Authorization: `Bearer ${accessString}`,
      },
    };

    try {
      await axios.patch(url, obj, config);
      const updatedReservationIndex = updateAddNewReservations.findIndex((reservation) => reservation.id === id);

      if (updatedReservationIndex !== -1) {
        setUpdateAddNewReservations((prevReservations) => {
          const updatedReservations = [...prevReservations];
          updatedReservations[updatedReservationIndex] = {
            ...updatedReservations[updatedReservationIndex],
            start_time: startdatetime,
            end_time: enddatetime,
            state_active: state_active
          };
          return updatedReservations;
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  function startdatetimeHandler(e) {
    setStartdatetime(e.target.value);
  }

  function enddatetimeHandler(e) {
    setEnddatetime(e.target.value);
  }

  return (
    <main className="bg-[#F2F2F2] min-h-screen">
      <Header />
      <div className="flex flex-col md:flex-row">
        <div className="bg-white p-6 shadow-md rounded-md mb-4 md:w-1/3 h-full mt-[7%] mr-4">
          <h2 className="text-2xl font-semibold mb-4">Employee Information</h2>
          <p className="text-[#0D0D0D] mb-2">
            Username: {userInfo.username}
          </p>
          <p className="text-[#0D0D0D] mb-2">
            Email: {userInfo.email}
          </p>
          <p className="text-[#0D0D0D]">
            Phone Number: 00962{userInfo.phone_number}
          </p>
        </div>

        <div className="flex flex-col md:w-2/3">
          {tokens_access && (
            <div className="flex flex-col">
              <h1 className="text-3xl font-semibold mb-6">
                {booleanis_employee ? "Users Reservations" : "Your Reservations"}
              </h1>

              {updateAddNewReservations.map((reserve) => (
                <div
                  key={reserve.id}
                  className="bg-white p-6 rounded-md shadow-md mb-4 flex flex-col"
                >
                  <h3 className="font-medium text-xl mb-2">Name: {reserve.username}</h3>
                  <p className="text-gray-600 mb-2">Room Number: {reserve.room_number}</p>
                  <p className="text-gray-600 mb-2">
                    <span className="font-semibold">Start Time:</span> {formatDate(reserve.start_time)}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <span className="font-semibold">End Time:</span> {formatDate(reserve.end_time)}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <span className="font-semibold">Price Per Hour:</span> {reserve.pricePerHoure}$
                  </p>


                  <form onSubmit={(e) => handleSubmit(e, reserve.user_ID, reserve.room_ID, reserve.state_active, reserve.id)}>
                    <label htmlFor="startdatetime" className="block mb-1 text-gray-600 font-semibold">Select a start date and time:</label>
                    <input
                      type="datetime-local"
                      id="startdatetime"
                      name="startdatetime"
                      onChange={startdatetimeHandler}
                      className="py-2 px-4 mb-2 border rounded-md" />
                    <br />
                    <label htmlFor="enddatetime" className="block mb-1 text-gray-600 font-semibold">Select an end date and time:</label>
                    <input
                      type="datetime-local"
                      id="enddatetime"
                      name="enddatetime"
                      onChange={enddatetimeHandler}
                      className="py-2 px-4 mb-2 border rounded-md" />
                    <br />
                    <button
                      onClick={() => handleDeleteClick(reserve.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md mt-4 self-start"
                    >
                      Delete
                    </button>
                    <button type="submit" className="mx-7 bg-blue-500 text-white  py-2 px-4 rounded hover:bg-blue-600 focus:outline-none">
                      Send
                    </button>
                  </form>
                </div>
              ))}
            </div>
          )}
        </div>
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
      <Footer />

    </main>
  );
}