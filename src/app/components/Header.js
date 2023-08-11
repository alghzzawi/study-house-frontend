"use client"

import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../countexts/auth";

import Image from "next/image";
import Link from "next/link";
import { Menu } from "@headlessui/react";

import logo from "public/assets/logo.png"
import employeeLogo from "public/assets/employee_logo.png"


export default function Header() {

  const navigation = [
    { name: " Overview ", href: "/" },
    { name: " StartBooking ", href: "/startBooking" },
    { name: " Offices ", href: "/rooms" },
  ]

  const navNotSigned = [
    { name: " Sign In ", href: "/login" },
  ]

  const navReservationsEmployee = [
    { name: " Reservations ", href: "/reservations" },
    { name: " Add Reservation ", href: "/newReservations" },

  ]

  const navAdmin = [
    { name: " Reservations ", href: "/reservations" },
    { name: " Add employee ", href: "/employeeReges" },
    { name: " Add room", href: "/newRoom" },


  ]

  const { tokens_access, logout, is_staff, is_employee } = useContext(AuthContext)

  const [is_staffBoolean, setIs_staffBoolean] = useState(false)
  const [is_employeeBoolean, setIs_employeeBoolean] = useState(false)

  useEffect(() => {
    const convertToBoolean = (value) => value === "true";

    const updateStateBasedOnContext = () => {
      if (typeof is_staff === "string") {
        setIs_staffBoolean(convertToBoolean(is_staff));
      } else if (typeof is_staff === "boolean") {
        setIs_staffBoolean(is_staff);
      } else {
        setIs_staffBoolean(false);
      }

      if (typeof is_employee === "string") {
        setIs_employeeBoolean(convertToBoolean(is_employee));
      } else if (typeof is_employee === "boolean") {
        setIs_employeeBoolean(is_employee);
      } else {
        setIs_employeeBoolean(false);
      }
    };

    updateStateBasedOnContext();


    let isStaffSubscription;
    let isEmployeeSubscription;

    if (is_staff !== null && is_staff !== undefined && is_staff.onUpdate) {
      isStaffSubscription = is_staff.onUpdate((value) => {
        setIs_staffBoolean(convertToBoolean(value));
      });
    }

    if (is_employee !== null && is_employee !== undefined && is_employee.onUpdate) {
      isEmployeeSubscription = is_employee.onUpdate((value) => {
        setIs_employeeBoolean(convertToBoolean(value));
      });
    }

    return () => {
      if (isStaffSubscription) {
        isStaffSubscription.unsubscribe();
      }
      if (isEmployeeSubscription) {
        isEmployeeSubscription.unsubscribe();
      }
    };
  }, [is_staff, is_employee]);



  return (
    <header className="bg-[#e8e8e8] text-[#0D0D0D] text-base font-semibold py-4 px-8 items-center">
      {is_staffBoolean ? (
        <section className="flex justify-between">
          <div className="w-72">
            <Image src={employeeLogo} alt="logo" />
          </div>
          <div className="flex items-center space-x-4">
            {navAdmin.map((item) => (
              <Link
                className="hover:rounded-e-md hover:border-b hover:border-[#404040] transition-all duration-300 ease-in-out"
                key={item.name}
                href={item.href}>
                {item.name}
              </Link>
            ))}
            <div>

              <Menu as="div" id="your-fixed-id" >
                <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <Image className="h-8 w-8 rounded-full" src={logo} alt="profile image" width={200} height={200} />
                </Menu.Button>
                <Menu.Items className="absolute right-0 z-10 mt-2 mr-6 w-32 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item className="block px-4 py-2 text-sm text-gray-700">
                    {({ active }) => (
                      <button
                        onClick={logout}
                        className="block px-4 py-2"
                      >
                        sign-out
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            </div>
          </div>
        </section>

      ) : is_employeeBoolean ? (
        <section className="flex justify-between">
          <div className="w-72">
            <Image src={employeeLogo} alt="logo" />
          </div>
          <div className="flex items-center space-x-4">
            {navReservationsEmployee.map((item) => (
              <Link
                className="hover:rounded-e-md hover:border-b hover:border-[#404040] transition-all duration-300 ease-in-out"
                key={item.name}
                href={item.href}>
                {item.name}
              </Link>
            ))}
            <div>

              <Menu as="div" id="your-fixed-id" >
                <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" >
                  <Image className="h-8 w-8 rounded-full" src={logo} alt="profile image" width={200} height={48} />
                </Menu.Button>
                <Menu.Items className="absolute right-0 z-10 mt-2 mr-6 w-32 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item className="block px-4 py-2 text-sm text-gray-700">
                    {({ active }) => (
                      <button
                        onClick={logout}
                        className="block px-4 py-2 text-black"
                      >
                        sign-out
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            </div>
          </div>
        </section>
      ) : (
        <section className="flex justify-between">
          <div className="w-72">
            <Image src={logo} alt="logo" />
          </div>
          <div className="flex items-center space-x-4">
            {navigation.map((item) => (
              <Link
                className="hover:rounded-e-md hover:border-b hover:border-[#404040] transition-all duration-300 ease-in-out"
                key={item.name}
                href={item.href}>
                {item.name}
              </Link>
            ))}
            {tokens_access ? (
              <div>
                <Menu as="div" id="your-fixed-id">
                  <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <Image className="h-8 w-8 rounded-full" src={logo} alt="profile image" width={200} height={48} />
                  </Menu.Button>
                  <Menu.Items className="absolute right-0 z-10 mt-2 mr-6 w-32 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item className="block px-4 py-2 text-sm text-gray-700">
                      {({ active }) => (
                        <Link
                          className="block px-4 py-2"
                          href="/profile">
                          Profile
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={logout}
                          className="block px-4 py-2 text-black"
                        >
                          sign-out
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              </div>
            ) : (
              navNotSigned.map((item) => (
                <Link key={item.name} href={item.href}>
                  {item.name}
                </Link>
              ))
            )}
          </div>
        </section>
      )}
    </header>
  )
}