const BASE_URL = 'https://northwind.vercel.app/api';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 1000
});

const network = {
    get: async (url) => {

        let response = {};

        await axiosInstance.get(`${url}`)
            .then(res => {
                response = res.data;
            });

        return response;

    },

    add: async (url, data) => {

        let response = {};

        await axiosInstance.post(`${url}`, data)
            .then(res => {
                response = res.data;
            });

        return response;

    },

    delete: async (url, id) => {

        let response = {};

        await axiosInstance.delete(`${url}/${id}`)
            .then(res => {
                response = res.data;
            });

        return response;

    },
}