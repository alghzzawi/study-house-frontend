"use client"

import React, {useContext} from "react";
import Image from 'next/image'
import Link from "next/link";

import beautiful from "public/assets/meeting-room/beautiful.jpg"

import { AuthContext } from "../countexts/auth";

export default function CTA() {
    const { tokens_access } = useContext(AuthContext)
    return (
        <section className="bg-[#F2F2F2] py-32">
            <section className="bg-[#BFBFBF] text-white px-10 py-16 flex flex-col md:flex-row items-center justify-center">
                <div className="container mx-auto px-4 text-center md:text-left md:w-1/2 md:pr-8">
                    <h2 className="text-3xl font-bold mb-8">We'll help you find the dedicated office.</h2>
                    <p className="text-lg mb-8">
                        LBC has customizable offices, our offices are dedicated to holding meetings in a quiet place, and all the necessities to start your study or work journey.
                    </p>
                    {tokens_access ? (
                        <Link href="/rooms" className="bg-[#404040] text-[#D2D7D9] px-6 py-3 rounded-lg font-bold hover:bg-[#A6A6A6] hover:text-[#404040]">
                            Start Booking
                        </Link>
                    ) : (
                        <Link href="/login" className="bg-[#404040] text-[#D2D7D9] px-6 py-3 rounded-lg font-bold hover:bg-[#A6A6A6] hover:text-[#404040]">
                            Start Booking
                        </Link>
                    )}
                </div>
                <div className="md:w-1/2 flex items-center justify-center">
                    <Image className="md:w-full rounded-md" src={beautiful} alt="Image" />
                </div>
            </section>
        </section>
    )
}
