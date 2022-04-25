import axios from "axios"

const axiosClientBaseUrl = `${import.meta.env.VITE_BACKEND_URL}/api`

const axiosClient = axios.create({
  baseURL: axiosClientBaseUrl,
})


const axiosClientRequestAuthConfig = (token) => {
    return {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      }    
}

export { axiosClient, axiosClientBaseUrl, axiosClientRequestAuthConfig }
