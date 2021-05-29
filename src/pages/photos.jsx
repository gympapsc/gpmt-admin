import React from "react"

import Secure from "../components/secure"
import Shell from "../components/shell"

const PhotoDashboard = () => {
    return (
        <Secure>
            <Shell>
                <div className="p-4 w-full grid grid-cols-1 xl:grid-cols-2 gap-4">
                    <div className="space-y-3">
                        <div className="w-full flex flex-row justify-between items-center">
                            <h4 className="text-lg font-semibold text-gray-700 tracking-wide">Modelle</h4>
                            <button className="ml-2 px-4 py-2 self-stretch rounded-md bg-blue-600 text-white focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 focus:outline-none focus:ring-offset-gray-300 flex-grow-0">
                                Upload
                            </button>
                        </div>
                        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div className="col-span-1 h-24 text-black rounded-md bg-white flex flex-col">
                                <div className="w-full bg-gray-100 px-3 py-3  rounded-t-md">
                                    <h3 className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hochgeladene Bilder</h3>
                                </div>
                                <div className="mt-auto p-3">
                                    <span className="text-2xl md:text-3xl font-bold">650 <span className="text-base font-medium"> Bilder</span></span>
                                </div>
                            </div>
                            <div className="col-span-1 h-24 text-black rounded-md bg-white flex flex-col">
                                <div className="w-full bg-gray-100 px-3 py-3  rounded-t-md">
                                    <h3 className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hochgeladene Bilder</h3>
                                </div>
                                <div className="mt-auto p-3">
                                    <span className="text-2xl md:text-3xl font-bold">62</span><span className="text-base">%</span>
                                </div>
                            </div>
                            <div className="col-span-1 h-24 text-black rounded-md bg-white flex flex-col">
                                <div className="w-full bg-gray-100 px-3 py-3  rounded-t-md">
                                    <h3 className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hochgeladene Bilder</h3>
                                </div>
                                <div className="mt-auto p-3">
                                    <span className="text-2xl md:text-3xl font-bold">62</span><span className="text-base">%</span>
                                </div>
                            </div>
                            <div className="col-span-full h-52 text-black rounded-md bg-white flex flex-col"></div>
                            <div className="col-span-full text-black rounded-md bg-white flex flex-col">
                                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                        <div className="overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Name
                                                        </th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Datum
                                                        </th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Status
                                                        </th>
                                                        <th scope="col" className="relative px-6 py-3">
                                                            <span className="sr-only">Aktivieren</span>
                                                        </th>
                                                        <th scope="col" className="relative px-6 py-3">
                                                            <span className="sr-only">Löschen</span>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    <tr>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex items-center text-sm">
                                                                2021-05-01T13:35:50
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm text-gray-900">Samstag, 01.05.21</div>
                                                            <div className="text-sm text-gray-500">13:35</div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                                Aktiv
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium text-right">
                                                            <a href="#" className="text-blue-600 hover:text-blue-700 hover:bg-blue-200 transition-colors duration-100 rounded-md px-3 py-2 text-right">
                                                                Aktivieren
                                                            </a>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium text-right">
                                                            <a href="#" className="text-blue-600 hover:text-blue-700 hover:bg-blue-200 transition-colors duration-100 rounded-md px-3 py-2 text-right">
                                                                Löschen
                                                            </a>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="space-y-3">
                        <div className="w-full flex flex-row justify-between items-center">
                            <h4 className="text-lg font-semibold text-gray-700 tracking-wide">Bilder</h4>
                            <button className="ml-2 px-4 py-2 self-stretch rounded-md bg-blue-600 text-white focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 focus:outline-none focus:ring-offset-gray-300 flex-grow-0">
                                Download
                            </button>
                        </div>
                        <div className="flex flex-row">
                            <input
                                type="text"
                                className="border border-gray-300 h-12 w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:border-transparent focus:ring-indigo-500" 
                                placeholder="Bildgruppe" />
                        </div>
                        <div className="flex flex-col">
                            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                    <div className="overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Bild
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Datum
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Klassifikation
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Korrektur
                                                    </th>
                                                    <th scope="col" className="relative px-6 py-3">
                                                        <span className="sr-only">Bearbeiten</span>
                                                    </th>
                                                    <th scope="col" className="relative px-6 py-3">
                                                        <span className="sr-only">Löschen</span>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                <tr>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10">
                                                            <img className="h-10 w-10" src="https://upload.wikimedia.org/wikipedia/commons/8/8a/Banana-Single.jpg" alt="" />
                                                        </div>
                                                    </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">Samstag, 01.05.21</div>
                                                        <div className="text-sm text-gray-500">13:35</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                        Banane
                                                    </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        -
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium text-right">
                                                        <a href="#" className="text-blue-600 hover:text-blue-700 hover:bg-blue-200 transition-colors duration-100 rounded-md px-3 py-2 text-right">
                                                            Bearbeiten
                                                        </a>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium text-right">
                                                        <a href="#" className="text-blue-600 hover:text-blue-700 hover:bg-blue-200 transition-colors duration-100 rounded-md px-3 py-2 text-right">
                                                            Löschen
                                                        </a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Shell>
        </Secure>
    )
}

export default PhotoDashboard