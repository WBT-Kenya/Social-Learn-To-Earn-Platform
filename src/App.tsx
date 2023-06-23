import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { CoursePreview, Courses, Home, Login, Signup } from "./pages";
import cyberSecImage from "./assets/cybersec.png";
import digitalLiteracyImage from "./assets/digital-literacy.png";
import { Course } from "./components/CourseItem";
import { CourseContent } from "./components";

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

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/courses", element: <Courses /> },
  { path: "/quizzes", element: <CoursePreview /> },
  ...courses.map((course) => ({
    path: `/courses/${course.title.replace(/\s/g, "-").toLowerCase()}`,
    element: <CourseContent course={course} />,
  })),
]);

function App() {
  return (
    <section>
      <RouterProvider router={router} />
    </section>
  );
}

export default App;
