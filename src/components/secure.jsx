import React from "react"
import { useDispatch, useSelector } from "react-redux"
import {
    authenticateAdmin, signInAdmin
} from "../actions"
import { useAdmin } from "../hooks"

const Secure = ({children}) => {
    let admin = useAdmin()

    return (
        <>
            {admin ? children: 'Loading ...'}
        </>
    )
}

export default Secure