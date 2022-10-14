import { configureStore } from '@reduxjs/toolkit';
import { Store } from 'redux';
import { createWrapper } from "next-redux-wrapper";
import loadingSlice from '~store/loading-overlay';
import toastSlice from '~store/toast';

/**
 * Configuring the redux store
 * In each context we set a file selector for selecting withc state to get,
 * can be customized for specific selecting
 */

export const store: Store = configureStore({
  reducer: {
    loading: loadingSlice,
    toast: toastSlice
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const wrapper = createWrapper<any>(() => store);