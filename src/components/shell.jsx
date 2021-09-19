import React, { Fragment } from "react"
import { useDispatch } from "react-redux"
import Link from "next/link"
import Image from "next/image"

import { Menu, Transition } from "@headlessui/react"
import { LogoutIcon } from '@heroicons/react/solid'
import { signOutAdmin } from "../actions"
import { useAdmin } from "../hooks"


const Shell = ({children}) => {
    let admin = useAdmin()
    let dispatch = useDispatch()

    const signOut = () => {
        dispatch(signOutAdmin())
    }

    return (
        <div className="flex flex-col absolute top-0 bottom-0 w-full bg-gray-200 overflow-hidden">
            <header className="flex-grow-0 w-full h-12 bg-gray-100 border-b border-gray-300 flex flex-row justify-between px-4">
                <div className="self-center flex flex-row items-center justify-between">
                    <div className="inline-block w-7 h-7">
                        <Image src="/img/gympap.png" width="500" height="500" />
                    </div>
                    <h1 className="inline-block text-2xl font-bold ml-2">
                        GPMT
                    </h1>
                </div>
                <Menu className="relative inline-block text-left" as="div">
                    <Menu.Button className="flex justify-center items-center transform scale-110 my-2 text-gray-700 hover:text-gray-900">
                        <span className="mr-2">{admin?.firstname}</span>

                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </Menu.Button>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 w-56 mt-0 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="px-1 py-1">
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            onClick={signOut}
                                            className={`${
                                            active ? 'bg-blue-500 text-white' : 'text-gray-900 focus:text-white focus:bg-blue-500'
                                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                        >
                                            {active ? (
                                                <LogoutIcon
                                                    className="w-5 h-5 mr-2"
                                                    aria-hidden="true" />
                                            ) : (
                                                <LogoutIcon
                                                    className="w-5 h-5 mr-2"
                                                    aria-hidden="true" />
                                            )}
                                            Auslogen
                                        </button>
                                    )}
                                </Menu.Item>
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </header>
            <main className="flex-grow flex flex-row w-full overflow-hidden">
                <aside className="py-4 w-14 flex-grow-0 flex flex-col bg-gray-100 border-r border-gray-300 text-gray-700">
                    <Link href="/">
                        <a title="Übersicht" className="flex justify-center items-center transform scale-110 my-4 hover:text-gray-900">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </a>
                    </Link>
                    <Link href="/data">
                        <a title="Daten" className="flex justify-center items-center transform scale-105 my-4 hover:text-gray-900">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </a>
                    </Link>
                    <Link href="/photos">
                        <a title="Bilder" className="flex justify-center items-center transform scale-110 my-4 hover:text-gray-900">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </a>
                    </Link>
                    <Link href="/questionnaire">
                        <a title="Fragebogen" className="flex justify-center items-center transform scale-110 my-4 hover:text-gray-900">    
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                            </svg>
                        </a>
                    </Link>
                    
                    
                    <a title="Rasa X" target="_blank" href={process.env.NEXT_PUBLIC_RASA_DASHBOARD_URL} className="flex justify-center items-center transform scale-110 my-4 hover:text-gray-900">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                        </svg>
                    </a>

                    <a title="Notebook" target="_blank" href={process.env.NEXT_PUBLIC_COLAB_URL} className="flex justify-center items-center transform scale-110 my-4 hover:text-gray-900">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                    </a>

                    <Link href="/settings">
                        <a title="Einstellungen" className="mt-auto flex justify-center items-center transform scale-110 my-4 hover:text-gray-900">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                            </svg>
                        </a>
                    </Link>
                </aside>
                <div className="overflow-y-scroll flex-grow">
                    {children}
                </div>
            </main>
        </div>
    )
}

export default Shell
