const initialState = {
    admin: null,
    photos: null,
    users: null,
    forecastModels: null,
    photoClassificationModels: null,
    questionnaire: null,
    registrations: null
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
        case "SET_REGISTRATIONS":
            return {
                ...state,
                registrations: action.payload.registrations
            }
        case "ADD_QUESTION":
            return {
                ...state,
                questionnaire: [
                    ...state.questionnaire.filter(q => q._id !== action.payload.parent_id),
                    action.payload.question,
                    {
                        ...state.questionnaire.find(q => q._id === action.payload.parent_id),
                        next: [
                            ...state.questionnaire.find(q => q._id === action.payload.parent_id).next,
                            action.payload.question._id
                        ]
                    }
                ]
            }
        case "APPEND_QUESTION":
            return {
                ...state,
                questionnaire: [
                    ...state.questionnaire.filter(q => q._id !== action.payload.parent_id),
                    {
                        ...state.questionnaire.find(q => q._id === action.payload.parent_id),
                        next: [
                            ...state.questionnaire.find(q => q._id === action.payload.parent_id).next,
                            action.payload.next_id
                        ]
                    }
                ]
            }
        // case "INSERT_QUESTION":
        //     return {
        //         ...state,
        //         questionnaire: [
        //             ...state.questionnaire
        //                 .filter(q => q._id !== action.payload.parent_id)
        //                 .filter(q => q.next.contains(parent_id)),
        //             {
        //                 ...state.questionnaire.find(q => q._id === action.payload.parent_id),
        //                 next: [
        //                     action.payload.question._id
        //                 ]
        //             },
        //             {
        //                 ...action.payload.question,
        //                 next: [
        //                     ...state.questionnaire.find(q => q._id === action.payload.parent_id).next,
        //                 ]
        //             }
        //         ]
        //     }
        case "DELETE_QUESTION":
            return {
                ...state,
                questionnaire: [
                    ...state.questionnaire.filter(q => !(q._id === action.payload._id || q._id === action.payload.parent_id)),
                    {
                        ...state.questionnaire.find(q => q._id === action.payload.parent_id),
                        next: state.questionnaire
                            .find(q => q._id === action.payload.parent_id).next
                            .filter(r => r._id !== action.payload._id)
                    }
                ]
            }
        case "UPDATE_QUESTION":
            return {
                ...state,
                questionnaire: [
                    ...state.questionnaire.filter(q => q._id !== action.payload.question._id),
                    action.payload.question
                ]
            }
        case "ADD_QUESTION_CONDITION":
            return {
                ...state,
                questionnaire: [
                    ...state.questionnaire.filter(q => q._id !== action.payload.question_id),
                    action.payload.question
                ]
            }
        case "DELETE_QUESTION_CONDITION":
            return {
                ...state,
                questionnaire: [
                    ...state.questionnaire.filter(q => q._id !== action.payload.question_id),
                    {
                        ...state.questionnaire.find(q => q._id === action.payload.question_id),
                        condition: state.questionnaire
                            .find(q => q._id === action.payload.question_id).condition
                                .filter(c => c._id !== action.payload.condition_id)
                    }
                ]
            }
        case "ADD_QUESTION_OPTION":
            return {
                ...state,
                questionnaire: [
                    ...state.questionnaire.filter(q => q._id !== action.payload.question_id),
                    action.payload.question
                ]
            }
        case "DELETE_QUESTION_OPTION":
            return {
                ...state,
                questionnaire: [
                    ...state.questionnaire.filter(q => q._id !== action.payload.question_id),
                    {
                        ...state.questionnaire.find(q => q._id === action.payload.question_id),
                        options: state.questionnaire
                            .find(q => q._id === action.payload.question_id).options
                                .filter(c => c._id !== action.payload.option_id)
                    }
                ]
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
        case "ADD_FORECAST_MODEL":
            return {
                ...state,
                forecastModels: [
                    ...state.forecastModels,
                    action.payload
                ]
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