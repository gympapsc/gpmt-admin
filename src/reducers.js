const initialState = {
    admin: null,
    photos: null,
    users: null,
    forecastModels: null,
    photoClassificationModels: null,
    questionnaire: null
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case "SET_AUTH_TOKEN":
            return {
                ...state,
                bearer: action.payload.bearer
            }
        case "SET_ADMIN":
            return {
                ...state,
                admin: action.payload
            }
        case "SET_PHOTOS":
            return {
                ...state,
                photos: action.payload,
            }
        case "SET_USERS":
            return {
                ...state,
                users: action.payload
            }
        case "SET_FORECAST_MODELS":
            return {
                ...state,
                forecastModels: action.payload
            }
        case "SET_QUESTIONNAIRE":
            return {
                ...state,
                questionnaire: action.payload
            }
        case "SET_PHOTO_CLASSIFICATION_MODELS":
            return {
                ...state,
                photoClassificationModels: action.payload
            }
        case "ADD_PHOTO_CLASSIFICATION_MODEL":
            return {
                ...state,
                photoClassificationModels: [
                    ...state.photoClassificationModels,
                    action.payload
                ]
            }
        case "DELETE_PHOTO_CLASSIFICATION_MODEL":
            return {
                ...state,
                photoClassificationModels: state.photoClassificationModels.filter(m => m._id !== action.payload.id)
            }
        case "DELETE_FORECAST_MODEL":
            return {
                ...state,
                forecastModels: state.forecastModels.filter(m => m._id !== action.payload.id)
            }
        case "ACTIVATE_FORECAST_MODEL":
            return {
                ...state,
                forecastModels: [
                    ...state.forecastModels
                        .filter(m => m._id !== action.payload.id)
                        .map(m => ({
                                ...m,
                                active: false
                            })
                        ),
                    {
                        ...state.forecastModels.find(m => m._id === action.payload.id),
                        active: true
                    }
                ]
            }
        case "ACTIVATE_PHOTO_CLASSIFICATION_MODEL":
            return {
                ...state,
                photoClassificationModels: [
                    ...state.photoClassificationModels
                        .filter(m => m._id !== action.payload.id)
                        .map(m => ({
                                ...m,
                                active: false
                            })
                        ),
                    {
                        ...state.photoClassificationModels.find(m => m._id === action.payload.id),
                        active: true
                    }
                ]
            }
        default:
            return state
    }
}

export default reducer