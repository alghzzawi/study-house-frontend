"use client"

import React from 'react';

import Rooms from './Rooms';
import AddRoomTable from './AddRoomTable'
import Header from "../components/Header";
import Footer from '../components/Footer'
import RoomsTable from '../startBooking/RoomsTable';


export default function Main() {

  return (
    <>
    <Header/>
    <Rooms/>
    <RoomsTable/>
    <AddRoomTable/>
    <Footer/>
    </>
  )
}