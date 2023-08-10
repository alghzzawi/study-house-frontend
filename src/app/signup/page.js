"use client"
import React, { useContext } from 'react';
import axios from 'axios';

import Link from 'next/link';
import Image from 'next/image';

import Swal from 'sweetalert2';

import logo from 'public/assets/logo.png'

import { AuthContext } from "../countexts/auth";

export default function Signup() {
    const { tokens_access } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        const url = "https://study-house-backend-production.up.railway.app/api/v1/accounts/register/"
        const obj = {
            username: e.target.username.value,
            email: e.target.email.value,
            phone_number: e.target.phone_number.value,
            Is_employee: false,
            password: e.target.password.value,
            password2: e.target.password2.value,
        }
        axios
            .post(url, obj)
            .then((result) => {
                const res = result.data

                if (res.hasOwnProperty("response")) {

                    Swal.fire({
                        icon: 'success',
                        title: ` A new account has been created under the name of  ${result.data.username}`,
                        showConfirmButton: false,
                        timer: 3000
                    })

                } else if (res.hasOwnProperty("username")) {

                    Swal.fire({
                        icon: 'error',
                        title: `${result.data.username}`,
                        showConfirmButton: false,
                        timer: 3000
                    })
                } else if (res.hasOwnProperty("email")) {

                    Swal.fire({
                        icon: 'error',
                        title: `${res.email.email}`,
                        showConfirmButton: false,
                        timer: 3000
                    })
                } else if (res.hasOwnProperty("password")) {

                    Swal.fire({
                        icon: 'error',
                        title: `${res.password}`,
                        showConfirmButton: false,
                        timer: 3000
                    })
                }
            })
            .catch((err) => {
                // console.log(err)
            })
    }

    return (
        <div className="flex min-h-screen bg-[#F2F2F2]">
            {tokens_access ? (
                <></>
            ) : (
                <div className="flex flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
                    <div className="sm:w-full sm:max-w-sm">
                        <Link href="/">
                            <Image

                                className="mx-auto h-10 w-auto"
                                src={logo}
                                alt="Your Company"
                            />
                        </Link>
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Create a new account
                        </h2>
                    </div>

                    <div className="mt-10 sm:w-full sm:max-w-sm sm:flex-col">
                        <form className="space-y-6 w-full sm:w-auto sm:flex-grow" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">
                                    User Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="username"
                                        name="username"
                                        type="text"
                                        autoComplete="username"
                                        required
                                        className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="text"
                                        autoComplete="email"
                                        required
                                        className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">
                                    Phone Number
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="phone_number"
                                        name="phone_number"
                                        type="text"
                                        autoComplete="phone_number"
                                        required
                                        className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="text" className="flex items-center justify-between">
                                    Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="password"
                                        required
                                        className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="text" className="flex items-center justify-between">
                                    Confirm Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="password2"
                                        name="password2"
                                        type="password"
                                        autoComplete="password2"
                                        required
                                        className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-[#A6A6A6] text-[#404040] px-6 py-3 rounded-lg font-bold hover:bg-[#D2D7D9] hover:text-[#A6A6A6] text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Sign up
                                </button>
                            </div>
                        </form>


                        <p className="mt-10 text-center text-sm text-gray-500 sm:w-auto sm:flex-none">
                            Already have account access?{' '}
                            <Link
                                key=''
                                href='/login'
                                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
