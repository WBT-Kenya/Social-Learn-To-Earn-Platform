import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Courses, Home, Login, Signup } from "./pages";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/courses", element: <Courses /> },
]);

function App() {
  return (
    <section>
      <RouterProvider router={router} />
    </section>
  );
}

export default App;
