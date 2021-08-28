import React from "react"

import Shell from "../components/shell"
import Secure from "../components/secure"

const Settings = () => {
    return (
        <Secure>
            <Shell>
                <div className="p-4 w-full">
                <h4 className="text-lg font-semibold text-gray-800 tracking-wide mb-4">Einstellungen</h4>
                    <div className="border border-red-400 bg-red-50 rounded-lg px-4 py-3">
                        <h4 className="text-sm mb-2 uppercase font-semibold text-gray-700">Daten löschen</h4> 
                    </div>
                </div>
            </Shell>
        </Secure>
    )
}

export default Settings