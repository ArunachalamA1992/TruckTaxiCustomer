import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import { reducer } from './reducer';


const persistConfig = {
  key: 'trucktaxicustomer',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

let persister = persistStore(store);

export {store, persister};
