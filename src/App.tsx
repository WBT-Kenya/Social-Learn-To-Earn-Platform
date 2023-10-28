import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { CoursePreview, Home, Login, Signup } from "./pages";
// import cyberSecImage from "./assets/cybersec.png";
// import digitalLiteracyImage from "./assets/digital-literacy.png";
// import publicSpeakingImage from "./assets/public-speaking.png";
// import { Course } from "./components/CourseItem";
// import { CourseContent } from "./components";

// const courses: Course[] = [
//   {
//     id: 1,
//     image: cyberSecImage,
//     title: "Introduction to Cybersecurity",
//     description:
//       "Learn the fundamentals of cybersecurity and how it can be applied to protect your home, office, and business.",
//     content: [],
//   },
//   {
//     id: 2,
//     image: digitalLiteracyImage,
//     title: "Digital Literacy Fundamentals",
//     description:
//       "Learn the fundamentals of digital literacy and how it can be applied to protect your home, office, and business.",
//     content: [],
//   },
//   {
//     id: 3,
//     image: publicSpeakingImage,
//     title: "Introduction to Public Speaking",
//     description:
//       "Learn the fundamentals of public speaking and get the most out of your presentations moving forward.",
//     content: [
//       {
//         id: 1,
//         title: "Introduction to The Course",
//         description: "First video of the course",
//         videoUrl: "https://www.youtube.com/embed/7bB_fVDlvhc",
//       },
//       {
//         id: 1,
//         title: "Second Introduction to The Course",
//         description: "Second video of the course",
//         videoUrl: "https://www.youtube.com/watch?v=btZH_zKlYcI",
//       },
//     ],
//   },
// ];

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  // { path: "/courses", element: <Courses /> },
  { path: "/quizzes", element: <CoursePreview /> },
  // ...courses.map((course) => ({
  //   path: `/courses/${course.title.replace(/\s/g, "-").toLowerCase()}`,
  //   element: <CourseContent course={course} />,
  // })),
]);

function App() {
  return (
    <section>
      <RouterProvider router={router} />
    </section>
  );
}

export default App;
