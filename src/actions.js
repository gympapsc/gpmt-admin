import { redirect } from "./utils"

export const signInAdmin = password => async (dispatch, getState, { api }) => {
    if(typeof window !== "undefined") {
        api.init()
        let { data: {ok, err}} = await api.signInAdmin(password)

        if(err) {
            dispatch({
                type: "SIGNIN_FAILED"
            })
        } else if(ok) {
            debugger
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




export const loadPhotos = () => async (dispatch, getState, { api }) => { 
    if(typeof window !== "undefined") {
        let { data: { photos }} = await api.getPhotos()
        dispatch(setPhotos(photos))
    }
}

export const loadUsers = () => async (dispatch, getState, { api }) => {
    if(typeof window !== "undefined") {
        let { data: { err, users } } = await api.getUsers()
        console.log("GET USERS ", users, err)
        dispatch(setUsers(users))
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
        let { data: { questionnaire }} = await api.getQuestionnaire()
        dispatch(setQuestionnaire(ravelTree(questionnaire)))
    }
}

const ravelTree = questions => {
    let root = questions.filter(q => q.root)[0]
    function ravelBranch(root) {
        if(root) {
            console.log(root)
            for(let i = 0; i < root.next.length; i++) {
                if(!root.next[i].name) {
                    next = questions.filter(q => q._id === root.next[i])[0]
                    if(!next) {
                        continue
                    }
                    root.next[i] = next
                }
                if(root.next[i]) {
                    root.next[i] = ravelBranch(root.next[i])
                }
            }
            return root
        }
        throw new Error("No root")
    }

    return ravelBranch(root)
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
    let {data: { question, err }} = await api.addQuestion(parent_id, q)

    dispatch({
        type: "ADD_QUESTION",
        payload: {
            parent_id,
            question
        }
    })
}

export const deleteQuestion = _id => async (dispatch, getState, { api }) => {
    let { data: { ok, err}} = await api.deleteQuestion(_id)

    if(ok) {
        dispatch({
            type: "DELETE_QUESTION",
            payload: {
                _id
            }
        })
    }
}



export const addCondition = (question_id, condition) => async (dispatch, getState, { api }) => {
    let { data: {ok, err}} = await api.addCondition(question_id, condition)

    if(ok) {
        dispatch({
            type: "ADD_CONDITION",
            payload: {
                question_id,
                condition
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