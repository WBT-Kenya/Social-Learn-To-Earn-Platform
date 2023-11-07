import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {Login, Signup } from "./pages";
import DashBoard from "./pages/DashBoard";
import { Navigate} from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/DashboardLayout';
import BlogPage from './pages/BlogPage';


const router = createBrowserRouter([
  { path: "/", element: <Signup /> },
  { path: "/login", element: <Login /> },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    
    children: [
      { 
        element: 
          // <Navigate to="/dashboard/app" />,
          <Navigate to="/dashboard/app" />,
          index: true 
      },
      { path: "/dashboard/app", element: <DashBoard /> },

      { path: '/dashboard/courses', element: <BlogPage /> },
      // { path: 'blogs', element: <BlogsPostCard /> },
    ],
    
  },
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
