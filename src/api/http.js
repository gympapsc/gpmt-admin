import axios from "axios"

const api = {
    init: (authToken) => {
        client = axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_URL,
            headers: {
                "Authorization": authToken ? `Bearer ${authToken}` : ""
            }
        })
    }
}

export default api