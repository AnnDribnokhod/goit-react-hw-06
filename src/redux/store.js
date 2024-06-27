import { configureStore } from '@reduxjs/toolkit'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist';
  import storage from 'redux-persist/lib/storage';
  import contactsReducer from './contactsSlice.js'
  import filtersReducer from './filtersSlice.js'
 const persistedContatcsReducer = persistReducer(
    {
        key: 'contacts',
        storage,
        whitelist: ['items']
    },
    contactsReducer
 );
 export const store = configureStore({
    reducer: {
        contacts: persistedContatcsReducer,
        filters: filtersReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
 })
 
 export const persistor = persistStore(store);
