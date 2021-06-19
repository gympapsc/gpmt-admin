import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { 
    authenticateAdmin,
    loadForecastModels,
    loadPhotoModels,
    loadPhotos,
    loadUsers,
    loadQuestionnaire
} from "./actions"


export function useAdmin() {
    let dispatch = useDispatch()
    let admin = useSelector(state => state.admin)

    useEffect(() => {
        if(typeof window !== "undefined" && admin === null) {
            dispatch(authenticateAdmin())
        }
    })

    return admin
}

export function useForecastModels() {
    let dispatch = useDispatch()
    let forecastModels = useSelector(state => state.forecastModels)

    useEffect(() => {
        if(typeof window !== "undefined" && forecastModels === null) {
            dispatch(loadForecastModels())
        }
    })

    return forecastModels || []
}

export function usePhotoModels() {
    let dispatch = useDispatch()
    let photoModels = useSelector(state => state.photoModels)

    useEffect(() => {
        if(typeof window !== "undefined" && photoModels === null) {
            dispatch(loadPhotoModels())
        }
    })

    return photoModels || []
}

export function useUsers() {
    let dispatch = useDispatch()
    let users = useSelector(state => state.users)

    useEffect(() => {
        if(typeof window !== "undefined" && users === null) {
            dispatch(loadUsers())
        }
    })

    return users || []
}

export function usePhotos() {
    let dispatch = useDispatch()
    let photos = useSelector(state => state.photos)

    useEffect(() => {
        if(typeof window !== "undefined" && photos === null) {
            dispatch(loadPhotos())
        }
    })

    return photos || []
}

export function useQuestionnaire() {
    let dispatch = useDispatch()
    let questionnaire = useSelector(state => state.questionnaire)
    
    useEffect(() => {
        if(typeof window !== "undefined" && questionnaire === null) {
            dispatch(loadQuestionnaire())
        }
    })

    return questionnaire ||  {}
}