import React from "react";
import Image from 'next/image'
import logo from 'public/assets/logo.png'
import phone from 'public/assets/telephone.png'
import world from "public/assets/world-ball.png"
export default function Contact() {
    return (
        <section className="bg-[#F2F2F2] pl-4 pr-[10%] md:pl-8 md:pr-[20%] lg:pl-16 lg:pr-[30%] xl:pl-24 xl:pr-[40%] 2xl:pl-32 2xl:pr-[50%] py-16">
            <div className="px-5 py-8 md:py-16 border-4 rounded">
                <h1 className="text-3xl font-bold">Contact</h1>
                <p>Property Address: Al Qaherah 26-28, Abdun Al Shmali, Amman</p>
                <p>Leasing Office: Building 10th, floor 3rd.</p>
                <div className="flex items-center mt-4">
                    <Image alt="" src={phone} className="w-3.5 mr-3"/>
                    <p>Phone Number: +1 123-456-7890</p>
                </div>
                <div className="flex items-center mt-2">
                    <Image alt="" src={world} className="w-3.5 mr-3"/>
                    <p>Language: Arabic</p>
                </div>
                <div className="mt-8 flex flex-col md:flex-row justify-between items-center">
                    <button className="bg-[#404040] text-white px-4 py-2 md:mr-4 mb-4 md:mb-0">Message</button>
                    <Image alt="" src={logo} className="w-72 h-full md:w-72 md:h-full" />
                </div>
            </div>
        </section>
    )
}
