import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses } from '../../../redux/Courses/Courses';
import './BlogsPostCard.css';
import CourseCard from './CourseCard';

const Courses = () => {
  const dispatch = useDispatch();
  const { courses, pending, error } = useSelector((store) => store.courses);
  useEffect(() => {
    if (courses.length < 1) {
      dispatch(fetchCourses());
    }
  }, [dispatch, courses.length]);

  let content;

  if (!pending && !error && Array.isArray(courses)) {
    content = (
      <table className="courses-table">
        <tbody>
          <tr key="courses">
            <th>Course</th>
            <th>Description</th>
            <th>Category</th>
            <th>Price</th>
            <th>Status</th>
            <th>{' '}</th>
          </tr>
          {courses.map((course) => (
            <tr key={course.id}>
              <CourseCard props={course} />
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  if (pending) {
    content = (
      <h1>Fetching Courses</h1>
    );
  }
  if (error) {
    content = (
      <h1>Error occured while fetching courses</h1>
    );
  }
  return (
    <section className="courses">
      {content}
    </section>
  );
};

export default Courses;