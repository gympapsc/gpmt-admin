import React from "react"

import Shell from "../components/shell"
import Secure from "../components/secure"
import { deleteAllDrinking, deleteAllMicturition, deleteAllNutrition, deleteAllQuestions, resetAll} from "../actions"
import { useDispatch } from "react-redux"

const Settings = () => {
    let dispatch = useDispatch()

    return (
        <Secure>
            <Shell>
                <div className="p-4 w-full">
                <h4 className="text-lg font-semibold text-gray-800 tracking-wide mb-4">Einstellungen</h4>
                    <div className="border border-red-300 bg-white rounded-lg px-4 py-3">
                        <h4 className="text-xs font-regular mb-2 uppercase text-gray-700 tracking-wide">Daten löschen</h4>
                        <div className="flex flex-row justify-between items-center p-2">
                            <div>
                                <h3 className="font-semibold mb-1">Alle Nutzerdaten löschen</h3>
                                <p className="text-gray-500 text-sm">Unwiderruflich alle Nutzer löschen. Es werden keine Nutzereinträge gelöscht.</p>
                            </div>
                            <button className="px-3 py-2 border border-red-700 bg-red-600 font-semibold text-white rounded-md text-sm" onClick={() => dispatch(deleteUserData())}>
                                Nutzerdaten löschen
                            </button>
                        </div>
                        <hr />
                        <div className="flex flex-row justify-between items-center p-2">
                            <div>
                                <h3 className="font-semibold mb-1">Alle Miktionsdaten löschen</h3>
                                <p className="text-gray-500 text-sm">Unwiderruflich alle Miktionseinträge löschen. Es werden keine Nutzer gelöscht.</p>
                            </div>
                            <button className="px-3 py-2 border border-red-700 bg-red-600 font-semibold text-white rounded-md text-sm" onClick={() => dispatch(deleteAllMicturition())}>
                                Miktionsdaten löschen
                            </button>
                        </div>
                        <hr />
                        <div className="flex flex-row justify-between items-center p-2">
                            <div>
                                <h3 className="font-semibold mb-1">Alle Trinkdaten löschen</h3>
                                <p className="text-gray-500 text-sm">Löscht unwiderruflich alle Trinkeinträge. Es werden keine Nutzer gelöscht.</p>
                            </div>
                            <button className="px-3 py-2 border border-red-700 bg-red-600 font-semibold text-white rounded-md text-sm" onClick={() => dispatch(deleteAllDrinking())}>
                                Trinkdaten löschen
                            </button>
                        </div>
                        <hr />
                        <div className="flex flex-row justify-between items-center p-2">
                            <div>
                                <h3 className="font-semibold mb-1">Alle Essdaten löschen</h3>
                                <p className="text-gray-500 text-sm">Unwiderruflich alle Essdaten löschen. Es werden keine Nutzer gelöscht.</p>
                            </div>
                            <button className="px-3 py-2 border border-red-700 bg-red-600 font-semibold text-white rounded-md text-sm" onClick={() => dispatch(deleteAllNutrition())}>
                                Essdaten löschen
                            </button>
                        </div>
                        <hr />
                        <div className="flex flex-row justify-between items-center p-2">
                            <div>
                                <h3 className="font-semibold mb-1">Alle Fragen löschen</h3>
                                <p className="text-gray-500 text-sm">Unwiderruflich den gesamten Fragebogen löschen. Es werden weder Nutzer noch Nutzereinträge gelöscht.</p>
                            </div>
                            <button className="px-3 py-2 border border-red-700 bg-red-600 font-semibold text-white rounded-md text-sm" onClick={() => dispatch(deleteAllQuestions())}>
                                Fragebogen löschen
                            </button>
                        </div>
                        <hr />
                        <div className="flex flex-row justify-between items-center p-2">
                            <div>
                                <h3 className="font-semibold mb-1">Alle Daten löschen </h3>
                                <p className="text-gray-500 text-sm">Löscht alle Daten unwiderruflich</p>
                            </div>
                            <button className="px-3 py-2 border border-red-700 bg-red-600 font-semibold text-white rounded-md text-sm" onClick={() => dispatch(resetAll())}>
                                Daten und Einstellungen zurücksetzen 
                            </button>
                        </div>
                    </div>
                </div>
            </Shell>
        </Secure>
    )
}

export default Settings