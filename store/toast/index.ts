import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import TOAST from '~constantes/toast'

/**
 * State used to set overlay loading in logic treatment
 */

interface ToastState {
  message: string,
  show: boolean,
  type: string
}
// Define the initial state using that type
const initialState: ToastState = {
  message: '',
  show: false,
  type: TOAST.success,
} 

export const toastSlice = createSlice({
  name: 'toast',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setToast: (state, action: PayloadAction<any>) => {
      if(!action.payload){
        state.message = ''
        state.show = false
        state.type = TOAST.success
      }else{
        state.message = action.payload.message
        state.show = action.payload.show
        state.type = action.payload.type || TOAST.success
      }
    },
  }
})

// export actions that can be use on dispatch store
export const { setToast } = toastSlice.actions

export default toastSlice.reducer
