import React, { useRef, useState } from "react"
import api from "../api/http"

import { useDispatch } from "react-redux"

import Secure from "../components/secure"
import Shell from "../components/shell"

import {
    useClassificationModels,
    usePhotos
} from "../hooks"
import { activatePhotoModel, deletePhotoClassificationModel, addPhotoClassificationModel } from "../actions"

const PhotoDashboard = () => {
    let uploadFileRef = useRef(null)
    let dispatch = useDispatch()
    let [photoQuery, setPhotoQuery] = useState("")
    let classificationModels = useClassificationModels()
        .sort((a, b) => new Date(b.timestamp).valueOf() - new Date(a.timestamp).valueOf())
    let photos = usePhotos(photoQuery)
        .sort((a, b) => new Date(b.timestamp).valueOf() - new Date(a.timestamp).valueOf())

    const selectedModel = e => {
        let formData = new FormData()
        formData.append("model", uploadFileRef.current.files[0])
        api.uploadPhotoClassificationModel(formData)
            .then(res => res.data)
            .then(data => {
                console.log(data.model)
                if(data.model) {
                    dispatch(addPhotoClassificationModel(data.model))
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
                            <div className="-my-2 overflow-x-auto ">
                                <div className="py-2 align-middle inline-block min-w-full">
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
                                                {classificationModels.map(m => 
                                                    <tr key={m._id}>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex items-center text-sm">
                                                                {m._id}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm text-gray-900">Samstag, 01.05.21</div>
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
                                                                <button onClick={e => dispatch(activatePhotoModel(m._id))} className="text-blue-600 hover:text-blue-700 hover:bg-blue-200 transition-colors duration-100 rounded-md px-3 py-2 text-right">
                                                                    Aktivieren
                                                                </button>
                                                            }
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium text-right">
                                                            {
                                                                m.active ||
                                                                <button onClick={e => dispatch(deletePhotoClassificationModel(m._id))} className="text-blue-600 hover:text-blue-700 hover:bg-blue-200 transition-colors duration-100 rounded-md px-3 py-2 text-right">
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
                        <h4 className="text-lg font-semibold text-gray-700 tracking-wide">Bilder</h4>
                        <a href={`${process.env.NEXT_PUBLIC_API_URL}/admin/photo/download`} className="ml-2 px-4 py-2 self-stretch rounded-md bg-blue-600 text-white focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 focus:outline-none focus:ring-offset-gray-300 flex-grow-0">
                            Download
                        </a>
                    </div>
                    <div className="flex flex-row">
                        <input
                            onChange={e => setPhotoQuery(e.target.value)}
                            value={photoQuery}
                            type="text"
                            className="border border-gray-300 h-12 w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:border-transparent focus:ring-indigo-500" 
                            placeholder="Bildgruppe" />
                    </div>
                    <div className="flex flex-col">
                        <div className="-my-2 overflow-x-auto">
                            <div className="py-2 align-middle inline-block min-w-full">
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
                                                    <span className="sr-only">Download</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {photos.map(p => (
                                                <tr key={p._id}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10">
                                                            <img className="h-10 w-10 rounded-sm" src={`${process.env.NEXT_PUBLIC_API_URL}/admin/photo/${p._id}`} alt="" />
                                                        </div>
                                                    </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">Samstag, 01.05.21</div>
                                                        <div className="text-sm text-gray-500">13:35</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                        {p.name}
                                                    </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        -
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium text-right">
                                                        <a href={`${process.env.NEXT_PUBLIC_API_URL}/admin/photo/${p._id}/download`} className="text-blue-600 hover:text-blue-700 hover:bg-blue-200 transition-colors duration-100 rounded-md px-3 py-2 text-right">
                                                            Download
                                                        </a>
                                                    </td>
                                                </tr>
                                            ))}
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

export default function SecurePhotoDashboard() {
    return (
        <Secure>
            <PhotoDashboard />
        </Secure>
    )
}