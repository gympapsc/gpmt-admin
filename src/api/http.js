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
    getPhotos: label => label ? client.get(`/admin/photo?label=${label}`) : client.get("/admin/photo"),
    getUsers: () => client.get("/admin/data/users"),
    getForecastModels: () => client.get("/admin/data/model"),
    getPhotoClassificationModels: () => client.get("/admin/photo/model"),
    getQuestionnaire: () => client.get("/admin/questionnaire"),
    getRegistrations: () => client.get("/admin/stats/user"),
    
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
    
    downloadData: () => client.get(""),
    downloadPhotos: () => client.get("/admin/photos/download"),
    
    addQuestion: (parent_id, question) => client.post(`/admin/questionnaire/${parent_id}`, { question }),
    addCondition: (_id, condition) => client.post(`/admin/questionnaire/${_id}/condition`, { condition }),
    addOption: (_id, option) => client.post(`/admin/questionnaire/${_id}/option`, { option } ),

    deleteQuestionCondition: (id, condition_id) => client.delete(`/admin/questionnaire/${id}/condition/${condition_id}`),
    deleteQuestion: _id => client.delete(`/admin/questionnaire/${_id}`),
    deleteQuestionOption: (id, option_id) => client.delete(`/admin/questionnaire/${id}/option/${option_id}`),

    updateQuestion: (_id, question) => client.put(`/admin/questionnaire/${_id}`, { question })
}

export default api