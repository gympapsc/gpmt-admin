import React from "react"

import Secure from "../components/secure"
import Shell from "../components/shell"
import { useUsers, useUserStats } from "../hooks"
import UserRegistrationChart from "../visualisations/registrationChart"
import BMIChart from "../visualisations/bmiChart"
import GenderPie from "../visualisations/genderPie"
import EntryChart from "../visualisations/entryChart"
import AgeChart from "../visualisations/ageChart"
import PhotoUploadChart from "../visualisations/photoUploadChart"
import MSPie from "../visualisations/msPie"
import IncontinencePie from "../visualisations/incontinencePie"
import WeightHeightChart from "../visualisations/weightHeightChart"

const Dashboard = () => {

    let { registrations } = useUserStats()
    let users = useUsers()

    let now = new Date()

    return (
        <Secure>
            <Shell>
                <div className="p-4 w-full grid grid-cols-1 grid-rows-auto 2xl:grid-cols-2 gap-3 xl:gap-4">
                    <div className="space-y-2">
                    <div className="w-full flex flex-row">
                            <h4 className="text-lg font-semibold text-gray-700 tracking-wide">Nutzer</h4>
                            <div className="ml-auto text-gray-700 hover:text-gray-900 self-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
                                </svg>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-2">
                            <div className="col-span-1 border border-gray-300 text-black rounded-lg bg-white flex flex-col p-3">
                                <h3 className="text-xs font-medium text-gray-700 uppercase tracking-wide">Registrierungen</h3>
                                <div className="h-72 px-1 pt-4 pb-3">
                                    <UserRegistrationChart />
                                </div>
                            </div>
                            <div className="col-span-1 border border-gray-300 text-black rounded-lg bg-white flex flex-col p-3">
                                <h3 className="text-xs font-medium text-gray-700 uppercase tracking-wide">Geschlechter</h3>
                                <div className="h-72 px-1 pt-4 pb-3">
                                    <GenderPie />
                                </div>
                            </div>
                            <div className="col-span-1 border border-gray-300 text-black rounded-lg bg-white flex flex-col p-3">
                                <h3 className="text-xs font-medium text-gray-700 uppercase tracking-wide">Altersverteilung</h3>
                                <div className="h-72 px-1 pt-4 pb-3">
                                    <AgeChart />
                                </div>
                            </div>
                            <div className="col-span-1 border border-gray-300 text-black rounded-lg bg-white flex flex-col p-3">
                                <h3 className="text-xs font-medium text-gray-700 uppercase tracking-wide">BMI-Verteilung</h3>
                                <div className="h-72 px-1 pt-4 pb-3">
                                    <BMIChart />
                                </div>
                            </div>
                            <div className="col-span-1 border border-gray-300 text-black rounded-lg bg-white flex flex-col p-3">
                                <h3 className="text-xs font-medium text-gray-700 uppercase tracking-wide">Gewicht zu Köpergröße</h3>
                                <div className="h-72 px-1 pt-4 pb-3">
                                    <WeightHeightChart users={users} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="w-full flex flex-row">
                            <h4 className="text-lg font-semibold text-gray-700 tracking-wide">Daten</h4>
                            <div className="ml-auto text-gray-700 hover:text-gray-900 self-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
                                </svg>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 w-full gap-2">
                            <div className="col-span-1 border border-gray-300 row-span-4 text-black rounded-lg bg-white flex flex-col p-3">
                                <h3 className="text-xs font-medium text-gray-700 uppercase tracking-wide">Einträge</h3>
                                <div className="h-72 px-1 pt-4 pb-3">
                                    <EntryChart />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="w-full flex flex-row">
                            <h4 className="text-lg font-semibold text-gray-700 tracking-wide">Bilder</h4>
                            <div className="ml-auto text-gray-700 hover:text-gray-900 self-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
                                </svg>
                            </div>
                        </div>
                        <div className="grid grid-cols-1  w-full gap-2">
                            <div className="col-span-1 border border-gray-300 text-black rounded-lg bg-white flex flex-col p-3">
                                <h3 className="text-xs font-medium text-gray-700 uppercase tracking-wide">Uploads</h3>
                                <div className="h-72 px-1 pt-4 pb-3">
                                    <PhotoUploadChart />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                    <div className="w-full flex flex-row">
                            <h4 className="text-lg font-semibold text-gray-700 tracking-wide">Fragebogen</h4>
                            <div className="ml-auto text-gray-700 hover:text-gray-900 self-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
                                </svg>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-2">
                            <div className="col-span-1 border border-gray-300 row-span-2 text-black rounded-lg bg-white flex flex-col p-3">
                                <h3 className="text-xs font-medium text-gray-700 uppercase tracking-wide">Multiple Sklerose</h3>
                                <div className="h-72 px-1 pt-4 pb-3">
                                    <MSPie />
                                </div>
                            </div>
                            <div className="col-span-1 border border-gray-300 row-span-2 text-black rounded-lg bg-white flex flex-col p-3">
                                <h3 className="text-xs font-medium text-gray-700 uppercase tracking-wide">Inkontinenz</h3>
                                <div className="h-72 px-1 pt-4 pb-3">
                                    <IncontinencePie />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Shell>
        </Secure>
    )
}

export default Dashboard