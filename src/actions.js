import { redirect } from "./utils"
import api from "./api/http"

export const signInAdmin = password => async (dispatch, getState, { api }) => {
    if(typeof window !== "undefined") {
        api.init()
        let { data: {ok, err}} = await api.signInAdmin(password)

        if(err) {
            dispatch({
                type: "SIGNIN_FAILED"
            })
        } else if(ok) {
            redirect("/")
        } else {
            console.warn("Sign in failed")
        }
    }
}

export const signOutAdmin = () => async (dispatch, getState, { api }) => {
    if(typeof window !== "undefined") {
        return redirect("/signin")
    }
}

export const authenticateAdmin = () => async (dispatch, getState, { api }) => {
    if(typeof window !== "undefined") {
        api.init()
        try {
            let { data: { admin, err }} = await api.getAdminInfo()
            if(!admin) {
                return redirect("/signin")
            }

            dispatch(setAdmin(admin))
        } catch {
            return redirect("/signin")
        }
    }
}




export const setAuthToken = bearer => ({
    type: "SET_AUTH_TOKEN",
    payload: {
        bearer
    }
})

export const setAdmin = (admin) => ({
    type: "SET_ADMIN",
    payload: admin
})

export const setPhotos = (photos) => ({
    type: "SET_PHOTOS",
    payload: photos
})

export const setUsers = (users) => ({
    type: "SET_USERS",
    payload: users
})

export const setForecastModels = (models) => ({
    type: "SET_FORECAST_MODELS",
    payload: models
})

export const setPhotoClassificationModels = (models) => ({
    type: "SET_PHOTO_CLASSIFICATION_MODELS",
    payload: models
})

export const setQuestionnaire = (questions) => ({
    type: "SET_QUESTIONNAIRE",
    payload: questions
})




export const loadPhotos = label => async (dispatch, getState, { api }) => { 
    if(typeof window !== "undefined") { 
        let { data: { photos }} = await api.getPhotos(label)
        dispatch(setPhotos(photos))
    }
}

export const loadUsers = () => async (dispatch, getState, { api }) => {
    if(typeof window !== "undefined") {
        let { data: { err, users } } = await api.getUsers()

        console.log("GET USERS ", users, err)
        if(users) {
            users = users.map(u => ({
                ...u,
                birthDate: new Date(u.birthDate)
            }))
            dispatch(setUsers(users))
        }
    }
}

export const loadForecastModels = () => async (dispatch, getState, { api }) => {
    if(typeof window !== "undefined") {
        let { data: { models }} = await api.getForecastModels()
        dispatch(setForecastModels(models))
    }
}

export const loadPhotoClassificationModels = () => async (dispatch, getState, { api }) => {
    if(typeof window !== "undefined") {
        let { data: { models }} = await api.getPhotoClassificationModels()
        dispatch(setPhotoClassificationModels(models))
    }
}

export const loadQuestionnaire = () => async (dispatch, getState, { api }) => {
    if(typeof window !== "undefined") {
        let { data: { questionnaire } } = await api.getQuestionnaire()
        dispatch(setQuestionnaire(questionnaire))
    }
}

export const loadRegistrations = () => async (dispatch, getState, { }) => {
    if(typeof window !== "undefined") {
        let { data: { registrations }} = await api.userRegistrationStats()

        registrations = registrations.map(r => ({
            ...r,
            date: new Date(r.date)
        }))
            .sort((a, b) => a.date.valueOf() - b.date.valueOf())

        dispatch({
            type: "SET_REGISTRATIONS",
            payload: {
                registrations
            }
        })
    }
}

export const loadStatistics = () => async (dispatch, getState, { api }) => {
    // if(typeof window !== "undefined") {
    //     let { data: { registrations }} = await api.userRegistrationStats()

    //     registrations = registrations.map(r => ({
    //         ...r,
    //         date: new Date(r.date)
    //     }))
    //         .sort((a, b) => a.date.valueOf() - b.date.valueOf())

    //     dispatch({
    //         type: "SET_REGISTRATIONS",
    //         payload: {
    //             registrations
    //         }
    //     })
    // }
}




export const activateForecastModel = id => async (dispatch, getState, { api }) => {
    let {ok, err} = await api.activateForecastModel(id)
    
    dispatch({
        type: "ACTIVATE_FORECAST_MODEL",
        payload: {
            id
        }
    })
}

export const deleteForecastModel = id => async (dispatch, getState, { api }) => {
    let {ok, err} = await api.deleteForecastModel(id)

    dispatch({
        type: "DELETE_FORECAST_MODEL",
        payload: {
            id
        }
    })
}

export const activatePhotoModel = id => async (dispatch, getState, { api }) => {
    let {ok, err} = await api.activatePhotoModel(id)
    
    dispatch({
        type: "ACTIVATE_PHOTO_CLASSIFICATION_MODEL",
        payload: {
            id
        }
    })
}

export const deletePhotoClassificationModel = id => async (dispatch, getState, { api}) => {
    let { ok, err } = await api.deletePhotoClassificationModel(id)

    dispatch({
        type: "DELETE_PHOTO_CLASSIFICATION_MODEL",
        payload: {
            id
        }
    })
}

export const addQuestion = (parent_id, q) => async (dispatch, getState, { api }) => {
    let {data: { question, questionnaire, err }} = await api.addQuestion(parent_id, q)

    // dispatch({
    //     type: "ADD_QUESTION",
    //     payload: {
    //         parent_id,
    //         question
    //     }
    // })
    dispatch(setQuestionnaire(questionnaire))
}

export const insertQuestion = (parent_id, q) => async (dispatch, getState, { api }) => {
    let { data: {questionnaire, err}} = await api.insertQuestion(parent_id, q)

    dispatch(setQuestionnaire(questionnaire))
}

export const deleteCondition = (question_id, next_id, condition_id) => async (dispatch, getState, { api }) => {
    let { data: { ok, question}} = await api.deleteQuestionCondition(question_id, next_id, condition_id)

    dispatch({
        type: "DELETE_QUESTION_CONDITION",
        payload: {
            question_id,
            question
        }
    })
}

export const updateQuestion = question => async (dispatch, getState, { api }) => {
    let { data: { ok, err }} = await api.updateQuestion(question._id, question)

    if(ok) {
        dispatch({
            type: "UPDATE_QUESTION",
            payload: {
                question
            }
        })
    }
}


export const deleteAllQuestions = () => async (dispatch, getState, { api }) => {
    await api.deleteQuestionnaire()

    dispatch({
        type: "DELETE_ALL_QUESTIONS",
        payload: {}
    })
}

export const deleteAllMicturition = () => async (dispatch, getState, { api }) => {
    await api.deleteAllMicturition()

    dispatch({
        type: "DELETE_ALL_MICTURITION",
        payload: {}
    })
}

export const deleteAllDrinking = () => async (dispatch, getState, { api }) => {
    await api.deleteAllDrinking()

    dispatch({
        type: "DELETE_ALL_DRINKING",
        payload: {}
    })
}

export const deleteAllNutrition = () => async (dispatch, getState, { api }) => {
    await api.deleteAllNutrition()

    dispatch({
        type: "DELETE_ALL_NUTRITION",
        payload: {}
    })
}

export const deleteUser = id => async (dispatch, getState, { api }) => {
    await api.deleteUser(id)

    dispatch({
        type: "DELETE_USER",
        payload: {
            _id: id
        }
    })
}

export const resetAll = () => async (dispatch, getState, { api }) => {
    await api.resetAll()

    redirect("/signin")
}

export const deleteQuestion = (parent_id, _id) => async (dispatch, getState, { api }) => {
    let { data: { ok, questionnaire, err }} = await api.deleteQuestion(parent_id, _id)

    
    if(ok) {
        dispatch(setQuestionnaire(questionnaire))
    }
}

export const addCondition = (question_id, next_id, condition) => async (dispatch, getState, { api }) => {
    let { data: {ok, question}} = await api.addCondition(question_id, next_id, condition)

    if(ok) {
        dispatch({
            type: "ADD_QUESTION_CONDITION",
            payload: {
                question_id,
                question
            }
        })
    }
}

export const addOption = (question_id, option) => async (dispatch, getState, { api }) => {
    let { data: {ok, err, question} } = await api.addOption(question_id, option)

    if(ok) {
        dispatch({
            type: "ADD_QUESTION_OPTION",
            payload: {
                question_id,
                question
            }
        })
    }
}

export const deleteOption = (question_id, id) => async (dispatch, getState, { api }) => {
    let { data: { ok, err }} = await api.deleteQuestionOption(question_id, id)
    
    if(ok) {
        dispatch({
            type: "DELETE_QUESTION_OPTION",
            payload: {
                question_id,
                option_id: id
            }
        })
    }
}

export const addPhotoClassificationModel = model => ({
    type: "ADD_PHOTO_CLASSIFICATION_MODEL",
    payload: {
        timestamp: model.timestamp,
        active: model.active,
        _id: model._id
    }
})

export const addForecastModel = model => ({
    type: "ADD_FORECAST_MODEL",
    payload: {
        timestamp: model.timestamp,
        active: model.active,
        _id: model._id
    }
})