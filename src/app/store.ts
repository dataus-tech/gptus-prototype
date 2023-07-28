import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'app/slices/auth';
import messageReducer from 'app/slices/message';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';

const reducers = combineReducers({
  auth: authReducer,
  message: messageReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
