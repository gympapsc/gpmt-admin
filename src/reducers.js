const initialState = {
    admin: null,
    photos: null,
    users: null,
    forecastModels: null,
    photoModels: null,
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
        case "SET_PHOTS_MODELS":
            return {
                ...state,
                photoModels: action.payload
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
        case "ACTIVATE_PHOTO_MODEL":
            return {
                ...state,
                photoModel: [
                    ...state.photoModel
                        .filter(m => m._id !== action.payload.id)
                        .map(m => ({
                                ...m,
                                active: false
                            })
                        ),
                    {
                        ...state.photoModel.find(m => m._id === action.payload.id),
                        active: true
                    }
                ]
            }
        default:
            return state
    }
}

export default reducer