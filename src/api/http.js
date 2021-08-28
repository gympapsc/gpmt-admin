import axios from "axios"

let client

const api = {
    init: () => {
        client = axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_URL,
            withCredentials: true
        })
    },
    signInAdmin: (password) => client.post("/signin/admin", { password }),
    
    getAdminInfo: () => client.get("/admin"),
    //getPhotos: label => label ? client.get(`/admin/photo?label=${label}`) : client.get("/admin/photo"),
    getPhotos: label => client.get("/admin/photo"),

    getUsers: () => client.get("/admin/data/users"),
    getForecastModels: () => client.get("/admin/data/model"),
    getPhotoClassificationModels: () => client.get("/admin/photo/model"),
    getQuestionnaire: () => client.get("/admin/questionnaire"),
    
    activateForecastModel: id => client.post(`/admin/data/model/${id}/activate`),
    activatePhotoModel: id => client.post(`/admin/photo/model/${id}/activate`),
    
    deletePhotoClassificationModel: id => client.delete(`/admin/photo/model/${id}`),
    deleteForecastModel: id => client.delete(`/admin/data/model/${id}`),
    
    uploadForecastModel: formData => client.post("/admin/data/model", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }),
    uploadPhotoClassificationModel: formData => client.post("/admin/photo/model", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }),
    
    downloadData: () => client.get("/admin/data/export/csv"),
    downloadPhotos: () => client.get("/admin/photos/download"),
    
    addQuestion: (parent_id, question) => client.post(`/admin/questionnaire/${parent_id}`, { question }),
    insertQuestion: (child_id, question) => client.post(`/admin/questionnaire/${child_id}?insert=1`, { question }),
    addCondition: (_id, next_id, condition) => client.post(`/admin/questionnaire/${_id}/${next_id}/condition`, { condition }),
    addOption: (_id, option) => client.post(`/admin/questionnaire/${_id}/option`, { option } ),

    deleteQuestionCondition: (id, next_id, condition_id) => client.delete(`/admin/questionnaire/${id}/${next_id}/condition/${condition_id}`),
    deleteQuestion: (parent_id, _id) => client.delete(`/admin/questionnaire/${parent_id}/${_id}`),
    deleteQuestionOption: (id, option_id) => client.delete(`/admin/questionnaire/${id}/option/${option_id}`),
    deleteAllQuestionnaire: () => client.delete("/admin/questionnaire"),
    deleteAllMicturition: () => client.delete("/admin/data/micturition"),
    deleteAllDrinking: () => client.delete("/admin/data/drinking"),
    deleteAllNutrition: () => client.delete("/admin/data/nutrition"),
    deleteAllStress: () => client.delete("/admin/data/stress"),
    deleteAllMedication: () => client.delete("/admin/data/medication"),
    deleteUser: (_id) => client.delete(`/admin/data/user/${_id}`),

    resetAll: () => client.delete(`/admin/data`),

    updateQuestion: (_id, question) => client.put(`/admin/questionnaire/${_id}`, { question }),

    genderStats: () => client.get("/admin/statistics/gender"),
    bmiStats: () => client.get("/admin/statistics/bmi"),
    ageStats: () => client.get("/admin/statistics/age"),
    micutritionStats: () => client.get("/admin/statistics/micturition"), 
    nutritionStats: () => client.get("/admin/statistics/nutrition"),
    drinkingStats: () => client.get("/admin/statistics/drinking"),
    photoUploadStats: () => client.get("/admin/statistics/photos"),
    userRegistrationStats: () => client.get("/admin/statistics/registrations"),
    msStats: () => client.get("/admin/statistics/ms"),
    incontinenceStats: () => client.get("/admin/statistics/incontinence")
}

export default api