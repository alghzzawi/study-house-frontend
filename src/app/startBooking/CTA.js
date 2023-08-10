"use client"

import React, { useContext } from "react";
import Image from 'next/image'
import Link from 'next/link'
import people from "public/assets/meeting-room/people.jpg"

import { AuthContext } from "../countexts/auth";

export default function CTA() {
    const { tokens_access } = useContext(AuthContext)

    return (
        <section className="relative my-16 py-16 z-0">
            <div className="absolute inset-0 z-[-1]"
                style={{
                    filter: 'brightness(0.5) invert(.3)',
                }}
            >
                <Image
                    src={people}
                    layout="fill"
                    objectFit="cover"
                    alt="Background Image"
                />
            </div>

            <div className="bg-white bg-opacity-90 p-8 md:p-12 lg:p-16 xl:p-20 2xl:p-24 max-w-4xl ml-8 md:ml-12 lg:ml-16 xl:ml-20 2xl:ml-24 rounded-lg shadow-xl relative">
                <h2 className="text-3xl font-bold mb-4">Day Offices</h2>
                <p className="mb-6">
                    Why not rent an office for the day when you or your team need somewhere to focus?
                    Our day offices are private, flexible, and hassle-free, and include everything you
                    need to get straight down to work. Including business-grade WiFi and ergonomic furniture.
                    So whether you just want to try a serviced office for size, or need a short-term base
                    for a project, we’ve got the answer. Of course, if you don’t require an office for the full day,
                    we can help out with hourly office space rental options too.
                </p>
                <div className="flex gap-4">
                    {tokens_access ? (
                        <Link href="/rooms" className="bg-[#A6A6A6] text-[#404040] px-6 py-3 rounded-lg font-bold hover:bg-[#D2D7D9] hover:text-[#A6A6A6]">
                            Book Now
                        </Link>
                    ) : (
                        <Link href="/login" className="bg-[#A6A6A6] text-[#404040] px-6 py-3 rounded-lg font-bold hover:bg-[#D2D7D9] hover:text-[#A6A6A6]">
                            Start Booking
                        </Link>
                    )}
                    <button className="text-[#404040] hover: px-6 py-3 rounded-lg font-bold hover:rounded-e-md hover:border-b hover:border-[#404040] transition-all duration-300 ease-in-out">
                        Call us +2697 XXXX XXXX
                    </button>
                </div>
            </div>
        </section>
    );
}
