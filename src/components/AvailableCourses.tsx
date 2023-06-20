import CourseItem, { Course } from "./CourseItem";
const courses: Course[] = [];

const AvailableCourses = () => {
  return (
    <section className="">
      {courses.length > 0 ? (
        courses.map((course) => (
          <section className="grid grid-cols-5 gap-16">
            <CourseItem course={course} />
          </section>
        ))
      ) : (
        <p className="text-xl">There are no courses available at the moment.</p>
      )}
    </section>
  );
};

export default AvailableCourses;
