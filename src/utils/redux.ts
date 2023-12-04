import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    deviceId: "Find Your Device",
    username: null,
    timeline: [],
    calendar: false,
  },
  reducers: {
    setDeviceId: (state, action) => {
      state.deviceId = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setTimeline: (state, action) => {
      state.timeline = action.payload;
    },
    logout: (state) => {
      state.deviceId = "Find Your Device";
      state.username = null;
      state.timeline = [];
    },
    setCalendar: (state) => {
      state.calendar = !state.calendar;
    },
  },
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, authSlice.reducer);
export const { setDeviceId, logout, setUsername, setCalendar } =
  authSlice.actions;
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
export const persister = persistStore(store);
