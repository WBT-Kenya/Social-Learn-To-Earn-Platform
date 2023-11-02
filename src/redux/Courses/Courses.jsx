import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchCourses = createAsyncThunk(
  'courses',
  async () => {
    const response = await fetch('https://awow3.talentlms.com/api/v1/');

    const data = await response.json();
    const result = [];
    data.forEach((course) => {
      result.push({
        name: course.course_name,
        description: course.description,
        id: course.course_id,
        category: course.category,
        price: course.price,
        reserved: false,
      });
    });
    return result;
  },
);

const initialState = {
  courses: [],
  pending: false,
  error: false,
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    handleCourse: (state, { payload }) => {
      const courses = [];
      state.courses.forEach((course) => {
        if (course.id === payload) {
          courses.push({
            ...course,
            reserved: !course.reserved,
          });
        } else {
          courses.push({ ...course });
        }
      });
      return {
        ...state,
        courses,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCourses.fulfilled, (state, { payload }) => ({
      ...state,
      courses: payload,
      pending: false,
      error: false,
    }));
    builder.addCase(fetchCourses.pending, (state) => ({
      ...state,
      pending: true,
      error: false,
    }));

    builder.addCase(fetchCourses.rejected, (state) => ({
      ...state,
      pending: false,
      error: true,
    }));
  },
});

export default coursesSlice.reducer;
export const { handleCourse } = coursesSlice.actions;