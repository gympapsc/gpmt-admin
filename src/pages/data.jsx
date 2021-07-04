import React, { useRef, useState } from "react"
import { useDispatch } from "react-redux"

import Secure from "../components/secure"
import Shell from "../components/shell"
import { useForecastModels, useUsers } from "../hooks"
import api from "../api/http"
import { activateForecastModel, deleteForecastModel, addForecastModel } from "../actions"

const itemCount = 15

const DataDashboard = () => {
    let [page, setPage] = useState(1)
    let uploadFileRef = useRef(null)
    let forecastModels = useForecastModels()
        .sort((a, b) => new Date(b.timestamp).valueOf() - new Date(a.timestamp).valueOf())
    let dispatch = useDispatch()
    let users = useUsers()


    let selectedModel = e => {
        e.preventDefault()
        let formData = new FormData()
        formData.append("model", uploadFileRef.current.files[0])
        api.uploadForecastModel(formData)
            .then(res => res.data)
            .then(data => {
                if(data.model) {
                    dispatch(addForecastModel(data.model))
                } else if(data.err) {
                    dispatch({
                        type: "UPLOAD_ERROR"
                    })
                }
            })
            .catch(err => dispatch({ type: "UPLOAD_ERROR" }))
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
                        <div className="col-span-1 h-24 text-black rounded-md bg-white flex flex-col">
                            <div className="w-full bg-gray-100 px-3 py-3  rounded-t-md">
                                <h3 className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Täglich aktive Nutzer</h3>
                            </div>
                            <div className="mt-auto p-3">
                                <span className="text-2xl md:text-3xl font-bold">10<span className="text-base font-medium text-gray-700"> Nutzer</span></span>
                            </div>
                        </div>
                        <div className="col-span-1 h-24 text-black rounded-md bg-white flex flex-col">
                            <div className="w-full bg-gray-100 px-3 py-3  rounded-t-md">
                                <h3 className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monatlich aktive Nutzer</h3>
                            </div>
                            <div className="mt-auto p-3">
                                <span className="text-2xl md:text-3xl font-bold">62</span><span className="text-base font-medium text-gray-700"> Nutzer</span>
                            </div>
                        </div>
                        <div className="col-span-1 h-24 text-black rounded-md bg-white flex flex-col">
                            <div className="w-full bg-gray-100 px-3 py-3  rounded-t-md">
                                <h3 className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Einträge</h3>
                            </div>
                            <div className="mt-auto p-3">
                                <span className="text-2xl md:text-3xl font-bold">879</span><span className="text-base"> Einträge</span>
                            </div>
                        </div>
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
                                                {forecastModels.map(m => 
                                                    <tr key={m._id}>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex items-center text-sm">
                                                                {m._id}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm text-gray-900">{new Date(m.timestamp).toLocaleTimeString()}</div>
                                                            <div className="text-sm text-gray-500">13:35</div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            {
                                                                m.active && 
                                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                                    Aktiv
                                                                </span>
                                                            }
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium text-right">
                                                            {
                                                                m.active ||
                                                                <button onClick={e => dispatch(activateForecastModel(m._id))} className="text-blue-600 hover:text-blue-700 hover:bg-blue-200 transition-colors duration-100 rounded-md px-3 py-2 text-right">
                                                                    Aktivieren
                                                                </button>
                                                            }
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium text-right">
                                                            {
                                                                m.active ||
                                                                <button onClick={e => dispatch(deleteForecastModel(m._id))} className="text-blue-600 hover:text-blue-700 hover:bg-blue-200 transition-colors duration-100 rounded-md px-3 py-2 text-right">
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
                                                    Nachname
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Vorname
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Geburtsdatum
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Anmeldedatum
                                                </th>
                                                <th scope="col" className="relative px-6 py-3">
                                                    <span className="sr-only">Download</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {users.slice((page - 1) *itemCount, page * itemCount).map(user => 
                                                <tr key={user._id}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {user._id}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {user.surname}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {user.firstname}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {new Date(user.birthDate).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {new Date(user.timestamp).toLocaleDateString()}
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
                    <div className="flex flex-row justify-around">
                        <div>
                            <button disabled={page === 1} className="p-2 rounded-md hover:bg-blue-200 text-blue-700 transition-colors duration-150" onClick={() => setPage(page - 1)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                            </button>
                            <div className="font-medium rounded-full w-10 h-10 align-bottom mx-4 bg-gray-300 inline-flex flex-col justify-center items-center">
                                <span>{page}</span>
                            </div>
                            <button className="p-2 rounded-md hover:bg-blue-200 text-blue-700 transition-colors duration-150" onClick={() => setPage(page + 1)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </button>
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