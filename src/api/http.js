import axios from "axios"
import FileDownload from "js-file-download"

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
    getPhotos: () => client.get("/admin/photos"),
    getUsers: () => client.get("/admin/data/users"),
    getForecastModels: () => client.get("/admin/data/model"),
    getPhotoModels: () => client.get("/admin/photo/model"),
    getQuestionnaire: () => client.get("/admin/questionnaire"),
    activateForecastModel: () => client.post("/admin/data/model/activate?"),
    activatePhotoModel: () => client.post("/admin/photo/model/activate?"),
    uploadForecastModel: formData => client.post("/admin/data/model", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }),
    uploadPhotoModel: formData => client.post("/admin/photo/model", formData, {
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