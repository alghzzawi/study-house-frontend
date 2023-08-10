"use client"

import React, {useContext} from "react";

import { AuthContext } from "../countexts/auth";


import Header from "./Header";
import Hero from './Hero'
import Markting from './Markting'
import Markting2 from "./Markting2";
import CTA from './CTA'
import Contact from "./Contact"
import Footer from './Footer'

export default function Main() {
    const { tokens_access} = useContext(AuthContext)

    return (
        <div className="min-h-screen">
            <Header />

            {/* Hero Section */}
            <Hero/>

            {/* Markting */}
            <Markting/>

            {/* Markting2 */}
            <Markting2/>

            {/* CTA Section */}
            <CTA/>

            {/* Contact */}
            {tokens_access ? (<Contact/>) : (<></>)}
            
            
            {/* Footer */}
            <Footer/>
        </div>
    );
}