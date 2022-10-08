import { createSlice, PayloadAction } from '@reduxjs/toolkit'

/**
 * State used to set overlay loading in logic treatment
 */

interface LoadingState {
  loading: boolean // status of first loading data
}
// Define the initial state using that type
const initialState: LoadingState = {
  loading: false
} 

export const loadingSlice = createSlice({
  name: 'loading',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setLoadingTreatment: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
  }
})

// export actions that can be use on dispatch store
export const { setLoadingTreatment } = loadingSlice.actions

export default loadingSlice.reducer
