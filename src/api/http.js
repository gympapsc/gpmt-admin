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
    deleteQuestion: _id => client.delete(`/admin/questionnaire/${_id}`),
    addCondition: (_id, condition) => client.post(`/admin/questionnaire/${_id}/condition`, { condition })
}

export default api