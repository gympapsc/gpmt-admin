import React from "react"

import Secure from "../components/secure"
import Shell from "../components/shell"

const Dashboard = () => {

    return (
        <Secure>
            <Shell>
                <div className="p-4 w-full grid grid-cols-1 grid-rows-auto xl:grid-cols-2 2xl:grid-cols-3 gap-3 xl:gap-4">
                    <div className="space-y-2">
                        <h4 className="text-lg font-semibold text-gray-700 tracking-wide">Nutzer</h4>
                        <div className="grid grid-cols-2 w-full gap-2">
                            <div className="col-span-1 text-black rounded-md bg-white flex flex-col p-3">
                                <h3 className="text-sm font-medium">Aktive Nutzer</h3>
                            </div>
                            <div className="col-span-1 text-black rounded-md bg-white flex flex-col p-3">
                                <h3 className="text-sm font-medium">Geschlecht</h3>
                            </div>
                            <div className="col-span-1 text-black rounded-md bg-white flex flex-col p-3">
                                <h3 className="text-sm font-medium">Altersverteilung</h3>
                            </div>
                            <div className="col-span-1 text-black rounded-md bg-white flex flex-col p-3">
                                <h3 className="text-sm font-medium">BMI-Verteilung</h3>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <h4 className="text-lg font-semibold text-gray-700 tracking-wide">Daten</h4>
                        <div className="grid grid-cols-2 w-full gap-2">
                            <div className="col-span-1 row-span-2 text-black rounded-md bg-white flex flex-col p-3">
                                <h3 className="text-sm font-medium">Geschlecht</h3>
                            </div>
                            <div className="col-span-1 row-span-2 text-black rounded-md bg-white flex flex-col p-3">
                                <h3 className="text-sm font-medium">Miktionsfrequenz</h3>
                            </div>
                            <div className="col-span-1 row-span-2 text-black rounded-md bg-white flex flex-col p-3">
                                <h3 className="text-sm font-medium">Geschlecht</h3>
                            </div>
                            <div className="col-span-1 row-span-2 text-black rounded-md bg-white flex flex-col p-3">
                                <h3 className="text-sm font-medium">Geschlecht</h3>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <h4 className="text-lg font-semibold text-gray-700 tracking-wide">Miktionsmodell</h4>
                        <div className="grid grid-cols-2 w-full gap-2">
                            <div className="col-span-1 row-span-2 text-black rounded-md bg-white flex flex-col p-3">
                                <h3 className="text-sm font-medium">Genauigkeit</h3>
                            </div>
                            <div className="col-span-1 row-span-2 text-black rounded-md bg-white flex flex-col p-3">
                                <h3 className="text-sm font-medium">Recall</h3>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <h4 className="text-lg font-semibold text-gray-700 tracking-wide">Bildklassifikation</h4>
                        <div className="grid grid-cols-2 w-full gap-2">
                            <div className="col-span-1 row-span-2 text-black rounded-md bg-white flex flex-col p-3">
                                <h3 className="text-sm font-medium">Genauigkeit</h3>
                            </div>
                            <div className="col-span-1 row-span-2 text-black rounded-md bg-white flex flex-col p-3">
                                <h3 className="text-sm font-medium">Recall</h3>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <h4 className="text-lg font-semibold text-gray-700 tracking-wide">Fragebogen</h4>
                        <div className="grid grid-cols-2 w-full gap-2">
                            <div className="col-span-1 row-span-2 text-black rounded-md bg-white flex flex-col p-3">
                                <h3 className="text-sm font-medium">Vorerkrankungen</h3>
                            </div>
                            <div className="col-span-1 row-span-2 text-black rounded-md bg-white flex flex-col p-3">
                                <h3 className="text-sm font-medium">Recall</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </Shell>
        </Secure>
    )
}

export default Dashboard