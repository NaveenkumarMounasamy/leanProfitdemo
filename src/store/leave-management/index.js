import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import { endpointURL, endpoints } from 'src/store/endpoints/endpoints'
import instance from 'src/store/endpoints/interceptor'

// ** Fetch Reports
export const fetchClients = createAsyncThunk('projects/fetchClients', async params => {
  const response = await instance.get(endpoints.getAllClient)

  return response.data
})

export const LeaveManagement = createSlice({
  name: 'leaveManagement',
  initialState: {
  },
  reducers: {

  },
  extraReducers: builder => {
    builder.addCase(fetchClients.fulfilled, (state, action) => {
      state.allClients = action.payload
    })
  }
})

export const {
} = LeaveManagement.actions

export default LeaveManagement.reducer
