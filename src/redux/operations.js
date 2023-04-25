import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'http://localhost:5000/api';

const setAuthHeader = token => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
    axios.defaults.headers.common.Authorization = '';
};

// ===============================================================
// AUTH
// ===============================================================

export const signUpUser = createAsyncThunk(
    'auth/register',
    async (userRegData, thunkAPI) => {
        try {
            const resp = await axios.post(`/auth/register`, userRegData);
            // setAuthHeader(resp.data.user.token);
            return resp.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

export const loginUser = createAsyncThunk(
    'auth/login',
    async (userRegData, thunkAPI) => {
        try {
            const resp = await axios.post('/auth/login', userRegData);
            setAuthHeader(resp.data.user.token);
            console.log(resp);
            return resp.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const refreshUser = createAsyncThunk(
    'auth/refresh',
    async (_, thunkAPI) => {
        const state = thunkAPI.getState().auth;

        console.log(state.user.token);
        if (!state.user.token) {
            return thunkAPI.rejectWithValue('no valid message');
        }
        // clearAuthHeader();
        setAuthHeader(state.user.token);
        try {
            const resp = await axios.get('/auth/login');
            console.log(resp);
            return resp.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

// ===============================================================
// USER
// ===============================================================

export const logoutUser = createAsyncThunk(
    'user/logout',
    async (_, thunkAPI) => {
        try {
            await axios.post('/auth/logout');
            clearAuthHeader();
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);
export const currentUser = createAsyncThunk(
    'user/current',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get('/auth/current');
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

export const updateUser = createAsyncThunk(
    'user/updUser',
    async (userId, thunkAPI) => {
        try {
            const response = await axios.patch(`/info/${userId}`);
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);
// ===============================================================
// TASKS
// ===============================================================

export const fetchTasks = createAsyncThunk(
    'tasks/fetchAll',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get('/tasks');
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

export const addTask = createAsyncThunk(
    'tasks/addTask',
    async (text, thunkAPI) => {
        try {
            const response = await axios.post('/tasks', text);
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

export const updateTask = createAsyncThunk(
    'tasks/updTask',
    async (taskId, thunkAPI) => {
        try {
            const response = await axios.patch(`/tasks/${taskId}`);
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

export const delTask = createAsyncThunk(
    'tasks/delTask',
    async (taskId, thunkAPI) => {
        try {
            const response = await axios.delete(`/tasks/${taskId}`);
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);
