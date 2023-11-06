import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Home, Login, Signup } from "./pages";
import DashBoard from "./pages/DashBoard";
import Courses from "./sections/@dashboard/blog/BlogsPostCard";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/signup", element: <Signup /> },
  { path: "/login", element: <Login /> },
  { path: "/courses", element: <Courses /> },
  { path: "/dashboard", element: <DashBoard /> },
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
