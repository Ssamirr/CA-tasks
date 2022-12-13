const BASE_URL = 'https://northwind.vercel.app/api';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 1000
});

const network = {
    getSupplier: async (url) => {

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

    getCustomer: async (url) => {

        let response = {};

        await axiosInstance.get(`${url}`)
            .then(res => {
                response = res.data;
            });

        return response;

    },

    deleteCustomer: async (url, id) => {

        let response = {};

        await axiosInstance.delete(`${url}/${id}`)
            .then(res => {
                response = res.data;
            });

        return response;

    },
    getOrders: async (url) => {

        let response = {};

        await axiosInstance.get(`${url}`)
            .then(res => {
                response = res.data;
            });

        return response;

    },
    getProducts: async (url) => {

        let response = {};

        await axiosInstance.get(`${url}`)
            .then(res => {
                response = res.data;
            });

        return response;

    },
}