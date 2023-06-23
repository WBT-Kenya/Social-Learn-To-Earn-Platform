import CourseItem, { Course } from "./CourseItem";
import cyberSecImage from "../assets/cybersec.png";
import digitalLiteracyImage from "../assets/digital-literacy.png";
const courses: Course[] = [
  {
    id: 1,
    image: cyberSecImage,
    title: "Introduction to Cybersecurity",
    description:
      "Learn the fundamentals of cybersecurity and how it can be applied to protect your home, office, and business.",
    content: [],
  },
  {
    id: 2,
    image: digitalLiteracyImage,
    title: "Digital Literacy Fundamentals",
    description:
      "Learn the fundamentals of digital literacy and how it can be applied to protect your home, office, and business.",
    content: [],
  },
];

const AvailableCourses = () => {
  return (
    <section
      className={courses ? `grid grid-cols-4 gap-16 grid-rows-2` : `flex`}
    >
      {courses.length > 0 ? (
        courses.map((course) => <CourseItem course={course} key={course.id} />)
      ) : (
        <p className="text-xl">There are no courses available at the moment.</p>
      )}
    </section>
  );
};

export default AvailableCourses;
