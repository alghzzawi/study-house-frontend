import React from "react";
import Image from 'next/image'
import brown from "public/assets/meeting-room/1.jpg"


export default function Markting() {
    return (
        <section className="bg-[#F2F2F2] text-[#0D0D0D] py-16 px-8 md:px-16 lg:px-24 xl:px-32">
            <div className="container mx-auto border-solid border-2 border-[#BFBFBF] rounded-md p-8 md:p-12 lg:p-16">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="w-full h-full md:justify-self-end">
                        <Image className="w-full h-full rounded-md mx-auto md:mx-0" src={brown} alt="Image" />
                    </div>
                    <div className="mt-4 md:mt-0">
                        <p className="text-lg md:text-xl">
                            Make a reservation, be wise, and move quickly. Online booking is now available for the Learning & Business Center.
                        </p>
                        <p className="mt-4 text-lg md:text-xl">
                            Online reservations for study spaces are made on a first-come, first-served basis. Reservations can be made last-minute, in-the-moment, or in advance for the quarter.
                        </p>
                        <p className="mt-4 text-lg md:text-xl">
                            You will be expected to adhere to the guidelines for using the Centre`s classrooms.
                        </p>
                    </div>
                </div>
            </div>
        </section>

    )
}
