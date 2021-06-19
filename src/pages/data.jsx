import React, { useRef } from "react"
import Link from "next/link"
import { useSelector } from "react-redux"

import Secure from "../components/secure"
import Shell from "../components/shell"
import { useForecastModels, useUsers } from "../hooks"
import api from "../api/http"

const DataDashboard = () => {
    let uploadFileRef = useRef(null)
    let bearer = useSelector(state => state.bearer)
    let forecastModels = useForecastModels()
    let users = useUsers()



    let selectedModel = e => {
        e.preventDefault()
        let formData = new FormData()
        formData.append("model", uploadFileRef.current.files[0])
        api.init(bearer)
        // TODO check response and add model
        api.uploadForecastModel(formData)
            .then(res => res.data)
    }

    return (
        <Shell>
            <div className="p-4 w-full grid grid-cols-1 2xl:grid-cols-2 gap-4">
                <div className="space-y-3">
                    <div className="w-full flex flex-row justify-between items-center">
                        <h4 className="text-lg font-semibold text-gray-700 tracking-wide">Modelle</h4>
                        <button onClick={e => uploadFileRef.current.click()} className="ml-2 px-4 py-2 self-stretch rounded-md bg-blue-600 text-white focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 focus:outline-none focus:ring-offset-gray-300 flex-grow-0">
                            Upload

                            <form hidden>
                                <input
                                    ref={uploadFileRef}
                                    onChange={selectedModel}
                                    accept="*"
                                    type="file"
                                    />
                                <input type="submit" />
                            </form>
                        </button>
                    </div>
                    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-3">
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
                                                {forecastModels.map(model => 
                                                    <tr key={model._id}>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex items-center text-sm">
                                                                {model.timestamp}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm text-gray-900">{model.timestamp}</div>
                                                            <div className="text-sm text-gray-500">13:35</div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            {
                                                                !model.active && 
                                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                                    Aktiv
                                                                </span>
                                                            }
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium text-right">
                                                            {
                                                                model.active && 
                                                                <button className="text-blue-600 hover:text-blue-700 hover:bg-blue-200 transition-colors duration-100 rounded-md px-3 py-2 text-right">
                                                                    Aktivieren
                                                                </button>
                                                            }
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium text-right">
                                                            {
                                                                model.active && 
                                                                <button className="text-blue-600 hover:text-blue-700 hover:bg-blue-200 transition-colors duration-100 rounded-md px-3 py-2 text-right">
                                                                    Löschen
                                                                </button>
                                                            }
                                                        </td>
                                                    </tr>
                                                )}
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
                        <h4 className="text-lg font-semibold text-gray-700 tracking-wide">Daten</h4>
                        <a href={`${process.env.NEXT_PUBLIC_API_URL}/admin/data/download`} className="ml-2 px-4 py-2 self-stretch rounded-md bg-blue-600 text-white focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 focus:outline-none focus:ring-offset-gray-300 flex-grow-0">
                            Download
                        </a>
                    </div>
                    <div className="flex flex-col">
                        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Nutzer ID
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Geburtsdatum
                                                </th>
                                                <th scope="col" className="relative px-6 py-3">
                                                    <span className="sr-only">Download</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {users.map(user => 
                                                <tr key={user._id}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {user._id}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {user.birthDay}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium text-right">
                                                        <button  className="text-blue-600 hover:text-blue-700 hover:bg-blue-200 transition-colors duration-100 rounded-md px-3 py-2 text-right">
                                                            Download
                                                        </button>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Shell>
    )
}

const SecureDataDashboard = () => ( 
    <Secure>
        <DataDashboard></DataDashboard>
    </Secure>
)

export default SecureDataDashboard