import React from "react";
import Image from 'next/image'
import people from "public/assets/meeting-room/people.jpg"

export default function Markting() {
    return (
        <section className="py-16 bg-[#F2F2F2] relative">
            <section className="absolute inset-0 mx-auto mt-16 z-10 w-11/12 md:w-2/3 lg:w-1/2 xl:w-full">
                <section className="flex flex-col items-center gap-8 text-center">
                    <h2 className="text-3xl font-bold text-[#F2F2F2]">Book smart and book fast</h2>
                    <p className="text-lg text-[#F2F2F2]">
                        Reserve a study room online for the Learning & Business Center
                    </p>
                    <p className="text-lg text-[#F2F2F2]">
                        Workplace Learn Wi-Fi, whiteboards, power, and nearby restrooms included
                    </p>
                </section>
            </section>
            <div className="z-0 h-[15rem] w-full">
                <div
                    className="absolute inset-0 w-full h-full"
                    style={{
                        filter: 'brightness(0.5) invert(.3)',
                    }}
                >
                    <Image
                        src={people}
                        layout="fill"
                        alt="profile"
                        objectFit="cover"
                        sizes="100vw"
                    ></Image>
                </div>
            </div>
        </section>
    );
}
