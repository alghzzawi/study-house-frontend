import React from "react";
import Image from 'next/image'
import group_people from "public/assets/meeting-room/group-people.jpg"

export default function HeroSection() {
    return (
        <section className="relative z-0 text-[#0D0D0D] text-center">
            <div className="absolute inset-0 z-[-1]"
                style={{
                    filter: 'brightness(0.5) invert(.3)',
                }}
            >
                <Image
                    src={group_people}
                    layout="fill"
                    objectFit="cover"
                    alt="Background Image"
                />
            </div>
            <div className="container mx-auto py-24 px-4 md:px-8 lg:px-16 xl:px-24 2xl:px-32">
                <h1 className="text-[#EBF1EF] text-5xl md:text-6xl font-bold mb-4">Book a Room Online</h1>
                <p className="text-[#EBF1EF] text-lg md:text-2xl mb-8">Find the right office for you</p>
            </div>
        </section>
    );
}
