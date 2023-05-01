import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://gooseplanner.onrender.com/api';

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
            setAuthHeader(resp.data.user.token);

            // navigate('/calendar/month', { replace: true });
            alert('You are successfully registered ');
            return resp.data;
        } catch (e) {
            alert(e.message);
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
    async (_, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            setAuthHeader(auth.token);
            await axios.post('/user/logout');
            clearAuthHeader();
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);
export const currentUser = createAsyncThunk(
    'user/current',
    async (_, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            setAuthHeader(auth.token);
            const response = await axios.get('/user/current');
            console.log(response.data);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

export const updateUser = createAsyncThunk(
    'user/updUser',
    async (values, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            setAuthHeader(auth.token);

            const response = await axios.patch(`/user/info`, values);

            return response.data;
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

export const changePass = createAsyncThunk(
    'user/updPass',
    async (userPassData, thunkAPI) => {
        try {
            const resp = await axios.patch('/user/update-pass', userPassData);
            setAuthHeader(resp.data.user.token);
            alert('Password is successfully updated');
            console.log('pass resnonse resp.data', resp.data);
            return resp.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// ===============================================================
// TASKS
// ===============================================================

export const fetchTasks = createAsyncThunk(
    'tasks/fetchAll',
    async (getParams, thunkAPI) => {
        // console.log('getParams=>', getParams);
        try {
            const response = await axios.get('/tasks', { params: getParams });
            console.log('response=>>', response);
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

export const addTask = createAsyncThunk(
    'tasks/addTask',
    async (body, thunkAPI) => {
        console.log(body);
        try {
            const response = await axios.post('/tasks', body);
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

export const updateTask = createAsyncThunk(
    'tasks/updTask',
    async (task, thunkAPI) => {
        const { _id, owner, ...update } = task;

        try {
            const response = await axios.patch(`/tasks/${_id}`, update);
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

// import {
//     createAsyncThunk,
//     createSlice,
// } from '@reduxjs/toolkit';

// axios.defaults.baseURL = 'http://localhost:4000/api';

// const setAuthHeader = token => {
//     axios.defaults.headers.common.Authorization = `Bearer ${token}`;
// };

// const clearAuthHeader = () => {
//     axios.defaults.headers.common.Authorization = '';
// };

// // ===============================================================
// // AUTH
// // ===============================================================

// export const signUpUser = createAsyncThunk(
//     'auth/register',
//     async (userRegData, thunkAPI) => {
//         try {
//             const resp = await axios.post(`/auth/register`, userRegData);
//             setAuthHeader(resp.data.user.token);

//             // navigate('/calendar/month', { replace: true });
//             alert('You are successfully registered ');
//             return resp.data;
//         } catch (e) {
//             alert(e.message);
//             return thunkAPI.rejectWithValue(e.message);
//         }
//     }
// );

// export const loginUser = createAsyncThunk(
//     'auth/login',
//     async (userRegData, thunkAPI) => {
//         try {
//             const resp = await axios.post('/auth/login', userRegData);
//             setAuthHeader(resp.data.user.token);
//             console.log(resp);
//             return resp.data;
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error.message);
//         }
//     }
// );

// export const refreshUser = createAsyncThunk(
//     'auth/refresh',
//     async (_, thunkAPI) => {
//         const state = thunkAPI.getState().auth;

//         console.log(state.user.token);
//         if (!state.user.token) {
//             return thunkAPI.rejectWithValue('no valid message');
//         }
//         // clearAuthHeader();
//         setAuthHeader(state.user.token);
//         try {
//             const resp = await axios.get('/auth/login');
//             console.log(resp);
//             return resp.data;
//         } catch (e) {
//             return thunkAPI.rejectWithValue(e.message);
//         }
//     }
// );

// // ===============================================================
// // USER
// // ===============================================================

// export const logoutUser = createAsyncThunk(
//     'user/logout',
//     async (_, { getState, rejectWithValue }) => {
//         try {
//             const { auth } = getState();
//             setAuthHeader(auth.token);
//             await axios.post('/user/logout');
//             clearAuthHeader();
//         } catch (e) {
//             return rejectWithValue(e.message);
//         }
//     }
// );
// export const currentUser = createAsyncThunk(
//     'user/current',
//     async (_, { getState, rejectWithValue }) => {
//         try {
//             const { auth } = getState();
//             setAuthHeader(auth.token);
//             const response = await axios.get('/user/current');
//             console.log(response.data);
//             return response.data;
//         } catch (e) {
//             return rejectWithValue(e.message);
//         }
//     }
// );

// export const updateUser = createAsyncThunk(
//     'user/updUser',
//     async (values, { getState, rejectWithValue }) => {
//         try {
//             const { auth } = getState();
//             setAuthHeader(auth.token);

//             const response = await axios.patch(`/user/info`, values);

//             return response.data;
//         } catch (e) {
//             return rejectWithValue(e.message);
//         }
//     }
// );

// // ===============================================================
// // TASKS
// // ===============================================================

// export const fetchTasks = createAsyncThunk(
//     'tasks/fetchAll',
//     async (_, thunkAPI) => {
//         try {
//             const response = await axios.get('/tasks');
//             return response.data;
//         } catch (e) {
//             return thunkAPI.rejectWithValue(e.message);
//         }
//     }
// );

// export const addTask = createAsyncThunk(
//     'tasks/addTask',
//     async (text, thunkAPI) => {
//         try {
//             const response = await axios.post('/tasks', text);
//             return response.data;
//         } catch (e) {
//             return thunkAPI.rejectWithValue(e.message);
//         }
//     }
// );

// export const updateTask = createAsyncThunk(
//     'tasks/updTask',
//     async (taskId, thunkAPI) => {
//         try {
//             const response = await axios.patch(`/tasks/${taskId}`);
//             return response.data;
//         } catch (e) {
//             return thunkAPI.rejectWithValue(e.message);
//         }
//     }
// );

// export const delTask = createAsyncThunk(
//     'tasks/delTask',
//     async (taskId, thunkAPI) => {
//         try {
//             const response = await axios.delete(`/tasks/${taskId}`);
//             return response.data;
//         } catch (e) {
//             return thunkAPI.rejectWithValue(e.message);
//         }
//     }
// );
