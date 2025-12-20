import axios from 'axios';


const baseURL = import.meta.env?.VITE_BASE_URL ;
// Compute API origin (without trailing /api) for static assets like /uploads
let API_ORIGIN = ''
try {
    const u = new URL(baseURL, window.location.origin)
    API_ORIGIN = (u.origin + u.pathname).replace(/\/?api\/?$/, '') || u.origin
} catch {
    API_ORIGIN = ''
}

export { baseURL as API_BASE_URL, API_ORIGIN }

export const api = axios.create({ baseURL });
api.interceptors.request.use((config) => {
    try {
        const token = localStorage.getItem('authToken');
        if (token) config.headers.Authorization = `Bearer ${token}`;
    } catch {}
    return config;
});

export const signup = async (userData) => {
    const { data } = await api.post('/auth/signup', userData);
    console.log("Signup response data:", data);
    return data;
};

export const login = async (credentials) => {
    const { data } = await api.post('/auth/login', credentials);
    console.log("Login response data:", data);
    return data;
};

// Admin: get all users
export const getAllUsers = async () => {
    const { data } = await api.get('/auth/getAll/users');
    return data;
}

// Admin: update user by id
export const updateUserById = async (id, updates) => {
    const { data } = await api.put(`/auth/updatebyid/users/${id}`, updates);
    return data;
}

// Admin: delete user by id
export const deleteUserById = async (id) => {
    const { data } = await api.delete(`/auth/deletebyid/users/${id}`);
    return data; // { message, deletedUser }
}

// Cars API
export const getAllCars = async () => {
    const { data } = await api.get('/cars/getall/cars');
    return data; // { cars }
}

export const addCarApi = async (formData) => {
    const { data } = await api.post('/cars/add/car', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return data; // { message, car }
}

export const updateCarById = async (id, updates) => {
    const { data } = await api.put(`/cars/updatebyid/car/${id}`, updates);
    return data; // { message, car }
}

export const deleteCarById = async (id) => {
    const { data } = await api.delete(`/cars/deletebyid/car/${id}`);
    return data; // { message, car }
}

// Bookings API
export const addBookingApi = async (payload) => {
    // backend mounted at /api/bookings
    const { data } = await api.post('/bookings/add', payload);
    return data; // booking document
}

export const cancelBookingApi = async (id) => {
    // update status to cancelled
    const { data } = await api.put(`/bookings/updateById/${id}`, { status: 'cancelled' });
    return data; // updated booking
}

export const getAllBookingsApi = async () => {
    const { data } = await api.get('/bookings/getall');
    return data; // array of bookings
}

export const getMyBookingsApi = async () => {
    const { data } = await api.get('/bookings/mine');
    return data; // array of bookings for current user
}

// Driver: get bookings assigned to the authenticated driver
export const getAssignedBookingsApi = async () => {
    const { data } = await api.get('/bookings/assigned/me');
    return data; // array of bookings assigned to driver
}

export const updateBookingByIdApi = async (id, updates) => {
    const { data } = await api.put(`/bookings/updateById/${id}`, updates);
    return data; // updated booking document
}

// Driver: reject assigned booking
export const driverRejectBookingApi = async (id) => {
    const { data } = await api.put(`/bookings/reject/${id}`);
    return data; // updated booking document (pending, driver released)
}

export const deleteBookingByIdApi = async (id) => {
    const { data } = await api.delete(`/bookings/deleteById/${id}`);
    return data; // { message }
}

// Users API helpers
export const getUserById = async (id) => {
    const { data } = await api.get(`/auth/getbyid/users/${id}`);
    return data; // { user }
}

