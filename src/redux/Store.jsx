import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import coursesReducer from './Courses/Courses';
// import rocketsReducer from './Rockets/rockets';

const store = configureStore({
  reducer: {
    courses: coursesReducer,
    // rockets: rocketsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;