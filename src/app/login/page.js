"use client"

import React, { useContext, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AuthContext } from "../countexts/auth";
import Main from '../components/Main'
import logo from "public/assets/logo.png"

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, tokens_access } = useContext(AuthContext);

  function usernameChangeHandler(e) {
    setUsername(e.target.value);
  }

  function passwordChangeHandler(e) {
    setPassword(e.target.value);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    login({
      username,
      password,
    })
  }

  return (
    <div className="flex min-h-screen bg-[#F2F2F2]">
      {tokens_access ? (
        <Main />
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
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:w-full sm:max-w-sm sm:flex-col">
            <form className="space-y-6 w-full sm:w-auto sm:flex-grow" onSubmit={submitHandler}>
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
                    onChange={usernameChangeHandler}
                    required
                    className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    onChange={passwordChangeHandler}
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
                  Sign in
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500 sm:w-auto sm:flex-none">
              New Customer OR dont have online account access?{' '}
              <Link
                key=''
                href='/signup'
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Signup
              </Link>
            </p>
          </div>

        </div>
      )}
    </div>
  );
}
