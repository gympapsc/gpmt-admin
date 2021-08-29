import React from "react"

import { useAdmin } from "../hooks"
import { ActivityIndicator } from "./progressIndicator"

const Secure = ({children}) => {
    let admin = useAdmin()

    return (
        <>
            {
                admin ?
                children :
                <div className="absolute top-0 bottom-0 w-full flex flex-row justify-around items-center">
                    <div className="">
                        <ActivityIndicator />
                    </div>
                </div>
            }
        </>
    )
}

export default Secure