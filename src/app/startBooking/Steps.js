import React from "react";
import Image from "next/image"
import landing from 'public/assets/landing.jpg'
import C1 from 'public/assets/meeting-room/C218.jpg'
import C2 from 'public/assets/meeting-room/C4192189.jpg'
import officeC3 from  'public/assets/meeting-room/office_02.jpg'
export default function Steps() {
    return (
        <>
            <section className="flex justify-center py-16 px-4 md:px-8 lg:px-16 xl:px-24 2xl:px-32">
                <div className="max-w-4xl text-3xl font-normal">
                    <h1 className="text-center">
                        Daily office space rental whenever you need it, by the hour, day, or longer, at 4,000+ locations worldwide. You can even book and access on the same day.
                    </h1>
                </div>
            </section>

            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-8">Rent an office in 3 easy steps.</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="border p-4 rounded-md shadow-md h-[380px] flex flex-col justify-between">
                            <div>
                                <h3 className="font-bold mt-4">1. Choose and configure your office space</h3>
                                <p className="my-3">
                                    Decide where you’d like to work, how many people need to access the space and what features are most important to your team.
                                </p>
                            </div>
                            <div className="h-[150px] md:h-[200px]">
                                <Image className="w-full h-full rounded-md object-cover" src={C1} alt="Feature 1" />
                            </div>
                        </div>
                        <div className="border p-4 rounded-md shadow-md h-[380px] flex flex-col justify-between">
                            <div>
                                <h3 className="font-bold mt-4">2. Upgrade it and customise it.</h3>
                                <p className="my-3">
                                    Leave the details to us, and upgrade and customise yourspace to meet your team`s exact needs.
                                </p>
                            </div>
                            <div className="h-[150px] md:h-[200px]">
                                <Image className="w-full h-full rounded-md object-cover" src={C2} alt="Feature 2" />
                            </div>
                        </div>
                        <div className="border p-4 rounded-md shadow-md h-[380px] flex flex-col justify-between">
                            <div>
                                <h3 className="font-bold mt-4">3. Just sign up and move in.</h3>
                                <p className="my-3">
                                    Sign your contract and move straight in, leaving us to worry about everything else. And if your needs change just speak to our team.
                                </p>
                            </div>
                            <div className="h-[150px] md:h-[200px]">
                                <Image className="w-full h-full rounded-md object-cover" src={officeC3} alt="Feature 3"/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}