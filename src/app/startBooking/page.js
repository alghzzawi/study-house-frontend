import React from "react";
import Header from "../components/Header";
import Hero from "./Hero";
import Markting from "../components/Markting";
import CTA from "./CTA";
import Steps from './Steps'
import RoomsTable from './RoomsTable'
import Contact from "../components/Contact";
import Footer from '../components/Footer'


export default function Main(){
    return(
        <div className="bg-[#F2F2F2] min-h-screen">
            <Header/>
            <Hero/>
            <Markting/>
            <CTA/>
            <Steps/>
            <RoomsTable/>
            <Contact/>
            <Footer/>

        </div>
    )
}