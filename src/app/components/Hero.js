import React from 'react'
import Image from 'next/image'
import blurred from "public/assets/meeting-room/blurred.jpg"
export default function Hero() {
    return(
        <section className="bg-[#F2F2F2] text-[#0D0D0D] py-16 ">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h2 className="text-4xl font-bold">Study. Work. Learn. Business.</h2>
                            <p className="mt-4">
                                Join us on this transformative journey, where you will meet like-minded individuals, expand your network, and unlock your full potential. We are excited to be part of your learning and business growth, and we look forward to helping you achieve your goals.
                            </p>
                        </div>
                        <div className="md:justify-self-end ">
                            <Image className='rounded-md' src={blurred} alt="Hero Image" width={400} height={300} />
                        </div>
                    </div>
                </div>
            </section>
    )
}