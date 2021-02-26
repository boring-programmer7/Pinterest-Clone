import axios from "axios"

export default axios.create({
    baseUrl: "https://api.unsplash.com/",
    headers: {
        Authorization: "Client-ID CYdxfkE-h8MOUElTy3J_6mrOv4h_edqV6BwcER40ZNE"
    }
})