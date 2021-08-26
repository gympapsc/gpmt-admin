import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import api from "./api/http"
import { 
    authenticateAdmin,
    loadForecastModels,
    loadPhotoClassificationModels,
    loadPhotos,
    loadUsers,
    loadQuestionnaire,
    loadRegistrations,
    loadStatistics
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

export function useClassificationModels() {
    let dispatch = useDispatch()
    let models = useSelector(state => state.photoClassificationModels)

    useEffect(() => {
        if(typeof window !== "undefined" && models === null) {
            dispatch(loadPhotoClassificationModels())
        }
    })

    return models || []
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

export function usePhotos(label) {
    let dispatch = useDispatch()
    let [prev, setPrev] = useState(null)
    let photos = useSelector(state => state.photos)


    useEffect(() => {
        if(typeof window !== "undefined" && (photos === null || label !== prev)) {
            dispatch(loadPhotos(label))
            setPrev(label)
        }
    })

    return photos || []
}

export function useUserStats() {
    let registrations = useSelector(s => s.registrations)
    let dispatch = useDispatch()

    useEffect(() => {
        if(typeof window !== "undefined" && (registrations === null)) {
            dispatch(loadStatistics())
        }
    })

    return {
        registrations: registrations || []
    }
}

export function useQuestionnaire() {
    let dispatch = useDispatch()
    let questionnaire = useSelector(state => state.questionnaire)
    
    useEffect(() => {
        if(typeof window !== "undefined" && questionnaire === null) {
            dispatch(loadQuestionnaire())
        }
    })

    return questionnaire ||  []
}

export function useRegistrations() {
    let [stats, setStats] = useState(null)
    useEffect(async () => {
        if(typeof window !== "undefined" && stats === null) {
            let { data: { stats: registrations } } = await api.userRegistrationStats()
            registrations = registrations
                .map(r => ({
                    ...r,
                    date: new Date(r.date)
                }))
                .sort((a, b) => a.date.valueOf() - b.date.valueOf())
            setStats(registrations)
        }
    })
    return stats
}

export function useMicturitionEntryStats() {
    let [stats, setStats] = useState(null)
    useEffect(async () => {
        if(typeof window !== "undefined" && stats === null) {
            let { data: { stats: creations } } = await api.micutritionStats()
            creations = creations
                .map(r => ({
                    ...r,
                    date: new Date(r.date)
                }))
                .sort((a, b) => a.date.valueOf() - b.date.valueOf())
            setStats(creations)
        }
    })
    return stats
}

export function useDrinkingEntryStats() {
    let [stats, setStats] = useState(null)
    useEffect(async () => {
        if(typeof window !== "undefined" && stats === null) {
            let { data: { stats: creations } } = await api.drinkingStats()
            creations = creations
                .map(r => ({
                    ...r,
                    date: new Date(r.date)
                }))
                .sort((a, b) => a.date.valueOf() - b.date.valueOf())
            setStats(creations)
        }
    })
    return stats
}

export function useNutritionEntryStats() {
    let [stats, setStats] = useState(null)
    useEffect(async () => {
        if(typeof window !== "undefined" && stats === null) {
            let { data: { stats: creations } } = await api.nutritionStats()
            creations = creations
                .map(r => ({
                    ...r,
                    date: new Date(r.date)
                }))
                .sort((a, b) => a.date.valueOf() - b.date.valueOf())
            setStats(creations)
        }
    })
    return stats
}


export function useGenderStats() {
    let [stats, setStats] = useState(null)
    useEffect(async () => {
        if(typeof window !== "undefined" && stats === null) {
            let { data: { stats: sex } } = await api.genderStats()
            setStats(sex)
        }
    })
    return stats
}

export function useMSStats() {
    let [stats, setStats] = useState(null)
    useEffect(async () => {
        if(typeof window !== "undefined" && stats === null) {
            let { data: { stats: ms } } = await api.msStats()
            setStats(ms)
        }
    })
    return stats
}

export function useBMIStats() {
    let [stats, setStats] = useState(null)
    useEffect(async () => {
        if(typeof window !== "undefined" && stats === null) {
            let { data: { bmi }} = await api.bmiStats()
            setStats(bmi)
        }
    })
    return stats
}

export function useAgeStats() {
    let [stats, setStats] = useState(null)
    useEffect(async () => {
        if(typeof window !== "undefined" && stats === null) {
            let { data: { stats: ages }} = await api.ageStats()
            setStats(ages)
        }
    })
    return stats
}

export function usePhotoStats() {
    let [stats, setStats] = useState(null)
    useEffect(async () => {
        if(typeof window !== "undefined" && stats === null) {
            let { data: { stats: uploads }} = await api.photoUploadStats()
            uploads = uploads
                .map(r => ({
                    ...r,
                    date: new Date(r.date)
                }))
                .sort((a, b) => a.date.valueOf() - b.date.valueOf())
            setStats(uploads)
        }
    })
    return stats
}