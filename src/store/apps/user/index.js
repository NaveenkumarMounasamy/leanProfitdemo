import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import { endpointURL, endpoints } from 'src/store/endpoints/endpoints'
import instance from 'src/store/endpoints/interceptor'

// ** Fetch Users
export const fetchData = createAsyncThunk('appUsers/fetchData', async params => {
  const response = await instance.get(endpointURL(endpoints.allUsers))

  return response.data
})

// ** Add User
export const addUser = createAsyncThunk('appUsers/addUser', async (data, { getState, dispatch }) => {
  console.log(data)
  const response = await instance.post(endpointURL(endpoints.adduser), data)
  dispatch(fetchData(getState().user.params))

  return response.data
})

// ** Delete User
export const deleteUser = createAsyncThunk('appUsers/deleteUser', async (id, { getState, dispatch }) => {
  console.log(id)
  const response = await instance.delete(endpointURL(endpoints.Deleteuser(id)))
  dispatch(fetchData(getState().user.params))

  return response.data
})

export const appUsersSlice = createSlice({
  name: 'appUsers',
  initialState: {
    loggedInUser: {},
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {
    setLoggedInUser: (state, action) => {
      state.loggedInUser = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload
      
      // state.total = action.payload.total
      // state.params = action.payload.params
      state.allData = action.payload
    })
  }
})

export const { setLoggedInUser } = appUsersSlice.actions

export default appUsersSlice.reducer
