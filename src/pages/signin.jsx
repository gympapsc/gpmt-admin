import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import { signInAdmin } from "../actions"

const Signin = () => {
    const { register, handleSubmit, watch, formState: { errors, isValid, isDirty}} = useForm()
    let dispatch = useDispatch()

    const submit = data => {
        dispatch(signInAdmin(data.password))
    }

    return (
        <div className="absolute bg-gray-100 top-0 bottom-0 left-0 right-0 flex flex-col justify-center">
            <div className="px-3 w-full md:w-5/6 lg:w-3/4 xl:w-2/3 mx-auto">
                <h1 className="text-2xl md:text-3xl font-bold text-center mx-auto mb-10">GPMT Dashboard</h1>
                <form className="mt-3 space-y-7 max-w-md w-full mx-auto" onSubmit={handleSubmit(submit)}>
                    <div className="w-full space-y-1">
                        <input
                            className="border border-gray-300 w-full block bg-white text-black rounded-lg p-2 focus:ring-2 focus:border-transparent focus:ring-offset-1 focus:ring-blue-600 focus:outline-none"
                            type="password"
                            placeholder="Password"
                            {...register("password", { 
                                required: "Passwort is erforderlich"
                            })}
                            />
                        <span className="text-sm text-red-600">{errors.password?.message}&nbsp;</span>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-lg w-full focus:ring-2 focus:ring-offset-1 focus:ring-blue-600 focus:outline-none">
                        Anmelden
                    </button> 
                </form>
            </div>
        </div>
    )
}

export default Signin